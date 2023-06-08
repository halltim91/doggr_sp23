import { FastifyInstance } from "fastify";
import { IUserBody, INpcBody} from "./types.js";
import { User } from "./db/entities/User.js";
import { Npc } from "./db/entities/Npc.js";
import {creatuserWithEmailAndPassword } from "firebase/auth";

async function NpcRoutes(app: FastifyInstance, _options ={}){
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}
  
	// Add a user
	app.post<{ Body: IUserBody }>("/users", async (req, reply) => {
		const {email, username, password} = req.body;

		try {
			const newUser = await req.em.create(User, {
				email: email,
				userName: username,
				password: password
			});
			await req.em.flush();

			console.log("created new user:", newUser);
			return reply.send(newUser);
		} catch(err) {
			console.log("Failed to add new user", err.message);
			return reply.status(500).send(err.message);
		}
	});

	//get user/ check password?
	app.search<{Body: {uName: string, pWord: string}}>("/users", async (req, reply) => {
		const {uName, pWord} = req.body;
		try{
			const theUser = await req.em.findOne(User, {userName: uName});
			if(theUser.password == pWord)
				reply.send(theUser);
			else
				reply.status(400).send("Invalid password");
		} catch(err){
			console.log("Failed to add new user", err);
			reply.status(500).send(err);
		}
	});

	//update user
	app.put<{Body: IUserBody}>("/user", async (req, reply) => {
		const {email, username, password} = req.body;

		try {
			const userToChange = await req.em.findOne(User, {userName: username});
			userToChange.email = email;
			userToChange.userName = username;
			userToChange.password = password;
			await req.em.flush();
			console.log("User updated:", userToChange);
			return reply.send(userToChange);
		} catch(err) {
			console.log("Failed to update user", err.message);
			return reply.status(500).send(err.message);
		}
	});

	//delete user
	app.delete<{Body: {userName: string}}>("/users", async (req, reply) => {
		const {userName} = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, {userName});
			await req.em.remove(theUser).flush();
			reply.send(theUser);
		} catch(err){
			console.log("Failed to delete user", err);
			reply.status(500).send(err);
		}
	});

	//add npc
	app.post<{ Body: INpcBody }>("/npcs", async (req, reply) => {
		const {name, age, gender, race, hairColor, height, background, notes,
			isPublic, owner} = req.body;
		try{
			const newNpc = await req.em.create(Npc, {
				name: name,
				age: age,
				gender: gender,
				race: race,
				hairColor: hairColor,
				height: height,
				background: background,
				notes:  notes,
				isPublic: isPublic,
				owner: owner
			});
			await req.em.flush();
			console.log("added NPC: ", newNpc);
			reply.send(newNpc);
		} catch (err){
			console.log("Failed to add new NPC", err);
			reply.status(500).send(err);
		}
	});

	// get public npc list
	app.search<{Body: {start: number, end: number}}>("/npc", async (req, reply) => {
		const {start, end} = req.body;
		try {
			const list = await req.em.find(Npc, {isPublic: true});
			reply.send(list.slice(start, end));
		} catch(err) {
			console.log("Failed to get public npc list between " + start + "-" + end, err);
			reply.status(500).send(err);
		}
	});

	//get public npc list count
	app.get("/npc/count", async (req, reply) => {
		try {
			const count = await req.em.count(Npc, {isPublic: true});
			reply.send(count);
		} catch(err) {
			console.log("Failed to get count of public npc list", err);
			reply.status(500).send(err);
		}
	});

	//get user npc list
	app.search<{Body: {id: number, start: number, end: number}}>("/npc/user", async (req, reply) => {
		const {id, start, end} = req.body;
		try {
			const list = await req.em.find(Npc, {owner: id});
			reply.send(list.slice(start, end));
		} catch(err){
			console.log("Failed to load users NPC list", err);
			reply.status(500).send(err);
		}
	});

	//get user npc list count
	app.get<{Params: {id: number}}>("/npc/:id", async (req, reply) => {
		const { id } = req.params;
		try {
			const count = await req.em.count(Npc, {owner: id});
			reply.send(count);
		} catch(err) {
			console.log("Failed to get count of public npc list", err);
			reply.status(500).send(err);
		}
	});

	//delete npc (only from user list if private
	app.delete<{Body: INpcBody}>("/npc/user", async (req, reply)=> {
		const {name, owner} = req.body;
		try{
			const n = await req.em.findOneOrFail(Npc, {name: name, owner: owner});
			req.em.remove(n).flush();
			reply.send(n);
		} catch (err) {
			console.log("Failed to delete Npc", err);
			reply.status(500).send(err);
		}

	});

	// update Npc
	app.put<{Body: {origName: string, info:INpcBody}}>("/npc/user", async (req, reply) => {
		const {origName, info} = req.body;
		try {
			const npc = await req.em.findOne(Npc, { name: origName,	owner: info.owner });
			npc.name = info.name;
			npc.age = info.age;
			npc.gender = info.gender;
			npc.race = info.race;
			npc.hairColor = info.hairColor;
			npc.height = info.height;
			npc.background = info.background;
			npc.notes = info.notes;
			npc.isPublic = info.isPublic;
			await req.em.flush();
			reply.send(npc);

		} catch(err){
			console.log("Failed to update npc", err);
			reply.status(500).send(err);
		}
	});
	app.post<{Body: {email: string, pword: string}}>("/signup", async (req, reply) => {
		const {email, pword} = req.body;
		try {
			const response = await app.firebase.createUserWithEmailAndPassword(email, pword);
			reply.send(response);
		} catch(err) {
			console.log(err.message);
			reply.status(500).send(err.message);
		}
	});
}

export default NpcRoutes;
