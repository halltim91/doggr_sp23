import { NpcList } from "./NpcList.tsx";
import { Header } from "./components.tsx";

export const PublicPage = () => {
	return (<div>
		<Header />
		<NpcList isPublic={true} />
	</div>)
}

export const PrivatePage = () => {
	return (<div>
		<Header />
		<NpcList isPublic={false} />
	</div>)
}
