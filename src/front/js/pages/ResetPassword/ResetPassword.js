import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import "./styles.scss";
import Form from "../../component/Form";
import { Context } from "../../store/appContext";

const inputsType = [
	{
		type: "password",
		placeholder: "Nueva contraseña",
		label: "Nueva contraseña",
		width: "100%"
	}
];

const ResetPassword = () => {
	const { token } = useParams();
	const { actions } = useContext(Context);
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
					onSubmit={() => actions.resetPassword(token.replace("~", "."), inputs.password)}
				/>
				<Link to="/">Cancelar</Link>
			</div>
		</div>
	);
};

export default ResetPassword;
