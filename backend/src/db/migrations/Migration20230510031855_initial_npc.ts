import { Migration } from '@mikro-orm/migrations';

export class Migration20230510031855_initial_npc extends Migration {

	async up(): Promise<void> {
		this.addSql('alter table "users" add column "user_name" varchar(25) not null, add column "password" varchar(16) not null;');
		this.addSql('alter table "users" drop column "name";');
		this.addSql('alter table "users" drop column "pet_type";');
		this.addSql('alter table "users" drop column "is_matched";');
		this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');
	}

	async down(): Promise<void> {
		this.addSql('alter table "users" add column "name" varchar not null default null, add column "pet_type" varchar not null default null, add column "is_matched" bool not null default false;');
		this.addSql('alter table "users" drop constraint "users_user_name_unique";');
		this.addSql('alter table "users" drop column "user_name";');
		this.addSql('alter table "users" drop column "password";');
	}

}
