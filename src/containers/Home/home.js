import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserDashboard} from 'actions/actions_main';
import { loadPage } from 'actions/actions_changes';
import { loadPageTask } from 'actions/actions_tasks';

/* component styles */
import { tile_purple, tile_red } from './styles.scss';

@connect(
  state => ({ fullname: state.main.user.fullname,
    countChangesUser: state.main.countChangesUser,
    countTasksUser: state.main.countTasksUser }), { getUserDashboard, loadPage, loadPageTask}
)

export default class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount(){
    this.props.getUserDashboard(this.props.fullname);
  }

  getTasks = () => {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPageTask(action);
    this.context.router.push('/tasks');
  };

  getChanges = () => {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPage(action);
    this.context.router.push('/changes');
  };

  render(){
    return(
      <section>
        <h2>User Dashboard</h2>
        <div className="row">
          <div className="col-sm-4">
            <div className={`${tile_purple}`} onClick={this.getTasks}>
              <p>Tasks</p>
              <i className="fa fa-tasks"></i>&nbsp; {this.props.countTasksUser}
            </div>
          </div>
          <div className="col-sm-4">
            <div className={`${tile_red}`} onClick={this.getChanges}>
              <p>Changes</p>
              <i className="fa fa-book"></i>&nbsp; {this.props.countChangesUser}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="tile orange">
              <h3 className="title">Orange Tile</h3>
              <p>Hello Orange, this is a colored tile.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
};
