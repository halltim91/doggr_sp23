import {Entity, ManyToOne, Property, Reference} from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity.js";
import {User} from "./User.js";

@Entity({tableName: "npcs"})
export class Npc extends BaseEntity {

	@Property({length: 40})
	name!: string;

	@Property()
	age: number;

	@Property({length: 25})
	gender: string;

	@Property({length: 25})
	race: string;

	@Property({length: 25})
	hairColor: string;

	@Property({length: 25})
	eyeColor: string;

	@Property({length: 10})
	height: string;

	@Property({length: 1000})
	background: string;

	@Property({length: 1000})
	notes: string;

	@Property()
	isPublic: boolean = false;

	@ManyToOne()
	owner!: Reference<User>;
}
