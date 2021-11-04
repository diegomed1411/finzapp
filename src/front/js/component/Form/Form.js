import React from "react";
import { any, arrayOf, shape, string } from "prop-types";

import "./styles.scss";

const Form = ({ inputsType, buttonLabel, inputs, setInputs }) => {
	return (
		<div className="form">
			{inputsType.map(({ label, type, placeholder, width }, index) => (
				<div key={label + index} className="input-container" style={{ width: `${width}` }}>
					<label className="input-title">{label}</label>
					<input
						type="text"
						placeholder={placeholder}
						className="form-control input"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-default"
						value={inputs[type]}
						onChange={e => setInputs({ ...inputs, [type]: e.target.value })}
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
	inputsType: arrayOf(
		shape({
			type: string,
			placeholder: string,
			label: string,
			width: string
		})
	),
	buttonLabel: string,
	inputs: any,
	setInputs: any
};

export default Form;
