import '../style/components.css';
import { useContext } from "react";
import { UserContext } from "../App.tsx";
import { Navigate, useNavigate } from "react-router-dom";

export const Header = () => {
	const navigate = useNavigate();
	return (<div className="header">
		<h1 className="title">ENpc</h1>
		<div className="button-div">
			<button className="btn" onClick={() => navigate("/")}>Public</button>
			<button className="btn" onClick={() => navigate("/user")}>Private</button>
			<LoginButton />
		</div>
	</div> );
}

export const LoginButton = () => {
	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = () =>{user ? navigate("/logout") : navigate("/login");}

	return(<button className="btn" onClick={handleClick}>{user ? "Log out" : "Log in"}</button>);
}

export const ProtectedRoute  = (props) => {
	const { user } = useContext(UserContext);
	return user ? props.children : <Navigate to="/login" />;
}
