import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Form from "../../component/Form";

const inputsType = [
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
		type: "repeatPassword",
		placeholder: "Repetir contraseña",
		label: "Repetir contraseña",
		width: "100%"
	}
];

const SignUp = () => {
	const [inputs, setInputs] = useState({
		name: "",
		lastname: "",
		email: "",
		password: "",
		repeatPassword: ""
	});

	return (
		<div className="sign-up">
			<div className="form-container">
				<h2 className="title">Crea una cuenta gratis y gestiona tus finanzas</h2>
				<Form inputsType={inputsType} inputs={inputs} setInputs={setInputs} buttonLabel="Crear cuenta" />
				<div className="bottom-container">
					{"¿Ya estas registrado? "}
					<Link to="/login">Haz click aquí.</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
