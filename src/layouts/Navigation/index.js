import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Router from 'react-router';
import { Route, Link } from 'react-router';
// import UserStore from '../stores/users';
// import ProjectStore from '../stores/projects';
// import API from '../utils/api';
// import MainStore from '../stores/main';
@connect(
  state => ({username: state.main.user.userName})
)

export class Navigation extends React.Component {

    getFileList() {
        // API.getFiles('exp');
        // MainStore.updateMainId('new');
        // MainStore.updateMainTitle('new');
        // MainStore.updateCurrentMode('change');
        // history.push(null, '/export');

    }

    render() {
        return (
            <div>
                <div className="list-group dp-nav">
                  <Link className="list-group-item" to="/"><i className="fa fa-home fa-fw"></i>&nbsp; Home</Link>
                  <Link className="list-group-item" to="/changes" activeClassName="active"><i className="fa fa-list-ul fa-fw"></i>&nbsp; Change Register</Link>
                    <Link className="list-group-item" to="/tasks" activeClassName="active"><i className="fa fa-tasks fa-fw"></i>&nbsp; All Tasks</Link>
                    <a className="list-group-item" onClick={this.getFileList}><i className="fa fa-file-text-o fa-fw"></i>&nbsp; Files</a>
                  <a className="list-group-item" href="/logout"><i className="fa fa-sign-out fa-fw"></i>&nbsp; Logout ({this.props.username})</a>
                </div>

            </div>
        );
    }
};
