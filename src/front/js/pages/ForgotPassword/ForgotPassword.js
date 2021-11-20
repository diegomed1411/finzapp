import React, { useContext, useState } from "react";
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
	}
];

const ForgotPassword = () => {
	const { actions } = useContext(Context);
	const [inputs, setInputs] = useState({
		email: ""
	});

	return (
		<div className="forgot-password">
			<div className="form-container">
				<h5 className="instructions">
					Ingresa tu dirección de correo electrónico y te enviaremos instrucciones para recuperar tu
					contraseña
				</h5>
				<Form
					inputsType={inputsType}
					inputs={inputs}
					setInputs={setInputs}
					buttonLabel="Enviar instrucciones"
					onSubmit={() => actions.sendResetPassword(inputs.email)}
				/>
				<Link to="/">Cancelar</Link>
			</div>
		</div>
	);
};

export default ForgotPassword;
