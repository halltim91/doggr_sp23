import { Entity, ManyToOne, Reference } from "@mikro-orm/core";
import { Npc } from "./Npc.js";
import { User } from "./User.js";

@Entity({tableName: "userToNpc"})
export class UserToNpc {
	@ManyToOne({primary: true})
	user!: Reference<User>;

	@ManyToOne({primary: true})
	npc!: Reference<Npc>;
}
