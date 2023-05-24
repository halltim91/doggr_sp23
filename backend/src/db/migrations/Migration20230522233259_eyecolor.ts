import { Migration } from '@mikro-orm/migrations';

export class Migration20230522233259_eyecolor extends Migration {

	async up(): Promise<void> {
		this.addSql('alter table "npcs" add column "eye_color" varchar(25) not null;');
	}

	async down(): Promise<void> {
		this.addSql('alter table "npcs" drop column "eye_color";');
	}

}
