import { User } from "../backend/src/db/entities/User";

export type NpcData = {
	name: string,
	age?: number,
	gender?: string,
	race?: string,
	hairColor?: string,
	eyeColor?: string,
	height?: string,
	weight?: string,
	background?: string,
	notes?: string,
	isPublic?: boolean,
	owner: User
}
