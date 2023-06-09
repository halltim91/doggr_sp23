import { httpClient } from "./HttpClient.tsx";

export const AddUserService = {
	async send(email: string, uid: string){
		return httpClient.post("/users", {email, uid});
	}
}
