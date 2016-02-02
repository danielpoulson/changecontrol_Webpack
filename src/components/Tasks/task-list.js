import React, {Component} from 'react';
import moment from 'moment';

import TaskTable from './task-table'

class TaskList extends React.Component {
    handleClick = (i) => {
        if(this.props.type === "All"){
            var _id = this.props.tasks.paged[i].SourceId;
            this.props.setMain({MainId : _id, MainTitle: _Title, CurrentMode: 'change'});
            this.props.history.push(`/change/${_id}`);
        } else {
            this.props.history.push(`/task/${this.props.tasks.paged[i]._id}`);
        }
    };

    newTask = () => {
        this.props.history.push(`/task/new`);
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
                            tasks = {this.props.tasks}
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
