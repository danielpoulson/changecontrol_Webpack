import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import FileTable from 'components/Files/file-table';
import FileZone from 'components/Files/file-zone';

/* actions */
import { getFiles, addFile, bookoutFile, deleteFile } from 'actions/actions_files';
import { setFiletabCount } from 'actions/actions_main';
import { createLog } from 'actions/actions_changes';

@connect(state => ({files : state.files}), {getFiles, addFile, bookoutFile, deleteFile, setFiletabCount, createLog})

export default class FileList extends Component {
	constructor(props) {
    super(props);
    this.state = {};
		this.onAddFile = this.onAddFile.bind(this);
		this.onCreateLog = this.onCreateLog.bind(this);
		this.onBookoutFile = this.onBookoutFile.bind(this);
		this.onDeleteFile = this.onDeleteFile.bind(this);
	}


	componentWillMount() {
		if (this.props.sourceId){
			this.props.getFiles(this.props.sourceId);
		}
	}

	componentDidUpdate(){
		this.props.setFiletabCount(this.props.files.length);
	}

	onAddFile(file){
		this.props.addFile(file);
	}

	onCreateLog(log){
		this.props.createLog(log);
		//this.props.refreshChange();
	}

	onDeleteFile(id){
		this.props.deleteFile(id);
	}

	onBookoutFile(id){
		this.props.bookoutFile(id);
	}

	render() {
       var tableStyle = {
                marginTop : 20,
                marginLeft : 10
            };

		return (
			<div className={this.props.className}>

				<div className="row">

					<div style={tableStyle} className="col-sm-10">

						<FileTable
							files={this.props.files}
							export={this.props.export}
							createLog={this.onCreateLog}
							deleteFile={this.onDeleteFile}
							bookoutFile={this.onBookoutFile}/>
					</div>
					<div className={this.props.export}>
						<div className="col-sm-1">

							<FileZone
								addFile={this.onAddFile}
								sourceId={this.props.sourceId} />
						</div>
					</div>
				</div>
			</div>
		)

	}
};
