import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Layout from "../../component/Layout/Layout";

const Dashboard = () => {
	const [incomeModal, setIncomeModal] = useState();
	const [outgoingModal, setOutgoingModal] = useState();

	return (
		<Layout>
			<div className="dashboard">
				<div className="information-container">
					<div className="side-container">
						<h1 className="title m-0">Ingresos</h1>
						<button onClick={() => setOutgoingModal(true)} type="submit" className="btn btn-lg button">
							Nuevo Ingreso
						</button>
						<Link to="/incomes">
							<button type="submit" className="btn btn-lg button">
								Detalles
							</button>
						</Link>
					</div>
					<div className="side-container">
						<h1 className="value">10.000</h1>
						<p>USD</p>
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
					<div className="side-container">
						<h1 className="value">7.000</h1>
						<p>UYU</p>
					</div>
				</div>
				<div className="bottom-container">
					<div className="information-container">
						<h1 className="value">30%</h1>
					</div>
					<div className="information-container">
						<h1 className="value">3.000</h1>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
