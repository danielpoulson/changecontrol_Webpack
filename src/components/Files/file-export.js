import React from 'react';
import FileList from 'containers/Files/file-list';


class FileExport extends React.Component {
    render() {
        return (
        	<div>
        		File Export Page

    		    <FileList
    		    	export="hidden"/>

        	</div>
			
			);
    }
};

export default FileExport;