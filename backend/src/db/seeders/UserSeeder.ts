import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../entities/User.js";

export class UserSeeder extends Seeder {

	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			email: "email@email.com",
			userName: "lurkingTimbo",
			password: "qwerty1234"
		});
		em.create(User, {
			email: "email2@aol.com",
			userName: "tableTopLover123",
			password: "password"
		});
	}

}
