import { Entity, ManyToOne, PrimaryKey, Reference, Unique } from "@mikro-orm/core";
import { Npc } from "./Npc.js";
import { User } from "./User.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity({tableName: "userToNpc"})
export class UserToNpc extends BaseEntity{
	@PrimaryKey()
	id!: number;

	@ManyToOne()
	user!: Reference<User>;

	@ManyToOne()
	npc!: Reference<Npc>;
}
