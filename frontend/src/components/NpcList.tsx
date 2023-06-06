import { useEffect, useState } from "react";
import { NumberPublicNpcsService, PublicNpcService } from "../services/NpcService.tsx";
import {INpcBody} from "../../../backend/src/types.ts";
import { Footer, Footerstuff } from "./footer.tsx";

export const NpcList = () => {
	const cardsPerPage = 25;
	const [numPages, setNumPages] = useState(0);
	const [curPage, setCurPage] = useState(0);
	const [npcs, setNpcs] = useState<INpcBody[]>([]);

	const fetchNpcCount = () => {
		NumberPublicNpcsService.send()
			.then((num) => {
				console.log("Number of NPCS: ", num.data);
				setNumPages((Math.ceil(num.data / cardsPerPage)));
			})
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

	const addRow = (n: INpcBody) =>{
		return (<tr className="row" key={n.name + n.race}>
			<td> {n.name}</td>
			<td> {n.gender}</td>
			<td>{n.race}</td>
			<td>{n.age}</td>
		</tr>)
	}


	const onFirstButtonClick = () => setCurPage(1);

	const onPreviousButtonClick= () => setCurPage( curPage - 1);

	const onNextButtonClick = () => setCurPage(curPage + 1);

	const onLastButtonClick = () => setCurPage(numPages);

	useEffect(() => {
		fetchNpcCount();
		fetchNpcs();
	}, [curPage]);

	const footerStuff: Footerstuff = {
		onFirst: onFirstButtonClick,
		onPrevious: onPreviousButtonClick,
		onNext: onNextButtonClick,
		onLast: onLastButtonClick,
		currentPage: curPage + 1,
		numPages: numPages

	}

	return(
		<div className="content">
			<div className="npcList">
				<table>
					<thead>
					<tr>
						<th scope="column">Name</th>
						<th scope="column">Race</th>
						<th scope="column">Gender</th>
						<th scope="column">Age</th>
					</tr>
					</thead>
					<tbody>
						{npcs.map((n) => addRow(n))}
					</tbody>
				</table>
				<div className="test">
						Test
				</div>
			</div>
			<Footer{...footerStuff} />
		</div>);
}


