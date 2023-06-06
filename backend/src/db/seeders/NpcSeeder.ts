import {Seeder} from "@mikro-orm/seeder";
import {EntityManager} from "@mikro-orm/core";
import {Npc} from "../entities/Npc.js";
import {User} from "../entities/User.js";

export class NpcSeeder extends Seeder {

	async run(em: EntityManager): Promise<void> {
		const user = new User();
		user.userName = "lurkingTimbo21";
		user.email = "email2@email.com";
		user.password = "password";

		for (let i = 1; i < 101; i++) {
			em.create(Npc, {
				name: "Npc " + i,
				age: 18 + (Math.random() * 53),
				gender: Math.random() > .5 ? "Male" : "Female",
				race: "Human",
				hairColor: "Blonde",
				eyeColor: "Brown",
				height: "6'1\"",
				background: "From parts unknown",
				notes: "Some useful information",
				isPublic: Math.random() > .35,
				owner: user
			});
		}

		// }
		// em.create(Npc, {
		// 	name: "Johnny the Invincible",
		// 	age: 32,
		// 	gender: "male",
		// 	race: "Human",
		// 	hairColor: "Brown",
		// 	eyeColor: "green",
		// 	height: "6'1\"",
		// 	background: "From parts unknown",
		// 	notes: "Some useful information",
		// 	isPublic: false,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Linda the Slayer",
		// 	age: 25,
		// 	gender: "Female",
		// 	race: "Elf",
		// 	hairColor: "White",
		// 	eyeColor: "blue",
		// 	height: "5'4\"",
		// 	background: "Grew up in a tree",
		// 	notes: "Kicks butt for fun",
		// 	isPublic: true,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Dwalin son of Gloin",
		// 	age: 140,
		// 	gender: "Male",
		// 	race: "Dwarf",
		// 	hairColor: "White",
		// 	eyeColor: "brown",
		// 	height: "4'9\"",
		// 	background: "Lived under the mountain",
		// 	notes: "Carries an axe",
		// 	isPublic: false,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Npc 1",
		// 	age: 32,
		// 	gender: "male",
		// 	race: "Human",
		// 	hairColor: "blonde",
		// 	eyeColor: "green",
		// 	height: "6'1\"",
		// 	background: "From parts unknown",
		// 	notes: "Some useful information",
		// 	isPublic: true,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Npc 2",
		// 	age: 32,
		// 	gender: "female",
		// 	race: "Human",
		// 	hairColor: "blonde",
		// 	eyeColor: "green",
		// 	height: "6'1\"",
		// 	background: "From parts unknown",
		// 	notes: "Some useful information",
		// 	isPublic: true,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Npc 3",
		// 	age: 15,
		// 	gender: "male",
		// 	race: "Orc",
		// 	hairColor: "black",
		// 	eyeColor: "brown",
		// 	height: "6'1\"",
		// 	background: "From parts unknown",
		// 	notes: "Some useful information",
		// 	isPublic: true,
		// 	owner: user
		// });
		// em.create(Npc, {
		// 	name: "Npc 4",
		// 	age: 32,
		// 	gender: "male",
		// 	race: "Half Elf",
		// 	hairColor: "White",
		// 	eyeColor: "Blue",
		// 	height: "5'9\"",
		// 	background: "From parts unknown",
		// 	notes: "Some useful information",
		// 	isPublic: true,
		// 	owner: user
		// });
	}
}
