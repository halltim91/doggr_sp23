
export type INpcBody = {
	id?: number,
	name: string,
	age?: number,
	gender?: string,
	race?: string,
	hair_color?: string,
	eye_color?: string,
	height?: string,
	weight?: string,
	background?: string,
	notes?: string,
	is_public: boolean,
}

export type IUserBody = {
	email: string,
	uid: string
}
