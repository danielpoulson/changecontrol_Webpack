import React from 'react';
import FileRow from './file-row';

const FileTable = (props) => {

  const _files = props.files;
  const hidden = props.export;

  if(Object.keys(_files).length > 0){
      var files = _files.map((file, i) => <FileRow key={file._id} file={file}
      user={props.user}
      export={hidden} createLog={props.createLog}
      deleteFile={props.deleteFile}
      removeFile={props.removeFile}
      bookoutFile={props.bookoutFile}/>);
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

};

export default FileTable;
