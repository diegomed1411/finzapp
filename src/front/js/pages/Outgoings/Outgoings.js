import React, { useContext, useEffect, useState } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";
import { Context } from "../../store/appContext";
import Modal from "../../component/Modal";

const Outgoings = () => {
	const { actions, store } = useContext(Context);
	const [selected, setSelected] = useState();
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		!store.userOutgoings && actions.getUserOutgoings();
	}, []);

	return (
		<Layout path="outgoings">
			{isOpenModal && <Modal edit={selected} closeModal={() => setIsOpenModal(false)} />}
			<div className="outgoings">
				{store.userOutgoings.length ? (
					<Table
						movements={store.userOutgoings}
						handleDelete={id => actions.deleteOutgoing(id)}
						handleEdit={income => {
							setSelected(income);
							setIsOpenModal(true);
						}}
					/>
				) : (
					<p>Lo sentimos, de momento no hay egresos.</p>
				)}
			</div>
		</Layout>
	);
};

export default Outgoings;
