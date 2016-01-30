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
            detailTab: 'show',
            errors: {},
            fileTab: 'hidden',
            fCount: 0,
            logTab: 'hidden',
            tasks: [],
            taskTab: 'hidden',
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

  showChange = () => {
    this.setState({detailTab: 'show'});
    this.setState({taskTab: 'hidden'});
    this.setState({fileTab: 'hidden'});
    this.setState({logTab: 'hidden'});

  };

  showTask = () => {
      this.setState({detailTab: 'hidden'});
      this.setState({taskTab: 'show'});
      this.setState({fileTab: 'hidden'});
      this.setState({logTab: 'hidden'});
      this.setState({tasks: TaskStore.all()});


  };

  showFile = () => {

      this.setState({detailTab: 'hidden'});
      this.setState({taskTab: 'hidden'});
      this.setState({logTab: 'hidden'});
      this.setState({fileTab: 'show'});
  };

  showLog = () => {

      this.setState({detailTab: 'hidden'});
      this.setState({taskTab: 'hidden'});
      this.setState({fileTab: 'hidden'});
      this.setState({logTab: 'show'});
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
            <li className={this.state.detailTab == 'show' ? "active" : "" }>
              <a onClick={this.showChange} data-toggle="tab">Detail</a>
            </li>
            <li className={this.state.taskTab == 'show' ? "active" : "" }>
              <a onClick={this.showTask} data-toggle="tab">Tasks <span className="badge"> {this.state.tCount} </span></a>
            </li>
            <li className={this.state.fileTab == 'show' ? "active" : "" }>
              <a onClick={this.showFile} data-toggle="tab">Files <span className="badge"> {this.state.fCount} </span></a>
            </li>
            <li className={this.state.logTab == 'show' ? "active" : "" }>
              <a onClick={this.showLog} data-toggle="tab">Log</a>
            </li>
          </ul>

          <div className={this.state.detailTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                <ChangeForm onSubmit={this.handleSubmit} status={this.state.status}/>
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
