import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChangeForm from 'components/Changes/change-form';
import toastr from 'toastr';

/* actions */
import { editChange } from 'actions/actions_changes';

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

  handleSubmit = (data) => {
    data._id = this.props.change._id;
    data.CC_No = this.props.change.CC_No;
    data.CC_Stat = data.CC_Stat.id;
    this.props.editChange(data);
    toastr.success('Change has been saved','Change Detail', {timeOut: 1000});
    this.props.history.push('/changes');
  };

  // showChange = () => {
  //   this.setState({detailTab: 'show'});
  //   this.setState({taskTab: 'hidden'});
  //   this.setState({fileTab: 'hidden'});
  //   this.setState({logTab: 'hidden'});
  //
  // };
  //
  // showTask = () => {
  //     this.setState({detailTab: 'hidden'});
  //     this.setState({taskTab: 'show'});
  //     this.setState({fileTab: 'hidden'});
  //     this.setState({logTab: 'hidden'});
  //     this.setState({tasks: TaskStore.all()});
  //
  //
  // };
  //
  // showFile = () => {
  //
  //     this.setState({detailTab: 'hidden'});
  //     this.setState({taskTab: 'hidden'});
  //     this.setState({logTab: 'hidden'});
  //     this.setState({fileTab: 'show'});
  // };

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
            </li>
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
                <ChangeForm onSubmit={this.handleSubmit} status={this.state.status} onCancel={this.cancelChange}/>
              </div>
            </div>
          </div>

          {/*<TaskList
            tasks={this.state.tasks}
            className={this.state.taskTab}
            title={this.state.changeTitle}
          />

         <ChangeLog
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
    main: state.main
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDetail);
