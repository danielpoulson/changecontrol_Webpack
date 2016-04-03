import React, { PropTypes, Component } from 'react';
import Combobox from 'react-widgets/lib/Combobox'

export default class ComboBox extends Component {


  render() {
    const spanStyle = { color: "red" };
    let dtStyle={};
    let wrapperClass = 'form-group';
    if (this.props.touched && this.props.error && this.props.error.length > 0) {
      dtStyle = { border: '2px solid red'}
    }

    let labelClass = 'control-label' + " " + this.props.dpLabelCol;

    return (
      <div className={wrapperClass}>
        <label className={labelClass} htmlFor={this.props.name}>{this.props.label}</label>
        <div className={this.props.dpInputCol}>
          <Combobox
            style={dtStyle}
            valueField='id'
            textField='name'
            data={this.props.data}
            value={this.props.value}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}/>
            {this.props.touched && this.props.error &&
                  <div style={spanStyle} className="input">{this.props.error}</div>
            }
        </div>
      </div>
    );
  }
}

ComboBox.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  error: React.PropTypes.string
};
