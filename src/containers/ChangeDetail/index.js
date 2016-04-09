import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangeForm from 'components/Changes/change-form';
import TaskList from 'components/Tasks/task-list';
import FileList from 'containers/Files/file-list';
import ChangeLog from 'components/Changes/change-log';
import classNames from 'classnames';
import toastr from 'toastr';

/* actions */
import { addChange, createLog, editChange, getChange } from 'actions/actions_changes';
import { getProjectTasks } from 'actions/actions_tasks';
import { setMain } from 'actions/actions_main';
import { getUsers } from 'actions/actions_users';

@connect(state => ({
  change : state.change,
  main: state.main,
  tasklist: state.tasks.ctlist,
  ctTotal : state.tasks.ctTotal,
  users: state.users
}), {
  addChange, createLog, editChange, getChange, getProjectTasks, setMain
})

export default class ChangeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
                changeTitle: 'Get the main title',
                ccNo: '',
                dirty: false,
                DetailTab: 'show',
                errors: {},
                FilesTab: 'hidden',
                fCount: 0,
                LogTab: 'hidden',
                tasks: [],
                TasksTab: 'hidden',
                tCount: 0,
                status: [
                        { "id": 1 , "name": "Review" },
                        { "id": 2 , "name": 'Approved' },
                        { "id": 3 , "name": 'On-hold' },
                        { "id": 4 , "name": 'Closed' },
                        { "id": 5 , "name": 'Cancelled' }
                    ]
            };

    this.onApprove = this.onApprove.bind(this);
    this.onFinal = this.onFinal.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  static childContextTypes = {
      location: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  cancelChange = (e) => {
    e.preventDefault();
    this.context.router.push('/changes');
  };

  componentWillMount(){
    const CC_No = this.props.location.pathname.split('/')[2];
    if(this.props.main.loading === true){
      this.props.getProjectTasks(CC_No);
    }
    this.setState({ccNo : CC_No});
  }
// TODO: LOW 2 Remove the dept field from the user item
//Remove CC_ActDept : this.props.main.user.dept
// Not needed

  logMessage(message){
    const _log = {
      CC_No: this.props.change.CC_No,
      CC_Id : 1,
      CC_Action : message,
      CC_ActDept : this.props.main.user.dept,
      CC_ActBy : this.props.main.user.fullname,
      CC_ActDate : new Date()
    };

    this.props.createLog(_log);
    toastr.success(message);

  }

  onApprove (){
    this.logMessage("Approved to Implement");
  }

  onFinal (){
    this.logMessage("Change Closed");
  }

  onCancel(){
    this.logMessage("Change Cancelled");
  }

  onRefresh() {
    this.props.getChange(this.state.ccNo);
  }
// TODO: LOW Remove CC_ActDept : this.prop.main.user.dept
// TODO: MED 4 e.preventDefault from redux-form not working
  saveChange = (data) => {

        if (this.state.ccNo !== 'new') {
            data._id = this.props.change._id;
            data.CC_Stat = typeof data.CC_Stat === 'object' ? data.CC_Stat.id : data.CC_Stat;
            data.CC_No = this.props.change.CC_No;
            this.props.editChange(data);
        } else {
            var created = [];
            created.push({CC_Id : 0, CC_Action: "Created", CC_ActBy : this.props.main.user.fullname, CC_ActDept : this.props.main.user.dept, CC_ActDate : new Date()});
            data.CC_LOG = created;
            data.CC_Stat = data.CC_Stat.id || 1;
            this.props.addChange(data);
        }

        toastr.success('Change has been saved','Change Detail', {timeOut: 1000});
        this.setState({dirty: false});
        this.context.router.push('/changes');
    };

  showTab(value) {
      this.setState({DetailTab: 'hidden'});
      this.setState({TasksTab: 'hidden'});
      this.setState({FilesTab: 'hidden'});
      this.setState({LogTab: 'hidden'});
      this.setState({[value] :'show'});
  }


  render() {

    const _title = this.props.change !== null ? `${this.props.change.CC_No} - ${this.props.change.CC_Descpt}` : 'New - Change Control';

    let detailTabClass = classNames({
      'active' : this.state.DetailTab == 'show'
    });

    let tasksTabClass = classNames({
      'active' : this.state.TasksTab == 'show',
      'hidden' : this.props.main.MainId === 'new'
    });

    let fileTabClass = classNames({
      'active' : this.state.FilesTab == 'show',
      'hidden' : this.props.main.MainId === 'new'
    });

    let logTabClass = classNames({
      'active' : this.state.LogTab == 'show',
      'hidden' : this.props.main.MainId === 'new'
    });

    return (
    <div>
          <div className="">
            <div className="section-header">
              <p className="section-header-text-sub">{_title}</p>
            </div>
          </div>
          <ul className="nav nav-tabs dpHand">
            <li className={detailTabClass}>
              <a onClick={this.showTab.bind(this, "DetailTab")} data-toggle="tab">Detail</a>
            </li>
            <li className={tasksTabClass}>
              <a onClick={this.showTab.bind(this, "TasksTab")} refs="TasksTab" data-toggle="tab">Tasks <span className="badge"> {this.props.ctTotal} </span></a>
            </li>
            <li className={fileTabClass}>
              <a onClick={this.showTab.bind(this, "FilesTab")} data-toggle="tab">Files <span className="badge"> {this.props.main.fileTabCount} </span></a>
            </li>
            <li className={logTabClass}>
              <a onClick={this.showTab.bind(this, "LogTab")} data-toggle="tab">Log</a>
            </li>
          </ul>

          <div className={this.state.DetailTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                <ChangeForm onSubmit={this.saveChange} status={this.state.status} users={this.props.users} onCancel={this.cancelChange}/>
              </div>
            </div>
          </div>

          <TaskList
            tasklist = {this.props.tasklist}
            className={this.state.TasksTab}
            title={this.state.changeTitle}
          />

         <ChangeLog
              logTab={this.state.LogTab}
              onApprove={this.onApprove}
              onFinal={this.onFinal}
              onCancel={this.onCancel}
              log={this.props.change}/>

          <FileList
              className={this.state.FilesTab}
              refreshChange={this.onRefresh}
              sourceId={this.props.location.pathname.split('/')[2]}/>

      </div>
    );
  }
}
