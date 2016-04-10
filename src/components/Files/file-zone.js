import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import Request from 'superagent';

class FileZone extends React.Component {
  // TODO: MED 2 Change function of the filezone drop function to multiply files
  onDrop = (files) => {
    var file = files[0];
    var sourceId = this.props.sourceId;
    var addFile = this.props.addFile;
    var req = Request.post('/server/upload');

    files.forEach((file) => {

      const myRe = /C{2}\d{6}\s[-]\s/;
      var _fileName = file.name;
      var _newFileName = '';
      var myArray = myRe.exec(_fileName);

      if (myArray) {
        _newFileName = _fileName;
      } else {
        _newFileName = `${sourceId} - ${file.name}`;
      }

      req.field('sourceId', sourceId);
      req.field('dpUser', this.props.user.username);
      req.field('docName', file.name);
      req.attach(_newFileName, file, file.name);
    });

    req.end((err, res) => addFile(res.body));

    toastr.success('File has been uploaded', 'File Upload', { timeOut: 1000 });
  };

  render() {

    return (
        <div className="margin-20-top">
          <Dropzone className="drop-zone" multiple={false} onDrop={this.onDrop}>
            <div>File Drop or click to select single file (upload).</div>
          </Dropzone>
        </div>
    );
  }
}

FileZone.propTypes = {
  sourceId: PropTypes.string,
  addFile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,

};

export default FileZone;
