import { Seeder } from "@mikro-orm/seeder";
import { Dictionary, EntityManager } from "@mikro-orm/core";
import { User } from "../entities/User.js";
import { Npc } from "../entities/Npc.js";
import { UserToNpc } from "../entities/UserToNpc.js";
import { NpcLikes } from "../entities/NpcLikes.js";


export class OmegaSeeder extends Seeder {
	run(em: EntityManager, context: Dictionary | undefined): Promise<void> {
		let i = 0;
		this.createusers(em)
			.map((u) => this.createNPCs(em, u, 75, i++)
				.map((n) => {
					this.createUserToNpc(em, u, n);
					this.addToLikes(em, n);
				}));
		return Promise.resolve(undefined);
	}

	createusers(em: EntityManager): Array<User> {
		const usrs = new Array<User>();
		usrs.push(em.create(User, {
			email: "email@email.com",
			uid: "VoM8gGmaI0h5uF1AMqnL8KT2jeV2"
		}));
		usrs.push(em.create(User, {
			email: "email2@email.com",
			uid: "6NPDYnAv9SXKSuPdWbaxJAbuncp2"
		}));
		usrs.push(em.create(User, {
			email: "email3@email.com",
			uid: "bckQadw4IoWDSoRdWqDu0pPU5vd2"
		}));
		return usrs;
	}

	createUserToNpc(em: EntityManager, user, npc): UserToNpc{
		return em.create(UserToNpc, {
			user: user.uid,
			npc: npc,
			created_at: npc.created_at,
			updated_at: npc.updated_at
		});
	}


	createNPCs(em: EntityManager, usr: User, count: number, index: number): Array<Npc> {
		const npc = new Array<Npc>();
		const now = Date.now().valueOf();
		for (let i = 1; i < count; i++) {
			npc.push(em.create(Npc, {
				name: "Npc " + (index * count + i),
				age: 18 + (Math.random() * 53),
				gender: Math.random() > .5 ? "Male" : "Female",
				race: "Human",
				hair_color: "Blonde",
				eye_color: "Brown",
				height: "6'1\"",
				weight:"150lb",
				background: "From parts unknown",
				notes: "Some useful information",
				is_public: Math.random() > .35,
				user: usr.uid,
				updated_at: new Date(now + (index * count) +  i),
				created_at: new Date(now - (index * count) + 1)
			}));
		}
		return npc;
	}

	addToLikes(em: EntityManager, npc) {
		if(npc.is_public)
			return em.create(NpcLikes, {npc: npc, likes: Math.floor(Math.random() * 1000)});
	}
}




