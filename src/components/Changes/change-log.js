import React from 'react';
import moment from 'moment';

export default class ChangeLog extends React.Component {
    render() {
    	var _log = this.props.log;
        var spanStyle = { color: "blue" };

        if(_log !== null){
            var logs = _log.CC_LOG.map((log, i) => <li className="list-group-item" key={log._id}>
                                <span style={spanStyle} className="glyphicon glyphicon-edit"></span> Change Control : {log.CC_Action}
                                <small><em> ({moment(new Date(log.CC_ActDate)).format('DD/MM/YYYY')}) {log.CC_ActBy} {log.CC_ActDept}</em></small></li>);
            }

        return (
        	<div className={this.props.className}>
                <div className="row">
                    <div className="col-md-7 col-md-offset-5">
                        <button className="btn btn-info dp-margin-10-LR" onClick={this.props.onApprove}>Approval to Implement</button>
                        <button className="btn btn-success dp-margin-10-LR" onClick={this.props.onFinal}>Final and Complete</button>
                        <button className="btn btn-danger dp-margin-10-LR" onClick={this.props.onCancel}>Cancel / Withdrawn</button>
                    </div>
                </div>
                <div className="col-sm-12 margin-10-top">
                    <ul className="list-group">{logs}</ul>
                </div>
            </div>

			);
    }
};
