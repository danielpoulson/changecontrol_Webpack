import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import TaskList from 'components/Tasks/task-list';
import Pagination from 'components/Common/pagination';
import Input from 'components/Common/form-text-input';

/* actions */
import { getAllTasks, loadPageTask } from 'actions/actions_tasks';

// TODO: Changes and Task share the same search text box function which should be made as a common component
let start = 0;

@connect(state=>({tasks : state.tasks}), { getAllTasks, loadPageTask })

export default class Tasks extends Component{
    state = {
            activePage: 0,
            paged: {},
            count: 0,
            numPage: 10,
            txtSearch: null
    };

    componentWillMount(){
      if (!this.props.tasks.alldata.length > 0) {
        this.props.getAllTasks();
      }
      // TODO: Sticky options on the change list
      // This section should remember you page and or serach options.
      this.onChange();
    }

    onChange = (page_num, searchText) => {
      let action = {};
      action.page_num = page_num || 1;
      action.search = searchText || this.state.txtSearch;
      action.numPage = this.state.numPage;
      this.props.loadPageTask(action);
    };


    linkClick = (i) => {
        //TODO: BUG (L) Pagination Adding 1 to the page mumber as it uses the base of 0
        this.onChange(i + 1, this.state.txtSearch);
        this.setState({activePage: i});

    };

    // loadPage(activePage, searchText){
    //     var perPage = this.state.numPage;
    //     start = activePage * perPage;
    //     var paged = [start, start + perPage, searchText];
    //     actions.searchTask(paged);
    // };


    searchText = (event) => {
      let value = event.target.value;
      let field = event.target.name;
      this.setState({activePage: 0});
      this.setState({txtSearch: value});
      this.onChange(0, value);
    };

    exportTask = (event) => {
        event.preventDefault();
        var info = {fsSource : 'exp', fsAddedBy : window.USER.username, fsType : 'tasks'};
        actions.exportList(info);
    };

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
                        tasklist = {this.props.tasks.paged}
                        type = "All"/>


                    <div className="col-sm-6">
                         <button className="btn btn-info" onClick={this.exportTask} >Export List</button>
                    </div>

                    <div className="col-sm-6">
                        <Pagination
                          activePage = {this.state.activePage}
                          numPage = {this.props.tasks.per_page}
                          count = {this.props.tasks.total}
                          getPage = {this.linkClick.bind(this)}/>
                    </div>


                </div>
                )
    }
};
