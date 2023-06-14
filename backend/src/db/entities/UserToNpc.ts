import { Cascade, Entity, ManyToOne, PrimaryKey, Property, Reference, Unique } from "@mikro-orm/core";
import { Npc } from "./Npc.js";
import { User } from "./User.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity({tableName: "userToNpc"})
export class UserToNpc extends BaseEntity{

	@PrimaryKey()
	user!: string;

	@ManyToOne({primary: true})
	npc!: Reference<Npc>;
}
