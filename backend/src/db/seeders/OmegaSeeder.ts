import { Seeder } from "@mikro-orm/seeder";
import { Dictionary, EntityManager } from "@mikro-orm/core";
import { User } from "../entities/User.js";
import { Npc } from "../entities/Npc.js";
import { UserToNpc } from "../entities/UserToNpc.js";


export class OmegaSeeder extends Seeder {
	run(em: EntityManager, context: Dictionary | undefined): Promise<void> {
		this.createusers(em)
			.map((u) => this.createNPCs(em, u, 75)
				.map((n) => em.create(UserToNpc, {user: n.owner, npc: n})));
		return Promise.resolve(undefined);
	}

	createusers(em: EntityManager): Array<User> {
		const usrs = new Array<User>();
		usrs.push(em.create(User, {
			id: 1,
			email: "email@email.com",
			uid: "VoM8gGmaI0h5uF1AMqnL8KT2jeV2"
		}));
		usrs.push(em.create(User, {
			id: 2,
			email: "email2@email.com",
			uid: "6NPDYnAv9SXKSuPdWbaxJAbuncp2"
		}));
		usrs.push(em.create(User, {
			id: 3,
			email: "email3@email.com",
			uid: "bckQadw4IoWDSoRdWqDu0pPU5vd2"
		}));
		return usrs;
	}


	createNPCs(em: EntityManager, usr: User, count: number): Array<Npc> {
		const npc = new Array<Npc>();
		for (let i = 1; i < count; i++) {
			console.log(usr);
			npc.push(em.create(Npc, {
				name: "Npc " + (usr.id * count + i),
				age: 18 + (Math.random() * 53),
				gender: Math.random() > .5 ? "Male" : "Female",
				race: "Human",
				hairColor: "Blonde",
				eyeColor: "Brown",
				height: "6'1\"",
				weight:"150lb",
				background: "From parts unknown",
				notes: "Some useful information",
				isPublic: Math.random() > .35,
				owner: usr
			}));
		}
		return npc;
	}
}




