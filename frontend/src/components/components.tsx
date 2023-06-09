import '../style/components.css';
import { Children, useContext } from "react";
import { UserContext } from "../App.tsx";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export const Header = () => {
	const navigate = useNavigate();
	return (<div className="header">
		<h1 className="title">Title</h1>
		<div className="button-div">
			<button onClick={() => navigate("/")}>Public</button>
			<button onClick={() => navigate("/user")}>Private</button>
			<LoginButton />
		</div>
	</div> );
}

export const LoginButton = () => {
	const {user} = useContext(UserContext);
	//const {auth} = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = () =>{
		user ? navigate("/logout") : navigate("/login");
		// if (user){
		// 	signOut(auth)
		// 		.then(() =>{
		// 			navigate("/");
		// 		})
		// 		.then(() =>{
		// 			console.log("Signed out!", user.email);
		// 			user = null;
		// 			}
		// 		)
		// 		.catch((err) => {
		// 			console.log(err.message);
		// 		});
		//
		// } else {
		// 	navigate("/login");
		// }
	}

	return(
		<button onClick={handleClick}>
			{user ? "Log out" : "Log in"}
		</button>
	);
}

export const ProtectedRoute  = (props) => {
	const { user } = useContext(UserContext);
	console.log("Protected route",user);
	if(!user) {
		return (<Navigate to="/login" />);
	}
	return props.children;
}
