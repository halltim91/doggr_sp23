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

		em.create(Npc, {
			name: "Johnny the Invincible",
			age: 32,
			gender: "male",
			race: "Human",
			hairColor: "Brown",
			height: "6'1\"",
			background: "From parts unknown",
			notes: "Some useful information",
			isPublic: false,
			owner: user
		});
		em.create(Npc, {
			name: "Linda the Slayer",
			age: 25,
			gender: "Female",
			race: "Elf",
			hairColor: "White",
			height: "5'4\"",
			background: "Grew up in a tree",
			notes: "Kicks butt for fun",
			isPublic: true,
			owner: user
		});
		em.create(Npc, {
			name: "Dwalin son of Gloin",
			age: 140,
			gender: "Male",
			race: "Dwarf",
			hairColor: "White",
			height: "4'9\"",
			background: "Lived under the mountain",
			notes: "Carries an axe",
			isPublic: false,
			owner: user
		});
	}

}
