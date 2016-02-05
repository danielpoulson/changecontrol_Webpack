import React from 'react';
import FileRow from './file-row';

// TODO: Convert to a stateless function
class FileTable extends React.Component {
//	propTypes: {
//		onChange : React.PropTypes.func.isRequired,
//		errors : React.PropTypes.object
//	},

	render() {
                var _files = this.props.files;
                var hidden = this.props.export;

                if(Object.keys(_files).length > 0){
                    var files = _files.map((file, i) => <FileRow key={file._id} file={file}
                    export={hidden} createLog={this.props.createLog}/>);
                }


		return (

                    <div className="panel panel-success">
                        <table className="table table-hover project-table dp_point">
                            <thead>
                                <tr className="print-table-head">
                                    <th>Type</th>
                                    <th>File Name</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="panel-body">{files}</tbody>
                        </table>
                    </div>

		);
	}

};

export default FileTable;
