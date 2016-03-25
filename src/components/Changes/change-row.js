import React, { PropTypes } from 'react'
import moment from 'moment'
import utils from 'utils/status'

const ChangeRow = (props) => {
	return (
		<tr onClick={props.getChange.bind(this)}>
			<td>{props.change.CC_No} - {props.change.CC_Descpt}</td>
			<td>{props.change.CC_Champ}</td>
			<td>{moment(props.change.CC_TDate).format('DD/MM/YYYY')}</td>
			<td className="colaligncenter"><i className={utils.getStatCC(props.change.CC_Stat)}></i></td>
		</tr>
	)
}

export default ChangeRow
