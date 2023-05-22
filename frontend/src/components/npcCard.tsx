import '../style/card.css';

export const CondensedNpcCard = (props: any) => {
	return(
		<div className="card">
			<h2 className="header">{props.name}</h2>
			<h3 className="body">Race: {props.race}</h3>
		</div>
	);
}
