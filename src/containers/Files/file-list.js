import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import FileTable from 'components/Files/file-table';
import FileZone from 'components/Files/file-zone';

/* actions */
import { getFiles } from 'actions/actions_files';

class FileList extends Component {


	componentWillMount() {
		if (this.props.sourceId){
			this.props.getFiles(this.props.sourceId);
		}

		console.log(this.props.sourceId);
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
                                export={this.props.export}/>
                        </div>
                        <div className={this.props.export}>
                            <div className="col-sm-1">

                            </div>
                        </div>
                    </div>
                </div>
		)

	}
};

function mapStateToProps(state) {
  return {
    files : state.files
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFiles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
