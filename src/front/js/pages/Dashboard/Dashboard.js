import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Layout from "../../component/Layout/Layout";
import { Context } from "../../store/appContext";
const Dashboard = () => {
	const { actions, store } = useContext(Context);
	const [incomeModal, setIncomeModal] = useState();
	const [outgoingModal, setOutgoingModal] = useState();
	const [incomes, setIncomes] = useState();
	const [outgoings, setOutgoings] = useState();
	const [difference, setDifference] = useState();

	// useEffect(() => {
	// 	!store.userIncomes && actions.getUserIncomes();
	// 	!store.userOutgoings && actions.getUserOutgoings();

	// 	setIncomes(store.incomesTotal);
	// 	setOutgoings(store.outgoingsTotal);
	// 	setDifference(store.incomesTotal - store.outgoingsTotal);
	// }, []);

	return (
		<Layout path="dashboard">
			<div className="dashboard">
				<div className="information-container">
					<div className="side-container">
						<h1 className="title m-0">Ingresos</h1>
						<button
							type="submit"
							className="btn btn-lg button"
							data-bs-toggle="modal"
							data-bs-target="#newIncomeModal">
							Nuevo Ingreso
						</button>
						<Link to="/incomes">
							<button type="submit" className="btn btn-lg button">
								Detalles
							</button>
						</Link>
					</div>
					<div className="value-container">
						<h1 className="value">{incomes}</h1>
						<div className="currencies">
							<button type="submit" className="btn btn-sm button curr" onClick={() => setIncomes()}>
								USD
							</button>
							<button type="submit" className="btn btn-sm button curr" onClick={() => setIncomes()}>
								UYU
							</button>
						</div>
					</div>
				</div>
				<div className="information-container">
					<div className="side-container">
						<h1 className="title m-0">Egresos</h1>
						<button onClick={() => setOutgoingModal(true)} type="submit" className="btn btn-lg button">
							Nuevo Egreso
						</button>
						<Link to="/outgoings">
							<button type="submit" className="btn btn-lg button">
								Detalles
							</button>
						</Link>
					</div>
					<div className="value-container">
						<h1 className="value">{outgoings}</h1>
						<div className="currencies">
							<button type="submit" className="btn btn-sm button curr" onClick={() => setOutgoings()}>
								USD
							</button>
							<button type="submit" className="btn btn-sm button curr" onClick={() => setOutgoings()}>
								UYU
							</button>
						</div>
					</div>
				</div>
				<div className="bottom-container">
					<div className="information-container column">
						<h3 className="m-0">Términos relativos</h3>
						<h1 className="value">30%</h1>
					</div>
					<div className="information-container column">
						<h3 className="m-0">Términos absolutos</h3>
						<div className="value-container">
							<h1 className="value">{difference}</h1>
							<div className="currencies">
								<button
									type="submit"
									className="btn btn-sm button curr"
									onClick={() => setDifference()}>
									USD
								</button>
								<button
									type="submit"
									className="btn btn-sm button curr"
									onClick={() => setDifference()}>
									UYU
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
