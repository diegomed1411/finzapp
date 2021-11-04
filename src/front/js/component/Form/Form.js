import React from "react";
import { arrayOf, shape, string } from "prop-types";

import "./styles.scss";

const Form = ({ inputs, buttonLabel }) => {
	return (
		<div className="form">
			{inputs.map(({ label, type, placeholder }, index) => (
				<div key={label + index} className="container input-group-lg">
					<label>{label}</label>
					<input
						type="text"
						placeholder={placeholder}
						className="form-control input"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-default"
					/>
				</div>
			))}
			<button type="submit" className="btn btn-lg submit-button">
				{buttonLabel}
			</button>
		</div>
	);
};

Form.propTypes = {
	inputs: arrayOf(
		shape({
			type: string,
			placeholder: string,
			label: string
		})
	),
	buttonLabel: string
};

export default Form;
