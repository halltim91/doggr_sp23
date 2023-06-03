import { useEffect, useState } from "react";
import { NumberPublicNpcsService } from "../services/NpcService.tsx";

export const NpcList = () => {
	const cardsPerPage = 10;
	const [numPages, setNumPages] = useState(0);
	const [curPage, setCurPage] = useState(0);

	const fetchNpcCount = () => {
		NumberPublicNpcsService.send()
			.then((num) => setNumPages(((num.data / cardsPerPage) + 1)))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		console.log("getting number of npcs");
		fetchNpcCount();

	}, []);

	return(<div className="npcList"><p>{numPages}</p></div>)
}
