'use strict';
import React from 'react';
import Combobox from 'components/Common/combo-box';

export default class UserSelect extends React.Component{

  render() {
    const fnStyle = {
      marginLeft: 30,
      paddingTop: 20,
      paddingBottom: 10
    }

    const butStyle = {
      paddingTop: 20
    }

    return (
      <div className="col-sm-12">
        <div style={fnStyle} className="col-sm-6">
          <Combobox
            name="Full Name"
            label="Full Name"
            data={this.props.users}
            dpInputCol="col-sm-9"
            dpLabelCol="col-sm-3"
            onChange={this.props.onChange}
            defaultValue={this.props.users[0]}
          />
          </div>
      </div>
    );
  }
}
