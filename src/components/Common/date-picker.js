import React, { PropTypes, Component } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

export default class DatePicker extends Component {


  render() {

    let wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className={wrapperClass}>
        <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <DateTimePicker
            format="DD/MM/YY"
            name={this.props.name}
            time={false}
            onChange={this.props.onChange}
            value={!this.props.value ? null : new Date(this.props.value)}/>
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string
};
