import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChangeForm from 'components/Changes/change-form';
import TaskList from 'components/Tasks/task-list';
import toastr from 'toastr';

/* actions */
import { addChange, editChange } from 'actions/actions_changes';
import { getProjectTasks } from 'actions/actions_tasks';

class ChangeDetail extends Component {
  state = {
            changeTitle: 'Get the main title',
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

  cancelChange = () => {
      this.props.history.push('/changes');
  };

  componentWillMount(){
    const CC_No = this.props.routing.path.split('/')[2];
    this.props.getProjectTasks(CC_No);
  }

  // handleSubmit = (data) => {
  //   data._id = this.props.change._id;
  //   data.CC_No = this.props.change.CC_No;
  //   data.CC_Stat = data.CC_Stat.id;
  //   this.props.editChange(data);
  //   toastr.success('Change has been saved','Change Detail', {timeOut: 1000});
  //   this.props.history.push('/changes');
  // };

  saveChange = (data) => {
        if (this.props.main.MainId !== 'new') {
            data._id = this.props.change._id;
            data.CC_Stat = data.CC_Stat.id;
            data.CC_No = this.props.change.CC_No;
            this.props.editChange(data);
        } else {
            var created = [];
            created.push({CC_Id : 0, CC_Action : "Created", CC_ActBy : window.USER.fullname, CC_ActDept : window.USER.dept, CC_ActDate : new Date()});
            data.CC_LOG = created;
            data.CC_Stat = data.CC_Stat.id || 1;
            this.props.addChange(data);
        }

        toastr.success('Change has been saved','Change Detail', {timeOut: 1000});
        this.setState({dirty: false});
        this.props.history.push('/changes');
    };

  showTab = (event) => {

    let tabType = `${event.target.innerText}Tab`;
    tabType = tabType.replace(/\s+/g, '');

      this.setState({DetailTab: 'hidden'});
      this.setState({TasksTab: 'hidden'});
      this.setState({FilesTab: 'hidden'});
      this.setState({LogTab: 'hidden'});
      this.setState({ [tabType] :'show'});
  };


  render() {

    return (
    <div>
          <div className="row">
            <div className="section-header">
              <p className="section-header-text-sub">{this.props.main.MainTitle}</p>
            </div>
          </div>
          <ul className="nav nav-tabs dpHand">
            <li className={this.state.DetailTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab} data-toggle="tab">Detail</a>
            </li>
            <li className={this.state.TasksTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab} refs="TasksTab" data-toggle="tab">Tasks <span className="badge"> {this.state.tCount} </span></a>
            </li>         {/*<ChangeLog
              className={this.state.logTab}
              sourceId={this.state.change.CC_No}
              onApprove={this.onApprove}
              onFinal={this.onFinal}
              onCancel={this.onCancel}
              log={this.state.change.CC_LOG}/>

          <FileList
              className={this.state.fileTab}
              sourceId={this.state.change.CC_No}/>*/}
            <li className={this.state.FilesTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab} data-toggle="tab">Files <span className="badge"> {this.state.fCount} </span></a>
            </li>
            <li className={this.state.LogTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab} data-toggle="tab">Log</a>
            </li>
          </ul>

          <div className={this.state.DetailTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                <ChangeForm onSubmit={this.saveChange} status={this.state.status} onCancel={this.cancelChange}/>
              </div>
            </div>
          </div>

          <TaskList
            tasks = {this.props.tasks}
            className={this.state.taskTab}
            title={this.state.changeTitle}
          />

         {/*<ChangeLog
              className={this.state.logTab}
              sourceId={this.state.change.CC_No}
              onApprove={this.onApprove}
              onFinal={this.onFinal}
              onCancel={this.onCancel}
              log={this.state.change.CC_LOG}/>

          <FileList
              className={this.state.fileTab}
              sourceId={this.state.change.CC_No}/>*/}


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    change : state.change,
    main: state.main,
    tasks: state.tasks,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addChange, editChange, getProjectTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDetail);
