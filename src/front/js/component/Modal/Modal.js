import React, { useContext, useState } from "react";
import { any, func, boolean } from "prop-types";
import moment from "moment";

import "./styles.scss";
import { Context } from "../../store/appContext";

const Modal = ({ closeModal, isIncome = false, edit = null }) => {
	const { actions } = useContext(Context);
	const [type, setType] = useState(edit ? edit.type : "");
	const [subtype, setSubtype] = useState(edit ? edit.subtype : "");
	const [amount, setAmount] = useState(edit ? edit.amount : 0);
	const [currency, setCurrency] = useState(edit ? edit.currency : "UYU");
	const [date, setDate] = useState(
		edit ? moment(edit.date).format("YYYY-MM-DD") : moment(Date.now()).format("YYYY-MM-DD")
	);
	const [description, setDescription] = useState(edit ? edit.description : "");

	const currencies = ["UYU", "USD"];

	const types = !isIncome
		? [
				{
					type: "Entretenimiento",
					subtypes: ["Deportes", "Juegos", "Música", "Películas", "Regalos", "Ropa", "Otros"]
				},
				{
					type: "Comida",
					subtypes: ["Alimentos", "Licor", "Restaurantes", "Otros"]
				},
				{
					type: "Casa",
					subtypes: ["Alquiler", "Electrónica", "Hipoteca", "Mantenimiento", "Mascotas", "Muebles", "Otros"]
				},
				{
					type: "Vida",
					subtypes: ["Formación", "Gastos Médicos", "Guardería", "Impuestos", "Seguro", "Otros"]
				},
				{
					type: "Transporte",
					subtypes: [
						"Autobus",
						"Tren",
						"Avión",
						"Bicicleta",
						"Auto",
						"Estacionamiento",
						"Gasolina",
						"Taxi",
						"Uber",
						"Otros"
					]
				},
				{
					type: "Vacaciones",
					subtypes: ["Transporte", "Alojamiento", "Paseos", "Comidas", "Otros"]
				},
				{
					type: "Utilidades",
					subtypes: [
						"Agua",
						"Basura",
						"Calefacción",
						"Electricidad",
						"Limpieza",
						"TV Cable",
						"Internet",
						"Otros"
					]
				}
		  ]
		: [
				{
					type: "Ingreso de Trabajo",
					subtypes: ["Trabajo", "Otros"]
				},
				{
					type: "Ingreso de Capital",
					subtypes: ["Inmuebles", "Instrumentos Financieron", "Ganado", "Otros"]
				}
		  ];

	const onSubmit = () => {
		if (isIncome) actions.newIncome(type, subtype, currency, date, amount, description);
		else actions.newOutgoing(type, subtype, currency, date, amount, description);
		closeModal();
	};

	return (
		<div className="modal-container" onClick={closeModal}>
			<div className="modal-card" onClick={e => e.stopPropagation()}>
				<h1 className="modal-title">{`${edit ? "Editar" : "Nuevo"} ${isIncome ? "Ingreso" : "Egreso"}`}</h1>
				<div>
					<h6>Tipo</h6>
					<select
						className="form-select"
						aria-label="Seleccione un tipo"
						value={type}
						onChange={e => {
							setType(e.target.value);
							setSubtype("");
						}}>
						<option value="" disabled selected hidden>
							Seleccione un Tipo
						</option>
						{types.map((option, index) => {
							return (
								<option key={option.type + index} value={option.type}>
									{option.type}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<h6>Subtipo</h6>
					<select
						className="form-select"
						aria-label="Seleccione un tipo"
						value={subtype}
						onChange={e => setSubtype(e.target.value)}>
						<option value="" disabled selected hidden>
							Seleccione un Subtipo
						</option>
						{type &&
							types.find(x => x.type === type) &&
							types.find(x => x.type === type).subtypes.map((option, index) => {
								return (
									<option key={option + index} value={option}>
										{option}
									</option>
								);
							})}
					</select>
				</div>
				<div>
					<h6>Monto</h6>
					<div className="amount-container">
						<input
							type="number"
							className="form-control amount"
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
						<select
							className="form-select currency"
							value={currency}
							onChange={e => setCurrency(e.target.value)}>
							{currencies.map((curr, index) => {
								return (
									<option key={curr + index} value={curr}>
										{curr}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div>
					<h6>Fecha</h6>
					<input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
				</div>
				<div>
					<h6>Descripción</h6>
					<textarea
						className="form-control text-area"
						rows="3"
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className="bottom-container">
					<button onClick={closeModal} type="button" className="btn btn-light">
						Cancelar
					</button>
					<button onClick={onSubmit} type="submit" className="btn btn-lg button">
						{edit ? "Editar" : "Agregar"}
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeModal: func,
	isIncome: boolean,
	edit: any
};

export default Modal;
