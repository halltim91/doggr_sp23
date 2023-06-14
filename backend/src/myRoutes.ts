import { FastifyInstance } from "fastify";
import { INpcBody } from "./types.js";
import { User } from "./db/entities/User.js";
import { Npc } from "./db/entities/Npc.js";
import verifyToken from "./Tokens.js";
import { UserToNpc } from "./db/entities/UserToNpc.js";
import { EntityManager } from "@mikro-orm/core";
import { NpcLikes } from "./db/entities/NpcLikes.js";

async function NpcRoutes(app: FastifyInstance, _options ={}){
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}

	//add npc
	app.post<{ Body: {token: string, uid: string, npc: INpcBody }}>("/npcs", async (req, reply) => {
		const { npc } = req.body;
		const { token, uid } = req.body;
		try{
			verifyToken(token, uid);
			const user = await req.em.findOneOrFail(User, {uid});
			const newNpc = await addNpc(req.em, npc, user);
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
			//increase number of likes
			const npc = await req.em.findOneOrFail(Npc, {id: npc_id});
			await updateLikes(req.em, npc);


			const rel = await req.em.create(UserToNpc, {
				user: user.uid,
				npc: npc_id
			});
			await req.em.flush();
			reply.send(npc);
		} catch (err) {
			console.log("Failed to link npc to user", err.message);
			reply.status(500).send(err.message);
		}
	});

	//update npc
	app.put<{Body: {token: string, uid: string, npc}}>("/npc/update", async (req, reply) => {
		const {token, uid, npc} = req.body;
		const {  user } = npc;
		console.log("blah", user, uid);
		try {
			verifyToken(token, uid);
			const u = await req.em.findOneOrFail(User, {uid: uid});
			let loaded;
			// if npc is owned by user update it, else create a copy for the use
			if( user === uid ){
				console.log("update");
				loaded = await req.em.findOne(Npc, { id: npc.id});
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
				loaded.user = loaded.user ? loaded.user : u.uid;
				addToLikes(req.em, loaded);
			} else {
				//create a new copy, delete pointer to public npc
				console.log("clone");
				loaded = addNpc(req.em, npc, u, false);
				const ref = await req.em.findOneOrFail(UserToNpc, { user: uid, npc: npc.id });
				req.em.remove(ref);
			}

			await req.em.flush();
			reply.send(loaded);
		} catch(err){
			console.log("Failed to update npc", err);
			reply.status(500).send(err);
		}
	});

	//delete npc (only from user list if private
	app.delete<{Params: {uid: string, npcid: number}}>("/npc/:uid/:npcid", async (req, reply)=> {
		const {uid, npcid} = req.params;
		const {token} = req.headers;
		try{
			verifyToken(token, uid);
			const npc = await req.em.findOneOrFail(Npc, {id: npcid});
			const n = await req.em.find(UserToNpc, {npc});
			await req.em.remove(n);
			await req.em.flush();
			reply.send(n);
		} catch (err) {
			console.log("Failed to delete Npc", err);
			reply.status(500).send(err);
		}
	});

	// get public npc list
	app.search<{Body: {offset: number, limit: number}}>("/npc", async (req, reply) => {
		const {offset, limit} = req.body;
		try {
			const qb = req.em.createQueryBuilder(NpcLikes, "b");
			qb.select(["n.*", "b.likes"], true)
				.join("b.npc", "n")
				.where({"n.is_public": true})
				.orderBy({"n.updated_at": 'DESC'})
				.offset(offset)
				.limit(limit);
			const res = await qb.execute();
			// reply.send(res.slice(offset, offset + limit));
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
			console.log("Failed to get count of public npc list", err.message);
			reply.status(500).send(err);
		}
	});

	//get user npc list count
	app.search<{Body: {token: string, uid: string}}>("/npc/user/count", async (req, reply) => {
		const { token, uid } = req.body;
		try {
			verifyToken(token, uid);
			const usr = await req.em.findOneOrFail(User, {uid: uid});

			const count = await req.em.count(Npc, {user: usr.uid});
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
			qb.select(["n.*"])
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
}

const addToLikes = async (em: EntityManager, npc) => {
	if(npc.is_public){
		try {
			const c = await em.findOne(NpcLikes, {npc: npc});
			if(!c)
				em.create(NpcLikes, {npc: npc});
		} catch (err){
			return err;
		}
	}
};

const updateLikes = async (em: EntityManager, npc) => {
	if (npc.is_public) {
		try {
			const c = await em.findOne(NpcLikes, { npc: npc });
			if (!c) {
				em.create(NpcLikes, { npc: npc, likes: 1 });
			} else {
				c.likes++;
			}
		} catch (err) {
			return err;
		}
	}
};

const addNpc = async (em: EntityManager, npc, user: User, copyNotes:boolean=true) => {
	const newnpc = em.create(Npc, {
		name: npc.name,
		age: npc.age,
		gender: npc.gender,
		race: npc.race,
		hair_color: npc.hair_color,
		eye_color: npc.eye_color,
		height: npc.height,
		weight: npc.weight,
		background: npc.background,
		notes:  copyNotes ? npc.notes : "",
		is_public: copyNotes ? npc.is_public : false,
		user: user.uid
	});
	await em.flush();
	await addToLikes(em, newnpc);
	createRelationship(em, newnpc, user);
	return newnpc;
};

const createRelationship = (em: EntityManager, npc, user: User) => {
	em.create(UserToNpc, {
		npc: npc,
		user: user.uid
	});
};

export default NpcRoutes;
