import { Entity, ManyToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity.js";
import {User} from "./User.js";

@Entity({tableName: "npcs"})
export class Npc extends BaseEntity {

	@PrimaryKey()
	id!: number;

	@Property({length: 40})
	name!: string;

	@Property({ nullable: true })
	age?: number;

	@Property({length: 25, nullable: true})
	gender?: string;

	@Property({length: 25, nullable: true})
	race?: string;

	@Property({length: 25, nullable: true})
	hair_color?: string;

	@Property({length: 25, nullable: true})
	eye_color?: string;

	@Property({length: 10, nullable: true})
	height?: string;

	@Property({ nullable: true })
	weight?: string;

	@Property({length: 1000, nullable: true})
	background?: string;

	@Property({length: 1000, nullable: true})
	notes?: string;

	@Property()
	is_public: boolean = false;

	@Property()
	user!: string;

}
