import React from "react";

import "./styles.scss";
import Form from "../../component/Form";

const inputs = [
	{
		type: "name",
		placeholder: "José",
		label: "Nombre"
	},
	{
		type: "lastname",
		placeholder: "Martínez",
		label: "Apellido"
	},
	{
		type: "email",
		placeholder: "jose@example.com",
		label: "Email"
	},
	{
		type: "password",
		placeholder: "Contraseña",
		label: "Contraseña"
	},
	{
		type: "password",
		placeholder: "Repetir contraseña",
		label: "Repetir contraseña"
	}
];

const SignUp = () => {
	return (
		<div className="sign-up">
			<div className="jumbotron">
				<Form inputs={inputs} buttonLabel="Crear cuenta" />
			</div>
		</div>
	);
};

export default SignUp;
