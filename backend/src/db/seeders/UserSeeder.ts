import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../entities/User.js";

export class UserSeeder extends Seeder {

	async run(em: EntityManager): Promise<void> {

		em.create(User, {
			email: "someemail@aol.com",
			uid: "slkdjfsdf908lwer98"
		});
		em.create(User, {
			email: "email7@aol.com",
			uid: "slkdjfsl5lkl4kj298"
		});
	}

}
