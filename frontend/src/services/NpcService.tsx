import { httpClient } from "./HttpClient.tsx";

export const PublicNpcService = {
	async send(start: number, end: number){
		return httpClient.request({
			url: '/npc',
			method: 'SEARCH',
			data: {
				start: start,
				end: end
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
	async send (id: number, start: number, end: number) {
		return httpClient.request({
			url: '/npc',
			method: 'SEARCH',
			data: {
				id: id,
				start: start,
				end: end
			}
		});
	}
}

export const NumberUserNpcsService = {
	async send(owner_id: number){
		return httpClient.get(`/npc/${owner_id}`);
	}
}

