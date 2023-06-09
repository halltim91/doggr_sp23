import {Entity, Property, Unique} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity({tableName: "users"})
//the class name is the default table name!!
export class User extends BaseEntity {	
	@Property()
	@Unique()
	uid!: string;

	@Property()
	@Unique()
	email!: string;

}
