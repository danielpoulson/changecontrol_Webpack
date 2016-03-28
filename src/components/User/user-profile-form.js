import React from 'react';
import {reduxForm} from 'redux-form';
import { TextInputTask } from 'components/Common/text-input-task';
import ComboBox from 'components/Common/combo-box';
export const fields = ['_id', 'fullname', 'username', 'email', 'dept', 'role', 'password'];

const newdata = {  // used to populate "account" reducer when "Load" is clicked
  role: 'user'
};

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'This field is required';
  } else if (values.username.length < 5) {
    errors.username = 'Must more than 7 characters';
  }

  return errors;
};

@reduxForm({
    form: 'user',
    fields,
    validate
  },
  state => ({
    initialValues: state.user ? state.user : newdata // will pull state into form's initialValues
  })
)

export default class UserProfileForm extends React.Component {
	static propTypes: {
    fields: PropTypes.object.isRequired,
		errors : React.PropTypes.object
	};

	render() {
    const {
      fields: {fullname, username, email, dept, role, password, _id},
        handleSubmit,
        submitting,
        deleteUser,
        roleSelect
      } = this.props;

    const fnStyle = {
      marginLeft: 30,
      paddingTop: 20,
      paddingBottom: 10
    }

        var wrapperClassSD = '';
        var wrapperClassTD = '';

        if (this.props.errors.TKStart && this.props.errors.TKStart.length > 0) {
            wrapperClassSD += " " + 'has-date-error';
        }

        if (this.props.errors.TKTarg && this.props.errors.TKTarg.length > 0) {
            wrapperClassTD += " " + 'has-date-error';
        }

		return (
        <div>
          <form onSubmit={handleSubmit} className="form form-horizontal" >

            <div className="col-sm-12">
              <TextInputTask
                name="username"
                label="User Name"
                placeholder="Enter Users username (Required)"
                dpInputCol="col-sm-4"
                dpLabelCol="col-sm-2"
                error={username.error}
                touched={username.touched}
                {...username}/>
            </div>

            <div className="col-sm-12">
              <TextInputTask
                name="fullname"
                label="Full Name"
                placeholder="Enter Full Name (Required)"
                dpInputCol="col-sm-5"
                dpLabelCol="col-sm-2"
                error={fullname.error}
                touched={fullname.touched}
                {...fullname}/>
            </div>

            <div className="col-sm-12">
              <TextInputTask
                name="email"
                label="Email"
                placeholder="Enter Email Address (Required)"
                dpInputCol="col-sm-5"
                dpLabelCol="col-sm-2"
                error={email.error}
                touched={email.touched}
                {...email}/>
            </div>

            <div className="col-sm-12">
              <ComboBox
                label="Role"
                name="role"
                data={roleSelect}
                dpInputCol="col-sm-4"
                dpLabelCol="col-sm-2"
                {...role}
                />
            </div>

            <div className="col-sm-12">
              <TextInputTask
                name="password"
                label="Password"
                type="password"
                placeholder="***************"
                dpInputCol="col-sm-5"
                dpLabelCol="col-sm-2"
                error={password.error}
                touched={password.touched}
                {...password}/>
            </div>

            <div className="col-sm-9 col-md-offset-2">
              <button className="btn btn-success pull-left" disabled={submitting} onClick={handleSubmit}>
                {submitting ? <i/> : <i/>} Save
              </button>
              <button className="btn btn-danger dp-margin-10-LR" disabled={submitting} onClick={deleteUser}>
                Delete
              </button>
            </div>
            </form>
        </div>
		);
	}

};
