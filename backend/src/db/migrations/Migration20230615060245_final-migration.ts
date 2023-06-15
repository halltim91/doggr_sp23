import { Migration } from '@mikro-orm/migrations';

export class Migration20230615060245_final-migration extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "likes" ("npc_id" int not null, "likes" int not null default 0, constraint "likes_pkey" primary key ("npc_id"));');

    this.addSql('alter table "likes" add constraint "likes_npc_id_foreign" foreign key ("npc_id") references "npcs" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "npcs" drop constraint "npcs_owner_id_foreign";');

    this.addSql('alter table "npcs" add column "weight" varchar(255) null, add column "user" varchar(255) not null;');
    this.addSql('alter table "npcs" alter column "age" type int using ("age"::int);');
    this.addSql('alter table "npcs" alter column "age" drop not null;');
    this.addSql('alter table "npcs" alter column "gender" type varchar(25) using ("gender"::varchar(25));');
    this.addSql('alter table "npcs" alter column "gender" drop not null;');
    this.addSql('alter table "npcs" alter column "race" type varchar(25) using ("race"::varchar(25));');
    this.addSql('alter table "npcs" alter column "race" drop not null;');
    this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
    this.addSql('alter table "npcs" alter column "hair_color" drop not null;');
    this.addSql('alter table "npcs" alter column "eye_color" type varchar(25) using ("eye_color"::varchar(25));');
    this.addSql('alter table "npcs" alter column "eye_color" drop not null;');
    this.addSql('alter table "npcs" alter column "height" type varchar(10) using ("height"::varchar(10));');
    this.addSql('alter table "npcs" alter column "height" drop not null;');
    this.addSql('alter table "npcs" alter column "background" type varchar(1000) using ("background"::varchar(1000));');
    this.addSql('alter table "npcs" alter column "background" drop not null;');
    this.addSql('alter table "npcs" alter column "notes" type varchar(1000) using ("notes"::varchar(1000));');
    this.addSql('alter table "npcs" alter column "notes" drop not null;');
    this.addSql('alter table "npcs" drop column "owner_id";');

    this.addSql('alter table "users" drop constraint "users_uid_unique";');
    this.addSql('alter table "users" drop constraint "users_pkey";');
    this.addSql('alter table "users" drop column "id";');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("uid");');

    this.addSql('alter table "userToNpc" add column "npc_id" int not null;');
    this.addSql('alter table "userToNpc" drop constraint "userToNpc_pkey";');
    this.addSql('alter table "userToNpc" add constraint "userToNpc_npc_id_foreign" foreign key ("npc_id") references "npcs" ("id") on update cascade;');
    this.addSql('alter table "userToNpc" drop column "id";');
    this.addSql('alter table "userToNpc" drop column "npc";');
    this.addSql('alter table "userToNpc" add constraint "userToNpc_pkey" primary key ("user", "npc_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "likes" cascade;');

    this.addSql('alter table "userToNpc" drop constraint "userToNpc_npc_id_foreign";');

    this.addSql('alter table "users" add column "id" serial;');
    this.addSql('alter table "users" drop constraint "users_pkey";');
    this.addSql('alter table "users" add constraint "users_uid_unique" unique ("uid");');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');

    this.addSql('alter table "npcs" add column "owner_id" int not null;');
    this.addSql('alter table "npcs" alter column "age" type int using ("age"::int);');
    this.addSql('alter table "npcs" alter column "age" set not null;');
    this.addSql('alter table "npcs" alter column "gender" type varchar(25) using ("gender"::varchar(25));');
    this.addSql('alter table "npcs" alter column "gender" set not null;');
    this.addSql('alter table "npcs" alter column "race" type varchar(25) using ("race"::varchar(25));');
    this.addSql('alter table "npcs" alter column "race" set not null;');
    this.addSql('alter table "npcs" alter column "hair_color" type varchar(25) using ("hair_color"::varchar(25));');
    this.addSql('alter table "npcs" alter column "hair_color" set not null;');
    this.addSql('alter table "npcs" alter column "eye_color" type varchar(25) using ("eye_color"::varchar(25));');
    this.addSql('alter table "npcs" alter column "eye_color" set not null;');
    this.addSql('alter table "npcs" alter column "height" type varchar(10) using ("height"::varchar(10));');
    this.addSql('alter table "npcs" alter column "height" set not null;');
    this.addSql('alter table "npcs" alter column "background" type varchar(1000) using ("background"::varchar(1000));');
    this.addSql('alter table "npcs" alter column "background" set not null;');
    this.addSql('alter table "npcs" alter column "notes" type varchar(1000) using ("notes"::varchar(1000));');
    this.addSql('alter table "npcs" alter column "notes" set not null;');
    this.addSql('alter table "npcs" add constraint "npcs_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "npcs" drop column "weight";');
    this.addSql('alter table "npcs" drop column "user";');

    this.addSql('alter table "userToNpc" add column "id" serial not null, add column "npc" varchar(255) not null;');
    this.addSql('alter table "userToNpc" drop constraint "userToNpc_pkey";');
    this.addSql('alter table "userToNpc" drop column "npc_id";');
    this.addSql('alter table "userToNpc" add constraint "userToNpc_pkey" primary key ("id");');
  }

}
