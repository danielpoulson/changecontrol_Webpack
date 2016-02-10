import React from 'react';
import moment from 'moment';

const ChangeLog = (props) => {

  const _log = props.log;
  const spanStyle = { color: "blue" };
  const butGroup = { padding: 10};

  if(_log !== null){
    var logs = _log.CC_LOG.map((log, i) => <li className="list-group-item" key={log._id}>
                      <span style={spanStyle} className="glyphicon glyphicon-edit"></span> Change Control : {log.CC_Action}
                      <small><em> ({moment(new Date(log.CC_ActDate)).format('DD/MM/YYYY')}) {log.CC_ActBy} </em></small></li>);
  }

  return (
  	<div className={props.className}>
          <div className="row">
              <div style={butGroup} className="col-md-7 col-md-offset-5">
                  <button className="btn btn-info dp-margin-10-LR" onClick={props.onApprove}>Approval to Implement</button>
                  <button className="btn btn-success dp-margin-10-LR" onClick={props.onFinal}>Final and Complete</button>
                  <button className="btn btn-danger dp-margin-10-LR" onClick={props.onCancel}>Cancel / Withdrawn</button>
              </div>
          </div>
          <div className="col-sm-12 margin-10-top">
              <ul className="list-group">{logs}</ul>
          </div>
      </div>

  );

};

export default ChangeLog;
