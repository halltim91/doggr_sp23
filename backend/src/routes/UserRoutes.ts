import { IUserBody } from "../types";
import { User } from "../db/entities/User.js";
import { FastifyInstance } from "fastify";


async function UserRoutes(app: FastifyInstance, _options={}) {
	// Add a user
	app.post<{ Body: IUserBody }>("/users", async (req, reply) => {
		const { email, uid } = req.body;

		try {
			const newUser = await req.em.create(User, {
				email: email,
				uid: uid
			});
			await req.em.flush();
			console.log("created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to add new user", err.message);
			return reply.status(500).send(err.message);
		}
	});

	// //update user
	// app.put<{Body: IUserBody}>("/user", async (req, reply) => {
	// 	const {email, username, password} = req.body;
	//
	// 	try {
	// 		const userToChange = await req.em.findOne(User, {userName: username});
	// 		userToChange.email = email;
	// 		userToChange.userName = username;
	// 		userToChange.password = password;
	// 		await req.em.flush();
	// 		console.log("User updated:", userToChange);
	// 		return reply.send(userToChange);
	// 	} catch(err) {
	// 		console.log("Failed to update user", err.message);
	// 		return reply.status(500).send(err.message);
	// 	}
	// });
	//
	// //delete user
	// app.delete<{Body: {userName: string}}>("/users", async (req, reply) => {
	// 	const {userName} = req.body;
	//
	// 	try {
	// 		const theUser = await req.em.findOneOrFail(User, {userName});
	// 		await req.em.remove(theUser).flush();
	// 		reply.send(theUser);
	// 	} catch(err){
	// 		console.log("Failed to delete user", err);
	// 		reply.status(500).send(err);
	// 	}
	// });
}

export default UserRoutes;
