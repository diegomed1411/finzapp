import React, { useContext, useEffect } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";
import { Context } from "../../store/appContext";

const Incomes = () => {
	const { actions, store } = useContext(Context);

	useEffect(() => {
		!store.userIncomes && actions.getUserIncomes();
	}, []);

	return (
		<Layout path="incomes">
			<div className="incomes">
				{store.userIncomes.length ? (
					<Table
						movements={store.userIncomes}
						handleDelete={id => actions.deleteIncome(id)}
						handleEdit={id => console.log(id)} //TODO: integrate edit
					/>
				) : (
					<p>Lo sentimos, de momento no hay ingresos.</p>
				)}
			</div>
		</Layout>
	);
};

export default Incomes;
