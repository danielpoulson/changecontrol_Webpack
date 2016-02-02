import React from 'react'
import moment from 'moment'
import utils from 'utils/status'

export default class TaskRow extends React.Component {

    render() {
    	var task = this.props.task;
        return (

	        	<tr onClick={this.props.getTask}>
					<td>{task.SourceId} - {task.TKName}</td>
	                <td>{moment(task.TKStart).format('DD/MM/YYYY')}</td>
	                <td>{moment(task.TKTarg).format('DD/MM/YYYY')}</td>
                    <td>{task.TKChamp}</td>
                    <td><i className={utils.getStatus(task.TKStat)}></i></td>
				</tr>

			);
    }
};

export default TaskRow;
