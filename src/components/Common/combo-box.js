import React, { PropTypes, Component } from 'react';
import Combobox from 'react-widgets/lib/Combobox'

export default class ComboBox extends Component {


  render() {

    let wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    let labelClass = 'control-label' + " " + this.props.dpLabelCol;

    return (
      <div className={wrapperClass}>
        <label className={labelClass} htmlFor={this.props.name}>{this.props.label}</label>
        <div className={this.props.dpInputCol}>
          <Combobox
            valueField='id'
            textField='name'
            data={this.props.status}
            value={this.props.value}
            defaultValue={1}
            onChange={this.props.onChange}/>
          <div className="input">{this.props.error}</div>
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
