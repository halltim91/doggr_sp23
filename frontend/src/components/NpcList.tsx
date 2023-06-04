import { useEffect, useState } from "react";
import { NumberPublicNpcsService, PublicNpcService } from "../services/NpcService.tsx";
import {INpcBody} from "../../../backend/src/types.ts";

export const NpcList = () => {
	const cardsPerPage = 10;
	const [numPages, setNumPages] = useState(0);
	const [curPage, setCurPage] = useState(0);
	const [npcs, setNpcs] = useState<INpcBody[]>([]);

	const fetchNpcCount = () => {
		NumberPublicNpcsService.send()
			.then((num) => setNumPages((Math.ceil(num.data / cardsPerPage))))
			.catch((err) => console.error(err));
	};
	const fetchNpcs = () => {
		const start = curPage * cardsPerPage;
		const end = (curPage + 1) * cardsPerPage - 1;
		PublicNpcService.send(start, end)
			.then((npcs) => setNpcs(npcs.data))
			.catch((err) => {
				console.log("Error fetching public npcs between ", start, end, err);
			});
	};

	useEffect(() => {
		console.log("getting number of npcs");
		fetchNpcCount();
		fetchNpcs();
	}, []);

	return(<div className="npcList">
		{npcs.map((n) => <p key={n.name}>{n.name}</p>)}
	</div>)
}
