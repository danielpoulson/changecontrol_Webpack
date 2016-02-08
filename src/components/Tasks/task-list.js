import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TaskTable from './task-table';
import { getTask } from 'actions/actions_tasks';
import { getChange } from 'actions/actions_changes';
import { setMain } from 'actions/actions_main';

@connect(null, { getTask, getChange, setMain })

class TaskList extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
    handleClick = (i) => {
        if(this.props.type === "All"){
            let ccNo = this.props.tasklist[i].SourceId;
            this.props.setMain({MainId : ccNo, CurrentMode: 'change'});
            this.props.getChange(ccNo);
            this.context.router.push(`/change/${ccNo}`);
        } else {
            const _id = this.props.tasklist[i]._id;
            this.props.getTask(_id);
            this.context.router.push(`/task/${_id}`);
        }
    };

    newTask = () => {
        this.props.getTask();
        this.context.router.push(`/task/new`);
    };

    render() {
        let tableStyle = {
            marginTop : 20,
            marginLeft : 10
        };


        //This code is left over from something else
        let _task = {};
        let ShowStatus = false;
        let hideButton = '';

        if(Object.getOwnPropertyNames(_task).length === 0){
            ShowStatus = false;
        } else {
            ShowStatus = true;
        }

        if(this.props.type === "All"){
            hideButton = "hidden";
        }


        return (
            <div className={this.props.className}>
            <div className="row">
                    <div style={tableStyle} className="row">
                        <TaskTable
                            tasklist = {this.props.tasklist}
                            handleClick = {this.handleClick}/>
                    </div>
                </div>
                <div className={hideButton}>
                    <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={this.newTask} />
                </div>
            </div>

            )
    }
};

export default TaskList;
