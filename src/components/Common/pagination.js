import React, { Component } from 'react';

class Pagination extends Component {

	render() {

		const activePage = this.props.activePage;
		const count = this.props.count;
		const numPage = this.props.numPage;
		let pag = 1;
		const pagination = [];

		pag = Math.ceil(count/numPage);

		const firstPage = activePage === 0 ? true : false;
		const lastPage = activePage + 1 == pag ? true : false;


		return (

			<nav>
				<ul className="list-inline pull-right dpPag">
					<li className={firstPage ? "hidden" : "dpHand"} onClick={this.props.getPage.bind(null, activePage - 1)}>
						<span className="glyphicon glyphicon-chevron-left"></span>
					</li>
					<li>{activePage + 1} of {pag}</li>
					<li className={lastPage ? "hidden" : "dpHand"} onClick={this.props.getPage.bind(null, activePage + 1)}>
						<span className="glyphicon glyphicon-chevron-right"></span>
					</li>
					<li>Records {count}</li>
				</ul>
			</nav>

			);
	}
};

export default Pagination;
