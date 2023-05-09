import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ICreateUsersBody} from "./ types.js";
import app from "./app.js";
import {User} from "./db/entities/User.js";
import {Match} from "./db/entities/Match";

async function DoggrRoutes(app: FastifyInstance, _options={}){
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'Hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});

	//core method for adding generic SEARCH method
	// We have to use .route() here because we need a non-standard http method, SEARCH
	// app.route<{Body: { email: string}}>(
	// 	{
	// 		method: "SEARCH",
	// 		url: "/users",
	//
	// 		handler: async(req, reply) =>
	// 		{
	// 			const { email } = req.body;
	// 			console.log("Email is: ", email);
	// 			try {
	// 				const theUser = await req.em.findOne(User, { email });
	// 				console.log(theUser);
	// 				reply.send(theUser);
	// 			} catch (err) {
	// 				console.error(err);
	// 				reply.status(500).send(err);
	// 			}
	// 		}
	// 	});
	
	app.post<{ Body: ICreateUsersBody }>("/users", async (req,reply) => {
		const {name, email, petType} = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				name: name,
				email: email,
				petType: petType
			});
			await req.em.flush();
			
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send(err.message);
		}
	});


	//CRUD operations

	//READ
	app.search<{Body: { email: string}}>("/users", async (req, reply) => {
		const {email} = req.body;

		try {
			const theUser = await req.em.findOne(User, {email});
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500)
				.send(err);
		}
	});

	//UPDATE
	app.put<{Body: ICreateUsersBody}>("/users", async (req, reply) => {
		const {name, email, petType} = req.body;

		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		userToChange.petType = petType;

		//flush persists our JS object changes to the DB itself
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
	});

	//DELETE
	app.delete<{Body: { email: string}}>("/users", async (req, reply)=>{
		const {email} = req.body;

		try {
			const theUser = await req.em.findOne(User, {email});
			await req.em.remove(theUser).flush();
			req.em.flush();
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500)
				.send(err);
		}
	});

	// CREATE MATCH
	app.post<{Body: { email: string, matchee_email: string}}>("/match", async(req, reply)=>{
		const {email, matchee_email } = req.body;
		try {
			//make sure matchee exists and get get user account
			const matchee = await req.em.findOne(User, {email: matchee_email});
			const owner = await req.em.findOne(User, {email: email});

			//create new match
			const newMatch = await req.em.create(Match, {
				owner,
				matchee
			});
			await req.em.flush();					// persist it to db
			return reply.send(newMatch); // send match back to the user
		} catch (err) {
			console.error(err);
			return reply.status(500).send(err);
		}
	});

}

export default DoggrRoutes;
