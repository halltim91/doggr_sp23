import {Seeder} from "@mikro-orm/seeder";
import {EntityManager} from "@mikro-orm/core";
import {Npc} from "../entities/Npc.js";
import {User} from "../entities/User.js";

export class NpcSeeder extends Seeder {

	async run(em: EntityManager): Promise<void> {
		const user = new User();
		user.email = "email2@email.com";
		user.uid = "s9687bafdg9a6fd09";

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
	}
}
