import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Layout from "../../component/Layout";
import Modal from "../../component/Modal";
import { Context } from "../../store/appContext";

const Dashboard = () => {
	const { actions, store } = useContext(Context);
	const [incomeModal, setIncomeModal] = useState();
	const [outgoingModal, setOutgoingModal] = useState();
	const [incomes, setIncomes] = useState(store.incomesUSD);
	const [outgoings, setOutgoings] = useState(store.outgoingsUSD);
	const [isUSD, setIsUSD] = useState(true);

	const setUSD = () => {
		setIncomes(store.incomesUSD);
		setOutgoings(store.outgoingsUSD);
		setIsUSD(true);
	};

	const setUYU = () => {
		const exchange = store.exchangeRate;
		setIncomes(store.incomesUSD * exchange);
		setOutgoings(store.outgoingsUSD * exchange);
		setIsUSD(false);
	};

	useEffect(() => {
		!store.userIncomes && actions.getUserIncomes();
		!store.userOutgoings && actions.getUserOutgoings();
	}, []);

	return (
		<Layout path="dashboard">
			{incomeModal && <Modal isIncome closeModal={() => setIncomeModal(false)} />}
			{outgoingModal && <Modal closeModal={() => setOutgoingModal(false)} />}
			<div className="dashboard">
				<div className="information-container">
					<div className="side-container">
						<h1 className="title m-0">Ingresos</h1>
						<button type="submit" className="btn btn-lg button" onClick={() => setIncomeModal(true)}>
							Nuevo Ingreso
						</button>
						<Link to="/incomes">
							<button type="submit" className="btn btn-lg button">
								Detalles
							</button>
						</Link>
					</div>
					<div className="value-container">
						<h1 className="value">{incomes ? incomes.toFixed(2) : "0.00"}</h1>
						<div className="currencies">
							<button
								type="submit"
								className={`btn btn-sm button curr ${isUSD ? "" : "not-active"}`}
								onClick={setUSD}>
								USD
							</button>
							<button
								type="submit"
								className={`btn btn-sm button curr ${isUSD ? "not-active" : ""}`}
								onClick={setUYU}>
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
						<h1 className="value">{outgoings ? outgoings.toFixed(2) : "0.00"}</h1>
						<div className="currencies">
							<button
								type="submit"
								className={`btn btn-sm button curr ${isUSD ? "" : "not-active"}`}
								onClick={setUSD}>
								USD
							</button>
							<button
								type="submit"
								className={`btn btn-sm button curr ${isUSD ? "not-active" : ""}`}
								onClick={setUYU}>
								UYU
							</button>
						</div>
					</div>
				</div>
				<div className="bottom-container">
					<div className="information-container column">
						<h3 className="m-0">Términos relativos</h3>
						<h1 className="value">
							{incomes && outgoings ? ((100 * incomes) / outgoings).toFixed(0) : 0}%
						</h1>
					</div>
					<div className="information-container column">
						<h3 className="m-0">Términos absolutos</h3>
						<div className="value-container">
							<h1 className="value">
								{incomes && outgoings ? (incomes - outgoings).toFixed(2) : "0.00"}
							</h1>
							<div className="currencies">
								<button
									type="submit"
									className={`btn btn-sm button curr ${isUSD ? "" : "not-active"}`}
									onClick={setUSD}>
									USD
								</button>
								<button
									type="submit"
									className={`btn btn-sm button curr ${isUSD ? "not-active" : ""}`}
									onClick={setUYU}>
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
