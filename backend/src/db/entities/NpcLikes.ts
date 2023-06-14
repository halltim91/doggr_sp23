import { Cascade, Entity, OneToOne, Property, Reference } from "@mikro-orm/core";

import { Npc } from "./Npc";

@Entity({tableName: "likes"})
export class NpcLikes{

	@OneToOne({primary: true, name: "npc"})
	npc!: Reference<Npc>;

	@Property()
	likes: number = 0;
}
