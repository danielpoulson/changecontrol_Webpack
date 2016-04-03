import React, { PropTypes, Component } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

export default class DatePicker extends Component {


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
          <DateTimePicker
            style={dtStyle}
            format="DD/MM/YY"
            name={this.props.name}
            time={false}
            onChange={this.props.onChange}
            value={!this.props.value ? null : new Date(this.props.value)}/>
          {this.props.touched && this.props.error &&
                <div style={spanStyle} className="input">{this.props.error}</div>
          }
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
