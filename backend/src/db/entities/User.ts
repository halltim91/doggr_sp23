import {Entity, Property, Unique} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity({tableName: "users"})
//the class name is the default table name!!
export class User extends BaseEntity {	
	@Property()
	@Unique()
	email!: string;

	@Property({length: 25})
	@Unique()
	userName!: string;

	@Property({length: 16})
	password!: string;

}
