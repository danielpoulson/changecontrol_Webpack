import React, { PropTypes } from 'react'

class TextInput extends React.Component {
  render () {

    const spanStyle = { color: "red" };

    let wrapperClass = 'form-group';
    if (this.props.touched && this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return(
      <div className={wrapperClass}>
        <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
        <div className="fields">
          <input type={this.props.type ? this.props.type : "text" }
            name={this.props.name}
            className={this.props.inputstyle}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          {this.props.touched && this.props.error && <div style={spanStyle} className="input">{this.props.error}</div> }
        </div>
      </div>
    )

  }
}

export default TextInput;

TextInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  error: React.PropTypes.string
}
