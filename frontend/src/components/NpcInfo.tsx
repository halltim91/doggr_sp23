import "../style/Npc.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App.tsx";
import { NpcData } from "../../Types.ts";
import { User } from "firebase/auth";
import { AddNpcService, AddPublicNpcService, DeleteNpcService, UpdateNpcService } from "../services/NpcService.tsx";


export const NpcInfo = () => {
	const { state } = useLocation();
	const { s_npc } = state;
	const [npc, setnpc] = useState<NpcData>(s_npc);
	let { mode} = state;
	const { user } = useContext(UserContext);
	const nav = useNavigate();

	console.log("npc", npc);

	console.log(npc.user, user?.uid, mode);
	if(npc.user === user?.uid && mode === "view") mode = "edit";

	const btnTxt = user ? GetText(mode) : "Log In";
	const btnFcn = user ? GetFunction(user, npc, setnpc, mode, nav) : () => nav("/login");
	const dlt = async () => {
		const tkn = await user!.getIdToken(true).then((r) => r);
		DeleteNpcService.send(tkn, user!.uid, npc)
			.then((resp) => {
				console.log("deleted", resp);
			})
	}
	return(
		<>
			<div className="npcDetails">
				<table className = "npcTable">
					<tbody>
						<Row name="Name" value={fillNull(npc.name)} mode={mode} onChange={(e) => setnpc({...npc, name: e.target.value})} />
						<Row name="Age" value={fillNull(npc.age)} mode={mode} onChange={(e) => setnpc({...npc, age: e.target.value})} />
						<Row name="Gender" value={fillNull(npc.gender)} mode={mode} onChange={(e) => setnpc({...npc, gender: e.target.value})} />
						<Row name="Race" value={fillNull(npc.race)} mode={mode} onChange={(e) => setnpc({...npc, race: e.target.value})} />
						<Row name="Hair Color" value={fillNull(npc.hair_color)} mode={mode} onChange={(e) => setnpc({...npc, hair_color: e.target.value})} />
						<Row name="Eye Color" value={fillNull(npc.eye_color)} mode={mode} onChange={(e) => setnpc({...npc, eye_color: e.target.value})} />
						<Row name="Height" value={fillNull(npc.height)} mode={mode} onChange={(e) => setnpc({...npc, height: e.target.value})} />
						<Row name="Weight" value={fillNull(npc.weight)} mode={mode} onChange={(e) => setnpc({...npc, weight: e.target.value})} />
						{mode === "edit" || mode === "add" ?
							<tr>
								<td><label htmlFor="public"> Make Public</label> </td>
								<td><input type="checkbox" id="public" name="public" className="checkbox" value={npc.is_public ? "true" : "false"}
										onChange={(e) => setnpc({...npc, is_public: e.target.checked})} checked={npc.is_public}/></td>
							</tr> :
							<></>
						}
					</tbody>
				</table>
				<BackgroundTextArea setnpc={setnpc} npc={npc} mode={mode}/>
				<NotesTextArea mode={mode} setnpc={setnpc} npc={npc} />
				<ButtonPanel acceptText={btnTxt} onAccept={btnFcn} mode={mode} ondelete={dlt}/>
			</div>
		</>
	);
}

const Row =(props: {name: string, value: string, mode: string, onChange: (e)=>void}) => {
	return (
		<tr>
			<td><label htmlFor={props.name + "_input"}>{props.name}</label></td>
			<td><input id={props.name + "_input"} type="text" value={props.value} onChange={props.onChange} disabled={props.mode ==="view"}/></td>
		</tr>
	)
}

const ButtonPanel = (props: {acceptText: string, onAccept: () => void, mode: string, ondelete?: () => void}) =>{
	const nav = useNavigate();
	return(
		<div>
			<button onClick={() => nav(-1)}>Return</button>
			{props.mode === "edit" ?
				<button onClick={props.ondelete}>Delete</button> :
				<></>
			}
			<button onClick={props.onAccept}>{props.acceptText}</button>
		</div>
	);
}

const BackgroundTextArea = (props: {setnpc: (e) => void, npc: NpcData, mode: string}) => {
	return(
		<>
			<label htmlFor="background">Background</label>
			<textarea name="background" value={props.npc.background} onChange={(e) => props.setnpc({...props.npc, background: e.target.value})}
							rows={10} cols={70} disabled={props.mode ==="view"}/>
		</>
	)
}

const NotesTextArea = (props: {mode: string, setnpc: (e) => void, npc: NpcData}) => {
	return (
			props.mode !== "view" ?
			<>
				<label htmlFor="notes">Notes</label>
				<textarea name="notes" value={props.npc.notes} onChange={(e) => props.setnpc({...props.npc, notes: e.target.value})}
									rows={10} cols={70}/>
			</> :
			<></>
	)
}

/**
 * Returns val as a string or "" if it is undefined
 * @param val
 */
function fillNull(val: any) : string{
	return val ? val.toString() : "";
}

function GetFunction(user: User, npc:NpcData, setnpc: (x) => void, mode:string, nav: NavigateFunction): () => void {
	switch(mode){
		case "view":
			console.log("view fcn");
			return async () => {
				//add public npc to private npc list
				const tkn = await user.getIdToken(true).then((r) => r);
				AddPublicNpcService.send(tkn, user.uid, npc.id!).then((resp) =>{
					console.log("Added public npc", resp.data);
					setnpc(resp.data)
					nav("/npc", {state: {s_npc: resp.data, mode: "edit"}, replace: true});
				})
			};
		case "add":
			console.log("add fcn");
			return async () => {
				//add new npc to private list
				const tkn = await user.getIdToken(true).then((r) => r);
				AddNpcService.send(tkn, user.uid, npc)
					.then((resp) => {
						console.log("added ", resp.data);
						setnpc(resp.data);
						nav("/npc", {state: {s_npc: npc, mode: "edit"}, replace: true});
					})
			};
		case "edit":
			return async () => {
				//update existing npc
				console.log("edit fcn");
				const tkn = await user.getIdToken(true).then((r) => r);
				UpdateNpcService.send(tkn, user.uid, npc as NpcData)
					.then((resp) => {
						console.log("resp", resp.data);
						setnpc(resp.data);
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


