import {
	Collection,
	Entity,
	EntitySchema,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
	Cascade,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Match } from "./Match.js";

@Entity({ tableName: "users" })
//the class name is the default table name!!
export class User extends BaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	name!: string;

	@Property()
	petType!: string;

	// Note that these DO NOT EXIST in the databse itself!
	@OneToMany(
		() => Match, // table we are linking to
		(match) => match.owner, // field we are linking to
		{ cascade: [Cascade.PERSIST, Cascade.REMOVE] }
	) // if user is removed, remove them from matches too
	matches!: Collection<Match>;

	@OneToMany(() => Match, (match) => match.matchee, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
	matched_by!: Collection<Match>;
}
