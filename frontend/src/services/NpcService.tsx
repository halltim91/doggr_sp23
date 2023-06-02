import { httpClient } from "./HttpClient.tsx";

export const PublicNpcService = {
	async send(start: number, end: number){
		return httpClient.get("/npc", {data: {start: start, end: end}});
	}
};

export const NumberPublicNpcsService = {
	async send(){
		return httpClient.get("/npc/count");
	}
}

export const UserNpcService = {
	async send (id: number, start: number, end: number) {
		return httpClient.get("/npc/user", {data: {user_id: id, start: start, end: end}});
	}
}

export const NumberUserNpcsService = {
	async send(owner_id: number){
		return httpClient.get("/npc/user/count", {data: {owner_id: owner_id}});
	}
}

