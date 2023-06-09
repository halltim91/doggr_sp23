import { Migration } from '@mikro-orm/migrations';

export class Migration20230609151658_updated_user extends Migration {

	async up(): Promise<void> {
		this.addSql('alter table "users" add column "uid" varchar(255) not null;');
		this.addSql('alter table "users" drop constraint "users_user_name_unique";');
		this.addSql('alter table "users" drop column "user_name";');
		this.addSql('alter table "users" drop column "password";');
		this.addSql('alter table "users" add constraint "users_uid_unique" unique ("uid");');

		this.addSql('alter table "npcs" alter column "hair_color" drop default;');
		this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
	}

	async down(): Promise<void> {
		this.addSql('alter table "users" add column "user_name" varchar(25) not null, add column "password" varchar(16) not null;');
		this.addSql('alter table "users" drop constraint "users_uid_unique";');
		this.addSql('alter table "users" drop column "uid";');
		this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');

		this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
		this.addSql('alter table "npcs" alter column "hair_color" set default \'\';');
	}

}
