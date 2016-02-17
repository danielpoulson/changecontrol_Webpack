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


		for (var i = 0; i < pag; i++){
			if(i === activePage){
				pagination.push(<li key={i} className="active" onClick={this.props.getPage.bind(null, i)}><a>{i + 1}</a></li>);
			}else{
				pagination.push(<li key={i} onClick={this.props.getPage.bind(null, i)}><a>{i + 1}</a></li>);
			}

		};

		return (

			<nav>
				<ul className="pagination pull-right dpHand">
					<li className={firstPage ? "disabled" : ""} onClick={this.props.getPage.bind(null, activePage - 1)}>
						<span>&laquo;</span>
					</li>
					{pagination}
					<li className={lastPage ? "disabled" : ""} onClick={this.props.getPage.bind(null, activePage + 1)}>
						<span>&raquo;</span>
					</li>
				</ul>
			</nav>

			);
	}
};

export default Pagination;
