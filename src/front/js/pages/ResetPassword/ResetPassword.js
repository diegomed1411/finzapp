import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Form from "../../component/Form";

const inputsType = [
	{
		type: "password",
		placeholder: "Nueva contraseña",
		label: "Nueva contraseña",
		width: "100%"
	}
];

const ResetPassword = () => {
	const [inputs, setInputs] = useState({
		password: ""
	});

	return (
		<div className="reset-password">
			<div className="form-container">
				<h5 className="instructions">Ingresa tu nueva contraseña</h5>
				<Form
					inputsType={inputsType}
					inputs={inputs}
					setInputs={setInputs}
					buttonLabel="Restaurar contraseña"
				/>
				<Link to="/">Cancelar</Link>
			</div>
		</div>
	);
};

export default ResetPassword;
