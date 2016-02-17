import React, {Component} from 'react';
import { connect } from 'react-redux'
import ChangeRow from './change-row';
import classNames from 'classnames';

import { setMain } from 'actions/actions_main';

@connect(null, { setMain })

export default class ChangeList extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleClick = (i) => {
    const _id = this.props.changelist[i].CC_No;
    this.props.setMain({MainId : _id, CurrentMode: 'change', loading : true});
    this.props.getChange(_id);
    this.context.router.push(`/change/${_id}`);

  };

    render () {

        var _changes = this.props.changelist;

        var th1Class = classNames({
          'fa fa-sort-asc' : this.props.colSelected == "CC_No"
        });

        var th2Class = classNames({
          'fa fa-sort-asc' : this.props.colSelected == "CC_Champ"
        });

        var th3Class = classNames({
          'fa fa-sort-asc' : this.props.colSelected == "CC_TDate"
        });

        var th4Class = classNames({
          'fa fa-sort-asc' : this.props.colSelected == "CC_Stat"
        });





        if(_changes !== undefined){

          var changes = _changes.map((change, i) => <ChangeRow key={change.CC_No} change={change}
              getChange = {this.handleClick.bind(null, i)} />);

        }

        return (
            <div>
                <div className="panel panel-success">
                    <table className="table table-hover phange-table dp_point">
                        <thead className="print-table-head">
                            <tr className="dpHand">
                                <th onClick={this.props.sortByClick.bind(null, "CC_No")}>
                                    Change Number and Title <span className={th1Class}></span>
                                </th>
                                <th onClick={this.props.sortByClick.bind(null, "CC_Champ")}>
                                    Owner  <span className={th2Class}></span>
                                </th>
                                <th onClick={this.props.sortByClick.bind(null, "CC_TDate")}>
                                    Target Date  <span className={th3Class}></span>
                                </th>
                                <th onClick={this.props.sortByClick.bind(null, "CC_Stat")}>
                                    Status  <span className={th4Class}></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="dpHand">{changes}</tbody>
                    </table>
                    </div>
            </div>
        )
    }
}
