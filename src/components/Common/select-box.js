import React, { PropTypes, Component } from 'react';
import Select from 'react-select';

export default class SelectBox extends Component {

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
          <Select
            valueField='id'
            name={this.props.name}
            options={this.props.data}
            onChange={this.props.onChange}
            value={this.props.value} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

SelectBox.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  error: React.PropTypes.string
};
