import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserProfileForm from 'components/User/user-profile-form';
import { TextInputTask } from 'components/Common/text-input-task';

@connect(state=>({users: state.users}))

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.cancelUser = this.cancelUser.bind(this);
  }

  static childContextTypes = {
      location: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const _userId = this.props.location.pathname.split('/')[2];
    // TODO: Load the currect user requested -> Call the actions -> api -> reducer -> user setState
    console.log(_userId);
  }

  saveUser(){

  }

  deleteUser(){

  }

  cancelUser(){

  }

  render () {
    var formStyle = {
        backgroundColor : '#fcfffc',
        border : "solid 1px",
        borderRadius : 4,
        marginLeft: 10,
        padding: 15,

    };
    return (

      <div>
        <div className="row">
          <div className="section-header">
            <p className="section-header-text-sub">User Profile</p>
          </div>
        </div>

        <div className="row" style={formStyle}>
          <UserProfileForm
            onSubmit={this.saveUser}
            users={this.props.users}
            deleteUser={this.deleteUser}
            onCancel={this.cancelUser}/>
          </div>
      </div>
    )

  }
}

export default UserProfile;
