import React from 'react';
import FileList from 'containers/Files/file-list';

const FileExport = () => (
  <div>
    File Export Page
    <FileList
      export="hidden" />
  </div>
);

export default FileExport;
