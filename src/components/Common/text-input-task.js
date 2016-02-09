import React from'react';

export const TextInputTask = (props) => {

	var spanStyle = { color: "red" };

	let wrapperClass = 'form-group';
	if (props.error && props.error.length > 0) {
		wrapperClass += " " + 'has-error';
	}

	let labelClass = 'control-label' + " " + props.dpLabelCol;

		return (
			//Styled for bootstrap
			<div className={wrapperClass}>
				<label className={labelClass} htmlFor={props.name}>{props.label}</label>
				<div className={props.dpInputCol}>
					<input type={props.type ? props.type : "text" }
						name={props.name}
						className="form-control"
					 	placeholder={props.placeholder}
					 	value={props.value}
					 	onChange={props.onChange} />
				</div>
				{props.touched && props.error &&
					<div>
						<div className={labelClass}></div>
						<div style={spanStyle} className={props.dpInputCol}>{props.error}</div>
					</div>}
				</div>

		);

};

TextInputTask.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  error: React.PropTypes.string
}
