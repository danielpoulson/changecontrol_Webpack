import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from 'components/Login/login';

import { login } from 'actions/actions_main';

/* component styles */
import './styles.scss';

@connect(
  state => ({fullname: state.main.user.fullname}), {login}
)

export class Header extends Component {

  state = {
    login : {}
  };

  onLogin = (e) => {
    e.preventDefault();
    // console.log(this.state.login.username);
    // console.log(this.state.login.password);

    this.props.login(this.state.login);

  };

  setStateLogin(evt){

    const name = evt.target.name;
    const value = evt.target.value;
    this.state.login[name] = value;
    return this.setState({login: this.state.login});

  }

render() {
        const textStyle = {
            color: 'white'
        }


        return (
            <div>
                <div className="topband">
                    <section className="col-sm-12">
                        <div className="col-sm-5">
                            <h3 className="topband_h1">Change Control</h3>
                        </div>
                        <div className="col-sm-7">
                            {!this.props.fullname ?
                              <Login
                                login={this.state.login}
                                onChange={this.setStateLogin.bind(this)}
                                onLogin={this.onLogin}
                                /> : <h5 style={textStyle} className="pull-right">Welcome: {this.props.fullname} </h5>
                            }                        
                        </div>
                    </section>
                </div>
                <div className="col-sm-12 nav-strip"></div>
            </div>
        );
    }

}
