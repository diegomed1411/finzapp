import React from "react";
import { string, arrayOf, number, shape } from "prop-types";

import "./styles.scss";
import Row from "./Row";

const Table = ({ movements }) => {
	return (
		<div className="table">
			<div className="header">
				<div className="cell border-0">Nombre</div>
				<div className="cell border-0">Categoría</div>
				<div className="cell border-0">Tipo</div>
				<div className="cell border-0">Monto</div>
				<div className="cell border-0">Moneda</div>
				<div className="cell border-0">Fecha</div>
			</div>
			{movements.map(movement => (
				<Row key={movement.id} data={movement} />
			))}
		</div>
	);
};

export default Table;

Table.propTypes = {
	movements: arrayOf(
		shape({
			name: string,
			type: string,
			subtype: string,
			date: string,
			amount: number,
			currency: string,
			id: number
		})
	)
};
