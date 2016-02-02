import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import TaskList from './TaskList.jsx';
import Input from '../common/textInline.jsx';


let start = 0;

class Tasks extends Component{
    state = {
            activePage: 0,
            paged: {},
            count: 0,
            numPage: 10,
            txtSearch: null
    };

    componentWillMount(){
        this.onChange();
    }

    onChange = (page_num, searchText) => {
        var page_num = page_num || 1;
        var search = searchText || this.state.txtSearch;
        var page_obj = AllTasksStore.search(page_num, this.state.numPage, search);
        this.setState({paged: page_obj.data});
        this.setState({count: page_obj.total});
    }


    linkClick = (i) => {
        //TODO: BUG (L) Pagination Adding 1 to the page mumber as it uses the base of 0
        this.onChange(i + 1, this.state.txtSearch);
        this.setState({activePage: i});

    }

    loadPage(activePage, searchText){
        var perPage = this.state.numPage;
        start = activePage * perPage;
        var paged = [start, start + perPage, searchText];
        actions.searchTask(paged);
    }


    searchText = (event) => {
        var field = event.target.name;
        var value = event.target.value;
        this.setState({activePage: 0});
        this.setState({txtSearch: value});
        this.onChange(0, value);
    }

    exportTask = (event) => {
        event.preventDefault();
        var info = {fsSource : 'exp', fsAddedBy : window.USER.username, fsType : 'tasks'};
        actions.exportList(info);
    }

    render() {

            var spanStyle = {
                background: "#71ABFF",
                color: "#FFFFFF",
                border: "1px solid #71ABFF"
            };

            var divStyle = { paddingRight: 15};

            return (
                <div>
                    <div className="row">
                       <div className="section-header">
                            <div className="col-sm-6 pull-left">
                                    <p className="section-header-text-main">Task List</p>
                            </div>

                            <div className="col-sm-6 pull-right input-group " style={divStyle}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.txtSearch}
                                    onChange={this.searchText}
                                    placeholder="Enter Search Text"/>
                                <span style={spanStyle} className="input-group-addon glyphicon glyphicon-search"></span>

                            </div>
                        </div>
                    </div>


                    <TaskList
                        tasks = {this.state.paged}
                        type = "All"/>


                    <div className="col-sm-6">
                         <button className="btn btn-info" onClick={this.exportTask} >Export List</button>
                    </div>

                    <div className="col-sm-6">
                        <Pagination
                            activePage = {this.state.activePage}
                            numPage = {this.state.numPage}
                            count = {this.state.count}
                            getPage = {this.linkClick}/>
                    </div>


                </div>
                )
    }
};

function mapStateToProps(state) {
  return {
    tasks : state.tasks,
    main: state.main
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
