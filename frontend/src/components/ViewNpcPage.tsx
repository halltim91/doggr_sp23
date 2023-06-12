import { createContext } from "react";
import { NpcInfo } from "./NpcInfo.tsx"
import { NpcData } from "../../Types.ts";
import { useLocation } from "react-router-dom";
import { Header } from "./components.tsx";

export const  NpcContext = createContext<NpcData>({} as NpcData);

export const ViewNpcPage = () => {

	const {state} = useLocation();
	const { npc } = state;
	return (
		<NpcContext.Provider value={npc}>
			<Header />
			<div className="content">
				<NpcInfo />
			</div>
		</NpcContext.Provider>
	)
}
