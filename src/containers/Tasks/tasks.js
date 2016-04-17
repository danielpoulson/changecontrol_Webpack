import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskList from 'components/Tasks/task-list';
import Pagination from 'components/Common/pagination';
import SearchBox from 'components/Common/search-box';
/* actions */
import { getAllTasks, loadPageTask, exportTasks } from 'actions/actions_tasks';

// TODO: MED 3 - Make a common component search box Changes and Task List
// Changes and Task share the same search text box function which should be made as a common component

class Tasks extends Component {
  state = {
    activePage: 0,
    paged: {},
    count: 0,
    numPage: 15,
    txtSearch: null,
  };

  componentWillMount() {
    if (!this.props.tasks.alldata.length > 0) {
      this.props.getAllTasks();
    }
    // TODO: HIGH (FUNC) Sticky options on the task list
    // This section should remember you page and or serach options.
    this.onChange();
  }

  onChange = (page_num, searchText) => {
    const action = {};
    action.page_num = page_num || 1;
    action.search = searchText || this.state.txtSearch;
    action.numPage = this.state.numPage;
    this.props.loadPageTask(action);
  };

  onSearchText = (event) => {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, value);
  };

  linkClick = (i) => {
    // TODO: LOW (BUG) Pagination Adding 1 to the page mumber as it uses the base of 0
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({ activePage: i });

  };

  exportTask = () => {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'tasks',
      search: this.state.txtSearch,
    };

    this.props.exportTasks(info);
  };

  render() {

    return (

      <div>
        <div className="">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">
              Active Task List
              </p>
            </div>

            <SearchBox
              searchText={this.state.txtSearch}
              onChange={this.onSearchText}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <button
              className="btn btn-info"
              onClick={this.exportTask} >
              Export List
            </button>
          </div>

          <div className="col-sm-6">
            <Pagination
              activePage = {this.state.activePage}
              numPage = {this.props.tasks.per_page}
              count = {this.props.tasks.total}
              getPage = {this.linkClick.bind(this)} />
          </div>
        </div>

        <TaskList
          tasklist = {this.props.tasks.paged}
          type = "All" />

        </div>
    );
  }
}

Tasks.propTypes = {
  user: PropTypes.object,
  tasks: PropTypes.array,
  exportTasks: PropTypes.func,
  getAllTasks: PropTypes.func,
  loadPageTask: PropTypes.func,
};

export default connect(state => ({ tasks: state.tasks, user: state.main.user }),
  { getAllTasks, loadPageTask, exportTasks })(Tasks);
