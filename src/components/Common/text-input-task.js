import React from'react';

export const TextInputTask = (props) => {

		let wrapperClass = 'form-group';
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
