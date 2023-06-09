import { useContext, useState } from "react";
import {fbApp} from "../firebase-config.ts";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { UserContext } from "../App.tsx";
import { useNavigate } from "react-router-dom";

type Properties = {
	title: string,
	fcn: (e: string, p: string) => void
}

export const Login = () => {
	const authentication = getAuth(fbApp);
	let {user} = useContext(UserContext);
	const navigate = useNavigate();
	const handleLogin = (email: string, pword: string) => {
		console.log("login", email, pword)
		signInWithEmailAndPassword(authentication, email, pword)
			.then((resp) => {
				console.log(resp);
				user = resp.user;
				navigate("/user");
			})
			.catch((err) => {
				console.log(err.message);
			})
	};

	const handleSignUp = (email: string, pword: string) => {
		console.log("signup", email, pword);
		createUserWithEmailAndPassword(authentication, email, pword)
			.then((resp) => {
				console.log(resp);
				user = resp.user;
			})
			.catch((err) => {
				console.log(err.message);
			})
	};

	const EmailPasswordPrompt = (prop: Properties) => {
		const [email, setemail] = useState("");
		const [pword, setpword] = useState("");
		return (
			<div>
				<div >
					<h2>{prop.title}</h2>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="email" name="email" onChange={(e) => setemail(e.target.value)}/>
					<label htmlFor="password">Password:</label>
					<input type="password" name="password" onChange={(e) => setpword(e.target.value)}/>
				</div>
				<button title={prop.title} onClick={() => prop.fcn(email, pword)}/>
			</div>
		);
	}

	return(
		<div>
			<EmailPasswordPrompt {...{title: "Login", fcn: handleLogin}}/>
			<EmailPasswordPrompt {...{title: "Sign up", fcn: handleSignUp}}/>
		</div>
	);

};

