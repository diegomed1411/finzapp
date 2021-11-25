import React, { useContext, useState } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";

const incomes = [
	//delete when back finishes
	{
		name: "test",
		type: "test",
		subtype: "test",
		amount: 719,
		currency: "test",
		date: "2-2-2",
		id: 0
	}
];

const Incomes = () => {
	return (
		<Layout path="incomes">
			<div className="incomes">
				<Table movements={incomes} />
			</div>
		</Layout>
	);
};

export default Incomes;
