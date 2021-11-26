import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Form from "../../component/Form";
import { Context } from "../../store/appContext";

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
	const { actions } = useContext(Context);
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});

	const login = () => {
		actions.signin(inputs.email, inputs.password);
	};

	return (
		<div className="login">
			<div className="form-container">
				<Form
					inputsType={inputsType}
					inputs={inputs}
					onSubmit={login}
					setInputs={setInputs}
					buttonLabel="Iniciar sesión"
				/>
				<div>
					{"¿Olvidaste tu contraseña? "}
					<Link to="/forgot_password">Haz click aquí.</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
