import { httpClient } from "./HttpClient.tsx";

export const PublicNpcService = {
	async send(offset: number, limit: number){
		return httpClient.request({
			url: '/npc',
			method: 'SEARCH',
			data: {
				offset: offset,
				limit: limit
			}
		});
	}
};

export const NumberPublicNpcsService = {
	async send(){
		return httpClient.get("/npc/count");
	}
}

export const UserNpcService = {
	async send (token: string, uid: string, offset: number, limit: number) {
		return httpClient.request({
			url: '/npc/user',
			method: 'SEARCH',
			data: {
				token: token,
				uid: uid,
				offset: offset,
				limit: limit
			}
		});
	}
}

export const NumberUserNpcsService = {
	async send(token: string, uid: string){
		return httpClient.request({
			url: "/npc/user/count",
			method: "search",
			data: {
				token: token,
				uid: uid
			}
		});
	}
}

