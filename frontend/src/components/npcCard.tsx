import '../style/card.css';

export const CondensedNpcCard = (props: any) => {
	return(
		<div className="card">
			<h2 className="header">{props.name}</h2>
			<h3 className="body">Race: {props.race}</h3>
			<h3 className="body">Age: {props.age}</h3>
			<h3 className="body">Gender: {props.gender}</h3>
			<h3 className="body">Hair Color: {props.haircolor}</h3>
			<h3 className="body">Eye Color: {props.eyecolor}</h3>
			<h3 className="body">Height: {props.height}</h3>

		</div>
	);
}
