import { httpClient } from "./HttpClient.tsx";
import { NpcData } from "../../Types.ts";

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

export const AddNpcService = {
	async send(token: string, uid:string, npc: NpcData){
		return httpClient.post("/npcs", {token, uid, npc});
	}
}

export const AddPublicNpcService = {
	async send(token: string, uid: string, npc_id: number) {
		return httpClient.post("/npc/existing", {token, uid, npc_id});
	}
}

export const UpdateNpcService = {
	async send(token: string, uid: string, npc: NpcData) {
		return httpClient.put("/npc/update", {token, uid, npc});
	}
}

export const DeleteNpcService = {
	async send(token: string, uid: string, npc: NpcData){
		return httpClient.request({
			url: `/npc/${uid}/${npc.id}`,
			method: "delete",
			headers: {
				token: token
			}
		})
	}
}

