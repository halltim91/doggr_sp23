import '../style/components.css';
import { useContext } from "react";
import { UserContext } from "../App.tsx";
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
	const navigate = useNavigate();

	const handleClick = () =>{user ? navigate("/logout") : navigate("/login");}

	return(<button onClick={handleClick}>{user ? "Log out" : "Log in"}</button>);
}

export const ProtectedRoute  = (props) => {
	const { user } = useContext(UserContext);
	return user ? props.children : <Navigate to="/login" />;
}
