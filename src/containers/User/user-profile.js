import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserProfileForm from 'components/User/user-profile-form';
import UserSelect from 'components/User/user-select';
import { TextInputTask } from 'components/Common/text-input-task';

import { getUser, saveUser } from 'actions/actions_users';

@connect(state=>({users: state.users}), { getUser, saveUser })

class UserProfile extends Component {

  constructor(props) {
    super(props);
    
    this.state = {

    };

    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.cancelUser = this.cancelUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static childContextTypes = {
      location: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    // TODO: Load the currect user requested -> Call the actions -> api -> reducer -> user setState

  }

  saveUser(data){
    this.props.saveUser(data);
    console.log('saveUser');

  }

  // TODO LOW: FUNC Write functions for creating and deleting a user.

  deleteUser(){

  }

  cancelUser(){

  }

  onChange(value) {
    this.props.getUser(value);
    console.log(value);
  }

  render () {
    var spanStyle = {
        background: "#71ABFF",
        color: "#FFFFFF",
        border: "1px solid #71ABFF"
    };

    var formStyle = {
        backgroundColor : '#fcfffc',
        border : "solid 1px",
        borderRadius : 4,
        marginLeft: 10,
        padding: 15,

    };

    var divStyle = { paddingRight: 15};

    return (

      <div>
        <div className="row">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">User Profiles </p>
            </div>
          </div>
        </div>

          <UserSelect users={this.props.users} onChange={this.onChange} />

        <div className="row" style={formStyle}>
          <UserProfileForm
            onSubmit={this.saveUser}
            deleteUser={this.deleteUser}
            onCancel={this.cancelUser}/>
          </div>
      </div>
    )

  }
}

export default UserProfile;
