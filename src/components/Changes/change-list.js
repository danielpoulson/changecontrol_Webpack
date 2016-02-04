import React, {Component} from 'react';
import ChangeRow from './change-row';

export default class ChangeList extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleClick = (i) => {
    const _id = this.props.changes.paged[i].CC_No;
    const _Title = this.props.changes.paged[i].CC_Descpt;
    this.props.setMain({MainId : _id, MainTitle: _Title, CurrentMode: 'change'});
    this.props.getChange(_id);
    this.context.router.push(`/change/${_id}`);
  };

    render () {

        var _changes = this.props.changes.paged;

        if(_changes !== undefined){

          var changes = _changes.map((change, i) => <ChangeRow key={change.CC_No} change={change}
              getChange = {this.handleClick.bind(null, i)} />);

        }

        return (
            <div>
                <div className="panel panel-success">
                    <table className="table table-hover phange-table dp_point">
                        <thead className="print-table-head">
                            <tr>
                                <th>Change Number and Title</th>
                                <th>Owner</th>
                                <th>Target Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="dpHand">{changes}</tbody>
                    </table>
                    </div>
            </div>
        )
    }
}
