import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

import "./styles.scss";
import Form from "../../component/Form";

const inputsType = [
	{
		type: "email",
		placeholder: "Email",
		label: "Email",
		width: "100%"
	}
];

const ForgotPassword = () => {
	const [inputs, setInputs] = useState({
		email: ""
	});

	// const sendEmail = () => {
	// 	fetch(process.env.BACKEND_URL + "/api/send_reset_password")
	// 		.then(resp => resp.json())
	// 		.then(data => {
	// 			emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', "", 'YOUR_USER_ID')
	// 			.then((result) => {
	// 				console.log(result.text);
	// 			}, (error) => {
	// 				console.log(error.text);
	// 			});
	// 		})
	// }

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
				/>
				<Link to="/">Cancelar</Link>
			</div>
		</div>
	);
};

export default ForgotPassword;
