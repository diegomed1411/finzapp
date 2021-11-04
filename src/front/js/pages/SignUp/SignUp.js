import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Form from "../../component/Form";

const inputs = [
	{
		type: "name",
		placeholder: "José",
		label: "Nombre",
		width: "50%"
	},
	{
		type: "lastname",
		placeholder: "Martínez",
		label: "Apellido",
		width: "50%"
	},
	{
		type: "email",
		placeholder: "jose@example.com",
		label: "Email",
		width: "100%"
	},
	{
		type: "password",
		placeholder: "Contraseña",
		label: "Contraseña",
		width: "100%"
	},
	{
		type: "password",
		placeholder: "Repetir contraseña",
		label: "Repetir contraseña",
		width: "100%"
	}
];

const SignUp = () => {
	return (
		<div className="sign-up">
			<div className="form-container">
				<h2 className="title">Crea una cuenta gratis y gestiona tus finanzas</h2>
				<Form inputs={inputs} buttonLabel="Crear cuenta" />
				<div className="bottom-container">
					{"¿Ya estas registrado? "}
					<Link to="/login">Haz click aquí.</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
