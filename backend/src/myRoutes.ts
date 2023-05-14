import { FastifyInstance } from "fastify";
import { IUserBody, INpcBody} from "./types.js";
import { User } from "./db/entities/User.js";
import { Npc } from "./db/entities/Npc";
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
			const theUser = await req.em.findOne(User, {uName});
			if(theUser.password == pWord)
				reply.send(theUser);
			else
				reply.status(400).send("Invalid password");
		} catch(err){
			reply.status(500).send(err);
		}
	});

	//update user
	app.put<{Body: IUserBody}>("/user", async (req, reply) => {
		const {email, username, password} = req.body;

		try {
			const userToChange = await req.em.findOne(User, {username});
			userToChange.email = email,
			userToChange.userName = username,
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
			const theUser = await req.em.findOne(User, {userName});
			await req.em.remove(theUser).flush();
			reply.send(theUser);
		} catch(err){
			reply.status(500).send(err);
		}
	});

	//add npc
	app.post<{ Body: INpcBody }>("/npcs", async (req, reply) => {
		const {name, age, gender, race, haircolor, height, background, notes,
			isPublic, owner} = req.body;
		try{
			const newNpc = await req.em.create(Npc, {
				name: name,
				age: age,
				gender: gender,
				race: race,
				hairColor: haircolor,
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
	//get user npc list
	//get public npc list
	//mark npc as public
	//delete npc (only from user list if private)
}
