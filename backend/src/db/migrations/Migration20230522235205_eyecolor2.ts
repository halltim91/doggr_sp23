import { Migration } from '@mikro-orm/migrations';

export class Migration20230522235205_eyecolor2 extends Migration {

	async up(): Promise<void> {
		this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
		this.addSql('alter table "npcs" alter column "hair_color" set default \'\';');
	}

	async down(): Promise<void> {
		this.addSql('alter table "npcs" alter column "hair_color" drop default;');
		this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
	}

}
