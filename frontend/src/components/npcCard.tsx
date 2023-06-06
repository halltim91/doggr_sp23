import '../style/card.css';
import { INpcBody } from "../../../backend/src/types.js";

export const NpcCard = (props: INpcBody) => {
	return(
		<div className="condensed-card">
			<h2 className="header">{props.name}</h2>
			<h3 className="body">{ props.gender } {props.race}</h3>
			<h3 className="body">{props.age} Years</h3>
		</div>
	);
}

export const AddNpcCard = () => {
	return(
		<div className="condensed-card add-card">
			<h2>ADD NPC</h2>
		</div>
	);
}
