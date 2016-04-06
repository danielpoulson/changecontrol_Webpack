import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Router from 'react-router';
import { Route, Link } from 'react-router';

import { getFiles } from 'actions/actions_files';
import { logoutUser } from 'actions/actions_main';

import { styles } from './styles.scss';

@connect(
  state => ({username: state.main.user.username}),
  {getFiles, logoutUser}
)

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    static childContextTypes = {
    location: React.PropTypes.object
    };

    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

  getFileList = () => {
      this.props.getFiles('exp');
      this.context.router.push('/export');

  };
  onLogoutUser = () => {
      sessionStorage.setItem('authorised', false);
      this.props.logoutUser();
      this.context.router.push('/');

  };
  render() {
      return (
            <div className={`${styles}`}>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav dp-main-nav">
                  <li>
                    <Link to="/"><i className="fa fa-home fa-fw"></i>&nbsp; Home</Link>
                  </li>
                  <li>
                    <Link to="/changes" activeClassName="active">
                      <i className="fa fa-list-ul fa-fw">
                      </i>
                      &nbsp; Change Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/tasks" activeClassName="active">
                      <i className="fa fa-tasks fa-fw">
                      </i>
                      &nbsp; All Tasks
                    </Link>
                  </li>
                  <li>
                    <a onClick={this.getFileList}>
                      <i className="fa fa-file-text-o fa-fw">
                      </i>
                      &nbsp; Files
                    </a>
                  </li>
                  <li>
                    <a onClick={this.onLogoutUser}>
                      <i className="fa fa-sign-out fa-fw">
                      </i>
                      &nbsp; Logout ({this.props.username})
                    </a>
                  </li>
                </ul>
              </div>
            </div>



        )
    }
}

export default NavBar
