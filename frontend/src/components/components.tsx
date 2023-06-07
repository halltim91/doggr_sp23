import '../style/components.css';

// const LoginButton = () => {
// 	const {isAuthenticated, logout, loginWithRedirect } = useAuth0();
//
// 	if(isAuthenticated)
// 		return (<button onClick={() => loginWithRedirect()}>Log In</button>)
// 	else
// 		return (<button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>Log Out</button>)
// }

export const Header = () => {
	return (<div className="header">
		<h1 className="title">Title</h1>
		<div className="button-div">
			<button>Public</button>
			<button>Private</button>
			<button>Login</button>
		</div>
	</div> );
}
