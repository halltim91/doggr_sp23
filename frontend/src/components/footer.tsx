export type Footerstuff = {
	onFirst: () => void,
	onPrevious: () => void,
	onNext: () => void,
	onLast: () => void,
	currentPage: number,
	numPages: number
}

export const Footer = (prop: Footerstuff) =>{
	return (<div className="footer">
		<div className="navigation">
			<button onClick={prop.onFirst} disabled={prop.currentPage === 1}>First</button>
			<button onClick={prop.onPrevious} disabled={prop.currentPage === 1}>Previous</button>
			<p id="pageOf">{prop.currentPage} of {prop.numPages}</p>
			<button onClick={prop.onNext} disabled={prop.currentPage === prop.numPages}>Next</button>
			<button onClick={prop.onLast} disabled={prop.currentPage === prop.numPages}>Last</button>
		</div>
	</div>);
}
