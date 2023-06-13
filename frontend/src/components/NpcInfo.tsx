import "../style/Npc.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App.tsx";
import { NpcData } from "../../Types.ts";
import { User } from "firebase/auth";
import { AddNpcService, AddPublicNpcService, UpdateNpcService } from "../services/NpcService.tsx";


export const NpcInfo = () => {
	const { state } = useLocation();
	const { s_npc } = state;
	const [npc, setnpc] = useState(s_npc);
	const { mode} = state;
	const { user } = useContext(UserContext);
	const nav = useNavigate();

	console.log("npc", npc);

	const btnTxt = user ? GetText(mode) : "Log In";
	const btnFcn = user ? GetFunction(user, npc, setnpc, mode, nav) : () => nav("/login");

	return(
		<>
			<div className="npcDetails">
				<table className = "npcTable">
					<tbody>
						<Row name="Name" value={fillNull(npc.name)} onChange={(e) => setnpc({...npc, name: e.target.value})} />
						<Row name="Age" value={fillNull(npc.age)} onChange={(e) => setnpc({...npc, age: e.target.value})} />
						<Row name="Gender" value={fillNull(npc.gender)} onChange={(e) => setnpc({...npc, gender: e.target.value})} />
						<Row name="Race" value={fillNull(npc.race)} onChange={(e) => setnpc({...npc, race: e.target.value})} />
						<Row name="Hair Color" value={fillNull(npc.hair_color)} onChange={(e) => setnpc({...npc, hair_color: e.target.value})} />
						<Row name="Eye Color" value={fillNull(npc.eye_color)} onChange={(e) => setnpc({...npc, eye_color: e.target.value})} />
						<Row name="Height" value={fillNull(npc.height)} onChange={(e) => setnpc({...npc, height: e.target.value})} />
						<Row name="Weight" value={fillNull(npc.weight)} onChange={(e) => setnpc({...npc, weight: e.target.value})} />
					</tbody>
				</table>
				<label htmlFor="background">Background</label>
				<textarea name="background" value={npc?.background} onChange={(e) => setnpc({...npc, background: e.target.value})}
				rows={10} cols={70}/>
				<label htmlFor="notes">Notes</label>
				<textarea name="notes" value={npc?.notes} onChange={(e) => setnpc({...npc, notes: e.target.value})}
									rows={10} cols={70}/>
				<ButtonPanel acceptText={btnTxt} onAccept={btnFcn}/>
			</div>
		</>
	);
}

const Row =(props: {name: string, value: string, onChange: (e)=>void}) => {
	return (
		<tr>
			<td><label htmlFor={props.name + "_input"}>{props.name}</label></td>
			<td><input id={props.name + "_input"} type="text" value={props.value} onChange={props.onChange}/></td>
		</tr>
	)
}

const ButtonPanel = (props: {acceptText: string, onAccept: () => void,}) =>{
	const nav = useNavigate();
	return(
		<div>
			<button onClick={() => nav(-1)}>Return</button>
			<button onClick={props.onAccept}>{props.acceptText}</button>
		</div>
	);
}

/**
 * Returns val as a string or "" if it is undefined
 * @param val
 */
function fillNull(val: any) : string{
	return val ? val.toString() : "";
}

function GetFunction(user: User, npc:NpcData, setnpc, mode:string, nav: NavigateFunction): () => void {
	switch(mode){
		case "view":
			return async () => {
				//add public npc to private npc list
				const tkn = await user.getIdToken(true).then((r) => r);
				AddPublicNpcService.send(tkn, user.uid, npc.id!).then((resp) =>{
					console.log("Added public npc", resp);
					nav("/npc", {state: {s_npc: resp.data, mode: "edit"}});
				})
			};
		case "add":
			return async () => {
				//add new npc to private list
				const tkn = await user.getIdToken(true).then((r) => r);
				AddNpcService.send(tkn, user.uid, npc)
					.then((resp) => {
						console.log("added ", resp.data);
						nav("/npc", {state: {s_npc: resp.data, mode: "edit"}});
					})
			};
		case "edit":
			return async () => {
				//update existing npc
				const tkn = await user.getIdToken(true).then((r) => r);
				UpdateNpcService.send(tkn, user.uid, npc)
					.then((resp) => {
						console.log("updated ", resp);
					})
			};
		default:
			return () => {
				console.log("how did you get here?");
			}
	}
}

function GetText(mode: string){
	switch(mode){
		case "view":
			//add public npc to private npc list
			return "Add to Private";
		case "add":
			//add new npc to private list
			return "Add";
		case "edit":
			//update existing npc
			return "Update";
		default:
			return "Uh oh";
	}
}


