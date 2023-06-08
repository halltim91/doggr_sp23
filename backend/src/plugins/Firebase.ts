// import fp from "fastify-plugin";
// import firebase from "firebase/compat/app";
// import { FastifyInstance, FastifyPluginAsync } from "fastify";
//
//
//
// export const fastifyFireBase:FastifyPluginAsync = async (fastify, options) => {
// 	const firebaseConfig = {
// 		//TODO Move to .env
// 		apiKey: "AIzaSyBUJFXnbeZ4e01yv5IDSpGkViGw7TKQI48",
// 		authDomain: "npsee-a9647.firebaseapp.com",
// 		projectId: "npsee-a9647",
// 		storageBucket: "npsee-a9647.appspot.com",
// 		messagingSenderId: "449508238502",
// 		appId: "1:449508238502:web:dbda8ae57f1b0e227b4067",
// 		measurementId: "G-GS17ZR9KRG"
// 	};
//
// 	firebase.initializeApp(firebaseConfig);
// 	const auth  = firebase.auth;
// 	const fcns = {
// 		createUser: (email: string, pword: string) => auth().createUserWithEmailAndPassword(email, pword),
// 		signIn: (email: string, pword: string) => auth().signInWithEmailAndPassword(email, pword),
// 		signOut: () => auth().signOut()
// 	};
//
// 	fastify.decorate("auth", fcns);
//
// };
//
// export const FastifyFireBasePlugin = fp(fastifyFireBase, {name: "auth"});

import fp from "fastify-plugin";
import firebase from "firebase/compat/app";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {getAuth} from "firebase/auth";

declare module 'fastify' {
	interface FastifyInstance {
		// createUser: (email, pword) => Promise<firebase.auth.UserCredential>,
		// signIn: (email, pword) => Promise<firebase.auth.UserCredential>,
		// signOut: () => void
		firebase: firebase.auth.Auth;
	}
}

export const fastifyFireBase:FastifyPluginAsync = async (fastify, options) => {
	const firebaseConfig = {
		//TODO Move to .env
		apiKey: "AIzaSyBUJFXnbeZ4e01yv5IDSpGkViGw7TKQI48",
		authDomain: "npsee-a9647.firebaseapp.com",
		projectId: "npsee-a9647",
		storageBucket: "npsee-a9647.appspot.com",
		messagingSenderId: "449508238502",
		appId: "1:449508238502:web:dbda8ae57f1b0e227b4067",
		measurementId: "G-GS17ZR9KRG"
	};
	firebase.initializeApp(firebaseConfig);
	// const auth  = firebase.auth;
	//
	// const fcns = {
	// 	createUser: (email: string, pword: string) => createUserWithEmailAndPassword(auth,email, pword),
	// 	signIn: (email: string, pword: string) => auth().signInWithEmailAndPassword(email, pword),
	// 	signOut: () => auth().signOut()
	// };
	//
	// fastify.decorate("createUser", fcns.createUser);
	// fastify.decorate("signIn", fcns.signIn);
	// fastify.decorate("signOut", fcns.signOut);
	fastify.decorate("firebase", firebase.auth());

};

export const FastifyFireBasePlugin = fp(fastifyFireBase, {name: "auth"});
