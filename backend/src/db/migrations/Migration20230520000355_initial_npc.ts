import { Migration } from '@mikro-orm/migrations';

export class Migration20230520000355_initial_npc extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "user_name" varchar(25) not null, "password" varchar(16) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');

    this.addSql('create table "npcs" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(40) not null, "age" int not null, "gender" varchar(25) not null, "race" varchar(25) not null, "hair_color" varchar(25) not null, "height" varchar(10) not null, "background" varchar(1000) not null, "notes" varchar(1000) not null, "is_public" boolean not null default false, "owner_id" int not null);');

    this.addSql('alter table "npcs" add constraint "npcs_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
  }

}
