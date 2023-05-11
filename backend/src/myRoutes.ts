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
			console.log("Failed to create new user", err.message);
			return reply.status(500).send(err.message);
		}
	});

	//get user
	//delete user
	//get user npc list
	//get public npc list
	//add npc
	//mark npc as public
	//delete npc (only from user list if private)
}
