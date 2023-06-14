import { UserContext } from "../App.tsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut} from "firebase/auth";

export function Logout() {
	const { user } = useContext(UserContext);
	const { auth} = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		async function processLogout() {
			if(user && auth){
				signOut(auth)
					.then(() =>{
						navigate("/");
					})
					.catch((err) => {
						console.log("Error signing out", err.message);
					})
			}
		}
		processLogout().then(() =>{
			console.log("Log out sucessfull");
			//user = null;
		})
	})
	return(<></>);
}
