import React from 'react';
import { connect } from 'react-redux';
import TaskForm from 'components/Tasks/task-form';
import toastr from 'toastr';
import moment from 'moment';

import { addTask, editTask, deleteTask } from 'actions/actions_tasks';
import { setLoading } from 'actions/actions_main';

@connect( state => ({ main : state.main, users : state.users }), { addTask, editTask, deleteTask, setLoading })

class TaskDetail extends React.Component {
  static childContextTypes = {
      location: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
      dirty: false,
      errors: {},
      hideDelete: null,
      newTask: false,
      ownerNew: false,
      taskId : '',
      status: [
              { "id": 1 , "name": "Task - Not Started (New)" },
              { "id": 2 , "name": 'Task - On Track' },
              { "id": 3 , "name": 'Task - In Concern' },
              { "id": 4 , "name": 'Task - Behind Schedule' },
              { "id": 5 , "name": 'Task - Completed' }
          ]
  };

  componentDidMount() {
      const _taskId = this.props.location.pathname.split('/')[2];
      const _hideDelete = this.props.main.user.role !== 'admin' || this.props.newTask === true ? "hidden" : "btn btn-danger";
      this.setState({taskId : _taskId});
      this.setState({hideDelete : _hideDelete});
    }

    cancelTask = (event) => {
      event.preventDefault();
      this.props.setLoading({loading: false});
      this.taskNav(this.props.main.MainId);
    };

    deleteTask = (event) => {
        event.preventDefault();
        this.props.setLoading({loading: false});
        const _id = this.state.taskId;
        this.props.deleteTask(_id);
        toastr.error("Task has been deleted",'Task Detail', {timeOut: 1000});
        this.taskNav(this.props.main.MainId);
    };

    ownerChanged = (status) => {
      this.setState({ownerNew: status});
    };

    saveTask = (data) => {
        let _SourceId = this.props.main.MainId;

        if (this.state.taskId !== 'new') {
            data.TKChampNew = this.state.ownerNew;
            data._id = this.state.taskId;
            data.TKStat = typeof data.TKStat === 'object' ? data.TKStat.id : data.TKStat;
            data.SourceId = _SourceId
            this.props.editTask(data);
        } else {
            data.TKStat = data.TKStat.id || 1;
            data.SourceId = _SourceId
            this.props.addTask(data);
        }

        toastr.success('Task has been saved','Task Detail', {timeOut: 1000});
        this.taskNav(_SourceId);
    };

    taskNav(id){
        if(this.props.main.CurrentMode === 'project'){
            this.context.router.push(`/project/${id}`)
        } else {
            this.context.router.push(`/change/${id}`)
        }
    }

    render() {

            var formStyle = {
                backgroundColor : '#fcfffc',
                border : "solid 1px",
                borderRadius : 4,
                paddingTop: 10,
                paddingBottom: 50

            };

            var taskTitle = this.state.taskTitle ? this.state.taskTitle : "New Task";

        return (

            <div>
              <div className="">
                <div className="section-header">
                  <p className="section-header-text-sub">{taskTitle}</p>
                </div>
              </div>

              <div style={formStyle}>
                <TaskForm
                  onSubmit={this.saveTask}
                  status={this.state.status}
                  users={this.props.users}
                  ownerChanged={this.ownerChanged}
                  deleteTask={this.deleteTask}
                  hideDelete={this.state.hideDelete}
                  onCancel={this.cancelTask}/>
                </div>
            </div>

        );
    }

};

export default TaskDetail;
