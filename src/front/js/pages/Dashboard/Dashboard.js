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

	<div
		className="modal fade"
		id="staticBackdrop"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="staticBackdropLabel">
						Registro de nuevo Ingreso
					</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
				</div>
				<div className="modal-body">
					<form>
						<div className="input-group mb-3">
							<label for="incomeType" className="form-label">
								Tipo
							</label>
							<select className="form-select" id="incomeType" required>
								<option selected>Seleccione tipo...</option>
								<option value="Trabajo">Trabajo</option>
								<option value="Capital">Capital</option>
							</select>
						</div>
						<div className="mb-3">
							<label for="incomeSubtype" className="form-label">
								Sub-Tipo
							</label>
							<input type="text" className="form-control" id="incomeSubtype" required />
						</div>
						<div className="input-group mb-3">
							<label for="incomeCurrency" className="form-label">
								Moneda
							</label>
							<select className="form-select" id="incomeCurrency" required>
								<option selected>Seleccione moneda...</option>
								<option value="UYU">UYU - Peso Uruguayo</option>
								<option value="USD">USD - Dolar Americano</option>
							</select>
						</div>
						<div className="mb-3">
							<label for="incomeDate" className="form-label">
								Fecha
							</label>
							<input type="date" className="form-control" id="IncomeDate" required />
						</div>
						<div className="mb-3">
							<label for="incomeAmount" className="form-label">
								Importe
							</label>
							<input type="number" className="form-control" id="incomeAmount" required />
						</div>
						<div className="mb-3">
							<label for="incomeDescription" className="form-label">
								Description
							</label>
							<input type="text" className="form-control" id="incomeDescription" />
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" className="btn btn-primary">
						Understood
					</button>
				</div>
			</div>
		</div>
	</div>;

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

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">
								Registro de nuevo Ingreso
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<form>
								<div className="input-group mb-3">
									<label for="incomeType" className="form-label">
										Tipo
									</label>
									<select className="form-select" id="incomeType" required>
										<option selected>Seleccione tipo...</option>
										<option value="Trabajo">Trabajo</option>
										<option value="Capital">Capital</option>
									</select>
								</div>
								<div className="mb-3">
									<label for="incomeSubtype" className="form-label">
										Sub-Tipo
									</label>
									<input type="text" className="form-control" id="incomeSubtype" required />
								</div>
								<div className="input-group mb-3">
									<label for="incomeCurrency" className="form-label">
										Moneda
									</label>
									<select className="form-select" id="incomeCurrency" required>
										<option selected>Seleccione moneda...</option>
										<option value="UYU">UYU - Peso Uruguayo</option>
										<option value="USD">USD - Dolar Americano</option>
									</select>
								</div>
								<div className="mb-3">
									<label for="incomeDate" className="form-label">
										Fecha
									</label>
									<input type="date" className="form-control" id="IncomeDate" required />
								</div>
								<div class="mb-3">
									<label for="incomeAmount" className="form-label">
										Importe
									</label>
									<input type="number" className="form-control" id="incomeAmount" required />
								</div>
								<div className="mb-3">
									<label for="incomeDescription" className="form-label">
										Description
									</label>
									<input type="text" className="form-control" id="incomeDescription" />
								</div>
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Understood
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
