import React from "react";
import { any, number, shape, string } from "prop-types";

import "./styles.scss";

const Row = ({ data }) => {
	const { name, type, subtype, date, amount, currency, id } = data;

	return (
		<div className="table-row">
			<div className="cell">{name}</div>
			<div className="cell">{type}</div>
			<div className="cell">{subtype}</div>
			<div className="cell">{amount}</div>
			<div className="cell">{currency}</div>
			<div className="cell">{date}</div>
		</div>
	);
};

export default Row;

Row.propTypes = {
	data: shape({
		name: string,
		type: string,
		subtype: string,
		date: string,
		amount: number,
		currency: string,
		id: number
	})
};
