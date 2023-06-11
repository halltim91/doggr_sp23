import { FastifyInstance } from "fastify";
import { INpcBody} from "./types.js";
import { User } from "./db/entities/User.js";
import { Npc } from "./db/entities/Npc.js";
import verifyToken from "./Tokens.js";
import { UserToNpc } from "./db/entities/UserToNpc.js";

async function NpcRoutes(app: FastifyInstance, _options ={}){
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}

	//add npc
	app.post<{ Body: {token: string, uid: string, npc: INpcBody }}>("/npcs", async (req, reply) => {
		const {name, age, gender, race, hairColor, eyeColor, height, weight, background, notes,
			isPublic} = req.body.npc;
		const { token, uid } = req.body;
		try{
			verifyToken(token, uid);

			const usr = await req.em.findOneOrFail(User, {uid: uid});

			const newNpc = await req.em.create(Npc, {
				name: name,
				age: age,
				gender: gender,
				race: race,
				hairColor: hairColor,
				eyeColor: eyeColor,
				height: height,
				weight: weight,
				background: background,
				notes:  notes,
				isPublic: isPublic,
				owner: usr
			});

			const rel = await req.em.create(UserToNpc, {
				npc: newNpc,
				user: usr
			});

			await req.em.flush();
			console.log("added NPC: ", newNpc);
			reply.send(newNpc);
		} catch (err){
			console.log("Failed to add new NPC", err.message);
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

	// //delete npc (only from user list if private
	// app.delete<{Body: INpcBody}>("/npc/user", async (req, reply)=> {
	// 	const {name, owner} = req.body;
	// 	try{
	// 		const n = await req.em.findOneOrFail(Npc, {name: name, owner: owner});
	// 		req.em.remove(n).flush();
	// 		reply.send(n);
	// 	} catch (err) {
	// 		console.log("Failed to delete Npc", err);
	// 		reply.status(500).send(err);
	// 	}
	//
	// });

	// update Npc
// 	app.put<{Body: {origName: string, info:INpcBody}}>("/npc/user", async (req, reply) => {
// 		const {origName, info} = req.body;
// 		try {
// 			const npc = await req.em.findOne(Npc, { name: origName,	owner: info.owner });
// 			npc.name = info.name;
// 			npc.age = info.age;
// 			npc.gender = info.gender;
// 			npc.race = info.race;
// 			npc.hairColor = info.hairColor;
// 			npc.height = info.height;
// 			npc.background = info.background;
// 			npc.notes = info.notes;
// 			npc.isPublic = info.isPublic;
// 			await req.em.flush();
// 			reply.send(npc);
//
// 		} catch(err){
// 			console.log("Failed to update npc", err);
// 			reply.status(500).send(err);
// 		}
// 	});
}

export default NpcRoutes;
