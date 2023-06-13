import { useNavigate } from "react-router-dom";
import "../style/NpcFloatButton.css";
import { NpcData } from "../../Types.ts";

export const AddNpcbutton = () => {
	const nav = useNavigate();

	const fcn = () => {
		nav("/npc", {state: {s_npc: newNpc() as NpcData, mode: "add"}});
	}

	return (<button className="float" onClick={fcn}>+</button>)
}

function newNpc(): NpcData {
	return {
		age: 0,
		background: "",
		eye_color: "",
		gender: "",
		hair_color: "",
		height: "",
		is_public: false,
		name: "",
		notes: "",
		owner: null,
		race: "",
		weight: ""
	}
}
