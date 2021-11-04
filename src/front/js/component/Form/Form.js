import React from "react";
import { arrayOf, shape, string } from "prop-types";

import "./styles.scss";

const Form = ({ inputs, buttonLabel }) => {
	return (
		<div className="form">
			{inputs.map(({ label, type, placeholder, width }, index) => (
				<div key={label + index} className="input-container" style={{ width: `${width}` }}>
					<label className="input-title">{label}</label>
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
			label: string,
			width: string
		})
	),
	buttonLabel: string
};

export default Form;
