import { httpClient } from "./HttpClient.tsx";

export const AddUserService = {
	async send(email: string, uid: string){
		return httpClient.post("/users", {email, uid});
	}
}

export const GetUserIdService = {
	async send(token: string, uid: string) {
		return httpClient.request({
			url: "/user/id",
			method: "SEARCH",
			data: {
				token: token,
				uid: uid
			}
		});
	}
}
