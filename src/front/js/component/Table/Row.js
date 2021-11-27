import React from "react";
import { func, number, shape, string } from "prop-types";
import moment from "moment";

import "./styles.scss";

const Row = ({ data, handleDelete, handleEdit }) => {
	const { type, subtype, date, amount, currency, id } = data;

	return (
		<div className="table-row">
			<div className="cell">{type}</div>
			<div className="cell">{subtype}</div>
			<div className="cell">{amount}</div>
			<div className="cell">{currency}</div>
			<div className="cell">{moment(date).format("MM/DD/YYYY")}</div>
			<div className="cell">
				<i className="far fa-edit" onClick={() => handleEdit(id)} />
				<i className="far fa-trash-alt" onClick={() => handleDelete(id)} />
			</div>
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
	}),
	handleEdit: func,
	handleDelete: func
};
