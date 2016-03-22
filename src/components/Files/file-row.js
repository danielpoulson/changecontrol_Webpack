import React from 'react';
import moment from 'moment';
import utils from 'utils/status'
import DownloadButton from 'components/Common/download-button';
import BookoutButton from 'components/Common/bookout-button';


class FileRow extends React.Component {


    render() {
    	var file = this.props.file;
        var fullFileName = file.fsSource + " - " + file.fsFileName + "." + file.fsFileExt
        return (

                <tr>
                    <td><i className={utils.getExt(file.fsFileExt)}></i></td>
                    <td>{file.fsFileName}</td>
                    <td>{file.fsAddedBy}</td>
                    <td>{moment(new Date(file.fsAddedAt)).format('DD/MM/YYYY')}</td>
                    <td>
                      <DownloadButton
                        removeFile={this.props.removeFile}
                        fileLoad={fullFileName}
                        fileId={file._id}
                        export={this.props.export}/>
                    </td>
                    <td className={this.props.export}>
                      <BookoutButton
                        user={this.props.user}
                        fileLoad={fullFileName}
                        source={file.fsSource}
                        fileId={file._id}
                        fsBooked={file.fsBooked}
                        createLog={this.props.createLog}
                        deleteFile={this.props.deleteFile}
                        bookoutFile={this.props.bookoutFile}/>
                    </td>
                </tr>

			);
    }
};

export default FileRow;
