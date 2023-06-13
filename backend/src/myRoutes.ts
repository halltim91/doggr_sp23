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
		const {name, age, gender, race, hair_color, eye_color, height, weight, background, notes,
			is_public} = req.body.npc;
		const { token, uid } = req.body;
		try{
			verifyToken(token, uid);

			const usr = await req.em.findOneOrFail(User, {uid: uid});

			const newNpc = await req.em.create(Npc, {
				name: name,
				age: age,
				gender: gender,
				race: race,
				hair_color: hair_color,
				eye_color: eye_color,
				height: height,
				weight: weight,
				background: background,
				notes:  notes,
				is_public: is_public,
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

	//link existing npc to user
	app.post<{Body: {token: string, uid: string, npc_id: number}}>("/npc/existing", async (req, reply) => {
		const {token, uid, npc_id} = req.body;

		try {
			verifyToken(token, uid);
			const user = await req.em.findOneOrFail(User, {uid});

			const rel = await req.em.create(UserToNpc, {
				user: user,
				npc: npc_id
			});
			await req.em.flush();
			reply.send(rel);
		} catch (err) {
			console.log("Failed to link npc to user", err.message);
			reply.status(500).send(err.message);
		}
	});

	//update npc
	app.put<{Body: {token: string, uid: string, npc: INpcBody}}>("/npc/update", async (req, reply) => {
		const {token, uid, npc} = req.body;
		try {
			verifyToken(token, uid);

			const loaded = await req.em.findOne(Npc, { id: npc.id});
			loaded.id = npc.id ? npc.id : loaded.id;
			loaded.name = npc.name ? npc.name : loaded.name;
			loaded.age = npc.age;
			loaded.gender = npc.gender;
			loaded.race = npc.race;
			loaded.hair_color = npc.hair_color;
			loaded.eye_color = npc.eye_color;
			loaded.height = npc.height;
			loaded.background = npc.background;
			loaded.notes = npc.notes;
			loaded.is_public = npc.is_public ? npc.is_public : loaded.is_public;
			await req.em.flush();
			reply.send(loaded);
		} catch(err){
			console.log("Failed to update npc", err);
			reply.status(500).send(err);
		}
	});

	// get public npc list
	app.search<{Body: {offset: number, limit: number}}>("/npc", async (req, reply) => {
		const {offset, limit} = req.body;
		try {
			const qb = req.em.createQueryBuilder(Npc, "n");
			qb.select("n.*")
				.where({is_public: true})
				.offset(offset)
				.limit(limit);
			const res = await qb.execute();
			reply.send(res);
		} catch(err) {
			console.log("Failed to get public npc list", err.message);
			reply.status(500).send(err);
		}
	});

	//get public npc list count
	app.get("/npc/count", async (req, reply) => {
		try {
			const count = await req.em.count(Npc, {is_public: true});
			reply.send(count);
		} catch(err) {
			console.log("Failed to get count of public npc list", err);
			reply.status(500).send(err);
		}
	});

	//get user npc list count
	app.search<{Body: {token: string, uid: string}}>("/npc/user/count", async (req, reply) => {
		const { token, uid } = req.body;
		try {
			verifyToken(token, uid);
			const usr = await req.em.findOneOrFail(User, {uid: uid});

			const count = await req.em.count(Npc, {owner: usr});
			reply.send(count);
		} catch(err) {
			console.log("Failed to get count of public npc list", err);
			reply.status(500).send(err);
		}
	});

	//get user npc list
	app.search<{Body: {token: string, uid: number, offset: number, limit: number}}>("/npc/user", async (req, reply) => {
		const {token, uid, offset, limit} = req.body;
		try {
			verifyToken(token, uid);
			const qb = req.em.createQueryBuilder(UserToNpc, "u");
			qb.select(["u.user", "n.*"])
				.join("u.npc", "n")
				.where({"u.user": uid})
				.offset(offset)
				.limit(limit);
			const res = await qb.execute();
			reply.send(res);

		} catch(err) {
			console.log("Failed to retrieve user npcs list", err.message);
			reply.status(500).send(err.message);
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
