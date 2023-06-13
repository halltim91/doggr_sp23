import { NpcInfo } from "./NpcInfo.tsx"
import { Header } from "./components.tsx";


export const ViewNpcPage = () => {
	return (
		<>
			<Header />
			<div className="content">
				<NpcInfo />
			</div>
		</>
	)
}
