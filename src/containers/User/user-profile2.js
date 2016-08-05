import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserProfileForm from 'components/User/user-profile-form';
import UserSelect from 'components/User/user-select';
import {usersFormattedForDropdown} from '../../selectors/selectors';
import {userFormIsValid} from './user-form.validation';
import toastr from 'toastr';

import { getUser, getUsers, createUser, resetUser, saveUser, deleteUser } from 'actions/actions_users';

class UserProfile extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNewUser: false,
      user: Object.assign({}, props.user),
      errors: {}
    };

    this.saveUser = this.saveUser.bind(this);


  }

  saveUser(event) {
    event.preventDefault();
    let _user = this.state.user;

    let validation = userFormIsValid(_user);
    this.setState({errors: validation.errors});

    if(!validation.formIsValid) {
      return; 
    }

    if (this.state.isNewUser) {
      this.props.createUser(_user);
      this.setState({ isNewUser: false });
      toastr.success('New user account has been created', 'User Account', { timeOut: 1000 });
    } else {
      this.props.saveUser(_user);
      toastr.success('User account has been saved', 'User Account', { timeOut: 1000 });
    }
  }

  render(){
    return(
      <h1>Hello User Profile Form</h1>
    );
  }

}

UserProfile.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  resetUser: PropTypes.func,
  getUser: PropTypes.func,
  getUsers: PropTypes.func,
  createUser: PropTypes.func,
  saveUser: PropTypes.func,
  deleteUser: PropTypes.func

};

UserProfile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserProfile.childContextTypes = {
  location: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,  
    users: usersFormattedForDropdown(state.users)
  };
}

export default connect(mapStateToProps,
{ getUser, createUser, resetUser, saveUser, deleteUser, getUsers })(UserProfile);

