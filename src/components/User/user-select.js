'use strict';
import React from 'react';
import SelectBox from 'components/Common/select-box';

export default class UserSelect extends React.Component{

  render() {
    const fnStyle = {
      marginLeft: 15
    }
    return (
      <div className="col-sm-12">
        <div style={fnStyle} className="col-sm-6">
          <SelectBox
            label="Full Name"
            data={this.props.users}
            dpInputCol="col-sm-9"
            dpLabelCol="col-sm-3"
            value={}
          />
          </div>
        <div className="col-sm-4">
          <button className="btn btn-success pull-left" onClick={this.getUser}>
            Get User
          </button>
        </div>
      </div>
    );
  }
}
