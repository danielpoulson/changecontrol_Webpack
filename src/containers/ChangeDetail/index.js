import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChangeForm from 'components/Changes/change-form';
import TaskList from 'components/Tasks/task-list';
import FileList from 'containers/Files/file-list';
import ChangeLog from 'components/Changes/change-log';
import toastr from 'toastr';

/* actions */
import { addChange, editChange, getChange } from 'actions/actions_changes';
import { getProjectTasks } from 'actions/actions_tasks';

class ChangeDetail extends Component {
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


  cancelChange = () => {
      this.context.router.push('/changes');
  };

  componentWillMount(){
    const CC_No = this.props.location.pathname.split('/')[2];
    this.props.getProjectTasks(CC_No);
    this.setState({ccNo : CC_No});
  }

  onApprove (){
    var _change = this.state.change;
    _change.CC_LOG.push({CC_Id : 1, CC_Action : "Approved to Implement", CC_ActDept : window.USER.dept, CC_ActBy : window.USER.fullname, CC_ActDate : new Date()});
    actions.updateChange(_change);

    toastr.success("Approved to Implement");
    this.setState({dirty: false});
  }

  onFinal (){
    var _change = this.state.change;
    _change.CC_LOG.push({CC_Id : 2, CC_Action : "Closed and all actions completed", CC_ActDept : window.USER.dept, CC_ActBy : window.USER.fullname, CC_ActDate : new Date()});
    actions.updateChange(_change);

    toastr.success("Change Closed");
    this.setState({dirty: false});
  }

  onCancel(){
    event.preventDefault();
    var _change = this.state.change;
    _change.CC_LOG.push({CC_Id : 3, CC_Action : "Canelled and Withdrawn", CC_ActDept : window.USER.dept, CC_ActBy : window.USER.fullname, CC_ActDate : new Date()});
    actions.updateChange(_change);

    toastr.error("Change Cancelled");
    this.setState({dirty: false});
  }

  onRefresh() {
    this.props.getChange(this.state.ccNo);
  }

  saveChange = (data) => {
        if (this.props.main.MainId !== 'new') {
            data._id = this.props.change._id;
            data.CC_Stat = data.CC_Stat.id;
            data.CC_No = this.props.change.CC_No;
            this.props.editChange(data);
        } else {
            var created = [];
            created.push({CC_Id : 0, CC_Action: "Created", CC_ActBy : window.USER.fullname, CC_ActDept : window.USER.dept, CC_ActDate : new Date()});
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

    return (
    <div>
          <div className="row">
            <div className="section-header">
              <p className="section-header-text-sub">{this.props.main.MainTitle}</p>
            </div>
          </div>
          <ul className="nav nav-tabs dpHand">
            <li className={this.state.DetailTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab.bind(this, "DetailTab")} data-toggle="tab">Detail</a>
            </li>
            <li className={this.state.TasksTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab.bind(this, "TasksTab")} refs="TasksTab" data-toggle="tab">Tasks <span className="badge"> {this.props.tasks.total} </span></a>
            </li>
            <li className={this.state.FilesTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab.bind(this, "FilesTab")} data-toggle="tab">Files <span className="badge"> {this.props.main.fileTabCount} </span></a>
            </li>
            <li className={this.state.LogTab == 'show' ? "active" : "" }>
              <a onClick={this.showTab.bind(this, "LogTab")} data-toggle="tab">Log</a>
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
            className={this.state.TasksTab}
            title={this.state.changeTitle}
          />

         <ChangeLog
              className={this.state.LogTab}
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

function mapStateToProps(state) {
  return {
    change : state.change,
    main: state.main,
    tasks: state.tasks,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addChange, editChange, getChange, getProjectTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDetail);
