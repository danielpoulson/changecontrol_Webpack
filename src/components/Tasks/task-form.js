import React from 'react';
import {reduxForm} from 'redux-form';
import TextArea from 'components/Common/text-area';
import { TextInputTask } from 'components/common/text-input-task';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';

const newdata = {  // used to populate "account" reducer when "Load" is clicked
  TKStat: 1,
  TKChamp: 'Daniel Poulson',
  TKStart: new Date()
};

@reduxForm({
  form: 'task',
  fields: ['TKName', 'TKStart', 'TKTarg', 'TKStat', 'TKChamp', 'TKComment']},
  state => ({
  initialValues: state.task ? state.task : newdata // will pull state into form's initialValues
  })
)

export default class TaskForm extends React.Component {
	static propTypes: {
		onSave : React.PropTypes.func.isRequired,
		onChange : React.PropTypes.func.isRequired,
		errors : React.PropTypes.object
	};

	render() {
    const {
      fields: {TKName, TKStart, TKTarg, TKStat, TKChamp, TKComment},
      handleSubmit,
      onCancel,
      deleteTask,
      submitting,
      status
      } = this.props;

        var hideDelete = window.USER.role !== 'admin' || this.props.newTask === true ? "hidden" : "btn btn-danger pull-right";
        var wrapperClassSD = '';
        var wrapperClassTD = '';

        if (this.props.errors.TKStart && this.props.errors.TKStart.length > 0) {
            wrapperClassSD += " " + 'has-date-error';
        }

        if (this.props.errors.TKTarg && this.props.errors.TKTarg.length > 0) {
            wrapperClassTD += " " + 'has-date-error';
        }

		return (
            <div>
              <form onSubmit={handleSubmit} className="form form-horizontal" >

                <TextInputTask
                  name="TKName"
                  label="Task Name"
                  placeholder="Enter Task Name (Required)"
                  dpInputCol="col-sm-9"
                  dpLabelCol="col-sm-2"
                  {...TKName}/>

                <DateTimePicker
                  dpInputCol="col-sm-3"
                  dpLabelCol="col-sm-2"
                  label="Start date"
                  onChange={this.handleStartDateChange}
                  {...TKStart}/>

                <DateTimePicker
                  label="Target Date"
                  dpLabelCol="col-sm-2"
                  dpInputCol="col-sm-3"
                  onChange={this.handleStartDateChange}
                  {...TKTarg}/>

                <ComboBox
                  label="Complete Date"
                  onChange={this.handleStartDateChange}
                  status={status}
                  dpInputCol="col-sm-4"
                  dpLabelCol="col-sm-2"
                  {...TKStat}
                />

                <TextInputTask
                  name="TKChamp"
                  label="Owner:"
                  dpInputCol="col-sm-4"
                  dpLabelCol="col-sm-2"
                  placeholder="Enter Taks Owner (Required)"
                  {...TKChamp}/>

                <TextArea
                  name="TKComment"
                  label="Comment"
                  rows="6"
                  inputstyle="form-control"
                  dpInputCol="col-sm-9"
                  dpLabelCol="col-sm-2"
                  {...TKComment}
                  value={TKComment.value || ''}/>

                <div className="col-sm-9 col-md-offset-2">
                  <button className="btn btn-success pull-left" disabled={submitting} onClick={handleSubmit}>
                    {submitting ? <i/> : <i/>} Submit
                  </button>
                  <button className="btn btn-info dp-margin-10-LR" disabled={submitting} onClick={onCancel}>
                  Cancel
                  </button>
                  <button className={hideDelete} disabled={submitting} onClick={deleteTask}>
                    Delete
                  </button>
                </div>
                </form>
            </div>
		);
	}

};