import { Migration } from '@mikro-orm/migrations';

export class Migration20230610211100_added_user_npc extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "userToNpc" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user" varchar(255) not null, "npc" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "userToNpc" cascade;');
  }

}
