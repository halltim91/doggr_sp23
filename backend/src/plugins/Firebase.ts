import fp from "fastify-plugin";
import firebase from "firebase/compat/app";
import {FastifyPluginAsync } from "fastify";
import dotenv from "dotenv";
dotenv.config();

declare module 'fastify' {
	interface FastifyInstance {
		firebase: firebase.auth.Auth;
	}
}

export const fastifyFireBase:FastifyPluginAsync = async (fastify, options) => {
	const firebaseConfig = {
		apiKey: process.env.FB_API_KEY,
		authDomain: process.env.FB_AUTH_DOMAIN,
		projectId: process.env.FB_PROJ_ID,
		storageBucket: process.env.FB_STORAGE_BUCKET,
		messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
		appId: process.env.FB_APP_ID,
		measurementId: process.env.FB_MEASUREMENT_ID
	};
	firebase.initializeApp(firebaseConfig);
	fastify.decorate("firebase", firebase.auth);

};

export const FastifyFireBasePlugin = fp(fastifyFireBase, {name: "auth"});
