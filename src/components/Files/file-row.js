import React from 'react';
import moment from 'moment';
import utils from 'utils/status'
import DownloadButton from 'components/Common/download-button';
import BookoutButton from 'components/Common/bookout-button';


var FileRow = React.createClass({


    render: function  () {
    	var file = this.props.file;
        var fullFileName = file.fsSource + " - " + file.fsFileName + "." + file.fsFileExt
        return (

                <tr>
                    <td><i className={utils.getExt(file.fsFileExt)}></i></td>
                    <td>{file.fsFileName}</td>
                    <td>{file.fsAddedBy}</td>
                    <td>{moment(new Date(file.fsAddedAt)).format('DD/MM/YYYY')}</td>
                    <td>
                        <DownloadButton fileLoad={fullFileName} fileId={file._id} export={this.props.export}/>
                    </td>
                    <td className={this.props.export}>
                        <BookoutButton fileLoad={fullFileName} source={file.fsSource} fileId={file._id} fsBooked={file.fsBooked}/>
                    </td>
                </tr>

			);
    }
});

module.exports = FileRow;
