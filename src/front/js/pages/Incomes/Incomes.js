import React, { useContext, useEffect, useState } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";
import { Context } from "../../store/appContext";
import Modal from "../../component/Modal";

const Incomes = () => {
	const { actions, store } = useContext(Context);
	const [selected, setSelected] = useState();
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		!store.userIncomes && actions.getUserIncomes();
	}, []);

	return (
		<Layout path="incomes">
			{isOpenModal && <Modal isIncome edit={selected} closeModal={() => setIsOpenModal(false)} />}
			<div className="incomes">
				{store.userIncomes.length ? (
					<Table
						movements={store.userIncomes}
						handleDelete={id => actions.deleteIncome(id)}
						handleEdit={income => {
							setSelected(income);
							setIsOpenModal(true);
						}}
					/>
				) : (
					<p>Lo sentimos, de momento no hay ingresos.</p>
				)}
			</div>
		</Layout>
	);
};

export default Incomes;
