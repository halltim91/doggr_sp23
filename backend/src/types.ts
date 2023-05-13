import { User } from "./db/entities/User";

export type INpcBody = {
	name: string,
	age: number,
	gender: string,
	race: string,
	haircolor: string,
	height: string,
	background: string,
	notes: string,
	isPublic: boolean,
	owner: User
}

export type IUserBody = {
	email: string,
	username: string,
	password: string
}
