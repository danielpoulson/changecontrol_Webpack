import React from 'react'
import moment from 'moment'
import utils from 'utils/status'

export default class ChangeRow extends React.Component {

	render() {
    	var change = this.props.change;
        return (

	        	<tr onClick={this.props.getChange.bind(this)}>
					<td>{change.CC_No} - {change.CC_Descpt}</td>
			        <td>{change.CC_Champ}</td>
	                <td>{moment(change.CC_TDate).format('DD/MM/YYYY')}</td>
                    <td className="colaligncenter"><i className={utils.getStatCC(change.CC_Stat)}></i></td>
				</tr>

			);
    }
};
