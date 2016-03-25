import React, { Component } from 'react';
import TaskRow from './task-row';

class TaskTable extends Component {
//	propTypes: {
//		onChange : React.PropTypes.func.isRequired,
//		errors : React.PropTypes.object
//	},

	render() {
    var _tasks = this.props.tasklist;

		if(_tasks !== undefined ){
        var tasks = _tasks.map((task, i) => <TaskRow key={task._id} task={task}
        getTask = {this.props.handleClick.bind(null, i)} />);
    }

		return (

      <div className="panel panel-success">
          <table className="table table-hover project-table dp_point">
              <thead className="print-table-head">
                  <tr>
                      <th>Project Id and Task Name</th>
                      <th>Start</th>
                      <th>Target Date</th>
                      <th>Champion</th>
                      <th>Status</th>
                  </tr>
              </thead>
              <tbody className="panel-body dpHand">{tasks}</tbody>
          </table>
      </div>

		);
	}

};

export default TaskTable;
