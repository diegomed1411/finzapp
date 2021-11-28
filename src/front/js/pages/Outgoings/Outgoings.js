import React, { useContext, useEffect } from "react";

import Layout from "../../component/Layout/Layout";
import Table from "../../component/Table/Table";
import { Context } from "../../store/appContext";

const Outgoings = () => {
	const { actions, store } = useContext(Context);

	useEffect(() => {
		!store.userOutgoings.length && actions.getUserOutgoings();
	}, []);

	return (
		<Layout path="outgoings">
			<div className="outgoings">
				{store.userOutgoings.length ? (
					<Table movements={store.userOutgoings} 
					handleDelete={id => actions.deleteOutcome(id)}
					handleEdit={id => console.log(id)} //TODO: integrate edit
					/>
				) : (
					<p>Lo sentimos, de momento no hay egresos.</p>
				)}
			</div>
		</Layout>
	);
};

export default Outgoings;
