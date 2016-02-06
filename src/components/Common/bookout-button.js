import React from 'react';
import toastr from 'toastr';

export default class BookoutButton extends React.Component{

    render() {

        var text, action, classButton, classSpan;

        if (this.props.fsBooked > 0) {
            if (window.USER.role === 'admin'){

                text = 'Delete';
                action = this.deleteFile;
                classButton = "btn btn-danger btn-xs";
                classSpan = "glyphicon glyphicon-trash";

            } else {

                text = 'Booked Out';
                classButton = "btn btn-danger btn-xs";
                classSpan = "glyphicon glyphicon-trash disabled";

            }

        } else {
            text = 'Book out';
            action = this.onBookout;
            classButton = "btn btn-warning btn-xs";
            classSpan = "glyphicon glyphicon-book";
        }

        return <button onClick={action} className={classButton}><span className={classSpan}></span> {text} </button>
    }

    onBookout = () => {
        //TODO: If download does not complete donot delete from server.
        if(window.ActiveXObject || "ActiveXObject" in window){
            // Always true if browser is Internet Explorer
            toastr.error('This function does not work with internet explorer. Please contact your administrator','Error - Internet Explorer', {timeOut: 5000});
        } else {
            var _log = {CC_No: this.props.source, CC_Id : 4, CC_Action : `File booked out - ${this.props.fileLoad}`,
                    CC_ActDept : window.USER.dept, CC_ActBy : window.USER.fullname, CC_ActDate : new Date()};

            window.location.href = '/server/upload/' + this.props.fileLoad;

            this.props.createLog(_log);
            this.props.bookoutFile(this.props.fileId);

        }
    };
    // TODO: Implement delete functionality to remove files
    deleteFile = () => {
        //actions.deleteFile(this.props.fileId);
    };
};
