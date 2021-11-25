import React, { useContext, useState } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";

const outgoingsTest = [
	//delete when back finishes
	{
		name: "fwaef",
		type: "fwe",
		subtype: "tefwest",
		amount: 839,
		currency: "te132t",
		date: "2-2-2",
		id: 2
	}
];

const Outgoings = () => {
	return (
		<Layout path="outgoings">
			<div className="outgoings">
				<Table movements={outgoings} />
			</div>
		</Layout>
	);
};

export default Outgoings;
