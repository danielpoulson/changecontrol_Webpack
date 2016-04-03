import React, { PropTypes } from 'react'

const Login = (props) => {
  return (
    <div className="navbar-right">
      <form className="navbar-form">
          <div className="form-group">
              <input placeholder="Username"
                 value={props.login.username}
                 onChange={props.onChange}
                 type='text'
                 name='username'
                 className="form-control" />
          </div>
          <div className="form-group dp-margin-5-LR ">
              <input placeholder="Password"
                value={props.login.password}
                onChange={props.onChange}
                type='password'
                name='password'
                className="form-control" />
          </div>
          <button className='btn btn-primary' onClick={props.onLogin}> Log In </button>
      </form>

    </div>
  )
}

export default Login
