import { Entity, ManyToOne, Property, Reference } from "@mikro-orm/core";
import { User } from "./User.js";

@Entity()
export class Match {
	// person who performed the match/swiped right
	@ManyToOne({ primary: true }) // makes this a composit key
	owner!: Reference<User>;

	// account whose profile was swiped-right-on
	@ManyToOne({ primary: true }) // also makes this a composit key
	matchee!: Reference<User>;

	@Property()
	created_at = new Date();
}
