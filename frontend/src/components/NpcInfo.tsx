import { useContext} from "react";
import { NpcContext } from "./ViewNpcPage.tsx";
import "../style/Npc.css"

export const NpcInfo = () => {
	const npc = useContext(NpcContext);
	if(!npc)
		return (<div>Missing Npc Data!</div>);

	return (
		<div className="npcDetails">
			<Row name="Name" value={fillNull(npc.name)} />
			<Row name="Age" value={fillNull(npc.age)} />
			<Row name="Gender" value={fillNull(npc.gender)} />
			<Row name="Race" value={fillNull(npc.race)} />
			<Row name="Hair Color" value={fillNull(npc.hairColor)} />
			<Row name="Eye Color" value={fillNull(npc.eyeColor)} />
			<Row name="Height" value={fillNull(npc.height)} />
			<Row name="Weight" value={fillNull(npc.weight)} />
		</div>
	);
}

const Row =(props: {name: string, value: string}) => {
	return (
		<>
		<label htmlFor={props.name + "_input"}>{props.name}</label>
			<input id={props.name + "_input"} type="text" value={props.value}/>
		</>
	)
}

/**
 * Returns val as a string or "" if it is undefined
 * @param val
 */
function fillNull(val: any) : string{
	return val ? val.toString() : "";
}
