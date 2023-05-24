import '../style/components.css';

export const Header = () => {
	return (<div className="header">
		<h1 className="title">Title</h1>
		<div className="button-div">
			<button>Public</button>
			<button>Private</button>
			<button>Log in</button>
		</div>
	</div> );
}

export const NpcList = () => {
	return(<div className="npcList">
		<div className="navigation">
			<button>First</button>
			<button>Previous</button>
			<p>X of XX</p>
			<button>Next</button>
			<button>Last</button>
		</div>
	</div>)
}
