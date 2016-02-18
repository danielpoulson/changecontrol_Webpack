import React from 'react';
import {reduxForm} from 'redux-form';
import { TextInputTask } from 'components/Common/text-input-task';
import SelectBox from 'components/Common/select-box';
export const fields = ['fullname', 'username', 'dept', 'role', 'password'];

const newdata = {  // used to populate "account" reducer when "Load" is clicked

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
  initialValues: state.user
  })
)

export default class UserProfileForm extends React.Component {
	static propTypes: {
		errors : React.PropTypes.object
	};

	render() {
    const {
      fields: {fullname, username, dept, role, password},
        handleSubmit,
        submitting,
        onCancel,
        deleteUser
      } = this.props;

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
                <TextInputTask
                  name="username"
                  label="User Name"
                  placeholder="Enter Users Full Name (Required)"
                  dpInputCol="col-sm-9"
                  dpLabelCol="col-sm-2"
                  error={username.error}
                  touched={username.touched}
                  {...username}/>

                <TextInputTask
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  dpInputCol="col-sm-9"
                  dpLabelCol="col-sm-2"
                  error={password.error}
                  touched={password.touched}
                  {...password}/>

                <div className="col-sm-9 col-md-offset-2">
                  <button className="btn btn-success pull-left" disabled={submitting} onClick={handleSubmit}>
                    {submitting ? <i/> : <i/>} Submit
                  </button>
                  <button className="btn btn-info dp-margin-10-LR hidden" disabled={submitting} onClick={onCancel}>
                  Cancel
                  </button>
                  <button className="btn btn-danger hidden" disabled={submitting} onClick={deleteUser}>
                    Delete
                  </button>
                </div>
                </form>
            </div>
		);
	}

};
