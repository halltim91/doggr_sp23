import { FastifyInstance } from "fastify";

async function FireBaseRoutes(app: FastifyInstance, _options ={}) {
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}

	app.post<{Body: {email: string, pword: string}}>("/signup", async (req, reply) => {
		const {email, pword} = req.body;
		try {
			const response = await app.createUser(email, pword);
			reply.send(response);
		} catch(err) {
			console.log(err.message);
			reply.status(500).send(err.message);
		}
	});
}

export default FireBaseRoutes;
