import { useContext, useEffect, useState } from "react";
import {
	NumberPublicNpcsService,
	NumberUserNpcsService,
	PublicNpcService,
	UserNpcService
} from "../services/NpcService.tsx";
import {INpcBody} from "../../../backend/src/types.ts";
import { Footer, Footerstuff } from "./footer.tsx";
import { UserContext } from "../App.tsx";
import { useNavigate } from "react-router-dom";

export const NpcList = (props: {isPublic: boolean}) => {
	const isPublic: boolean = props.isPublic;
	const cardsPerPage = 25;
	const [numPages, setNumPages] = useState(0);
	const [curPage, setCurPage] = useState(0);
	const [npcs, setNpcs] = useState<INpcBody[]>([]);
	const { user }= useContext(UserContext);
	const navigate = useNavigate();

	const fetchNpcCount = async () => {
		if(isPublic){
			NumberPublicNpcsService.send()
				.then((num) => {
					console.log("Number of NPCS: ", num.data);
					setNumPages((Math.ceil(num.data / cardsPerPage)));
				})
				.catch((err) => console.error(err));
		} else {
			if (user){
				const token = await user.getIdToken().then((resp) => resp);
				NumberUserNpcsService.send(token, user.uid)
					.then((num)=> {
						console.log("Number of user NPCS: ", num.data);
						setNumPages((Math.ceil(num.data/cardsPerPage)));
					});
			} else {
				navigate("/login");
			}
		}
	};

	const fetchNpcs = async () => {
		const start = curPage * cardsPerPage;
		if (isPublic){
			console.log("loaded public npcs");
			PublicNpcService.send(start, cardsPerPage)
				.then((npcs) => setNpcs(npcs.data))
				.catch((err) => {
					console.log("Error fetching public npcs", err.message);
				});
		} else {
			if(user){
				console.log("Loaded private npcs");
				const token = await user.getIdToken().then((resp) => resp);
				UserNpcService.send(token, user.uid, start, cardsPerPage)
					.then((npcs) => setNpcs(npcs.data))
					.catch((err) => console.log("Error fetching private npcs", err));
			} else {
				console.log("Couldn't load private npcs cause user is null");
			}
		}
	};

	const AddRow = (n: INpcBody) =>{
		const onclick = () => {
			console.log("npc", n);
			navigate("/npc", {state: {npc: n}});
		}

		return (<tr className="row" key={n.name + n.race} onClick={onclick}>
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
						{npcs.map((n) => AddRow(n))}
					</tbody>
				</table>
			</div>
			<Footer{...footerStuff} />
		</div>);
}


