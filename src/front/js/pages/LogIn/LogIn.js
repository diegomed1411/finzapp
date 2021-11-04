import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Form from "../../component/Form";

const inputsType = [
	{
		type: "email",
		placeholder: "Email",
		label: "Email",
		width: "100%"
	},
	{
		type: "password",
		placeholder: "Contraseña",
		label: "Contraseña",
		width: "100%"
	}
];

const LogIn = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});

	return (
		<div className="login">
			<div className="form-container">
				<Form inputsType={inputsType} inputs={inputs} setInputs={setInputs} buttonLabel="Iniciar sesión" />
				<div className="bottom-container">
					{"¿Olvidaste tu contraseña? "}
					<Link to="/forgot-password">Haz click aquí.</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
