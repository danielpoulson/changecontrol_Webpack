import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import  ChangeList from 'components/Changes/change-list';
import Pagination from 'components/Common/pagination'

/* actions */
import { getChange, getChanges, addChange, loadPage } from 'actions/actions_changes';
import { setMain } from 'actions/actions_main';


class Changes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      paged: {},
      count: 0,
      numPage: 15,
      txtSearch: '',
      showAll: false
    };
    this.searchText= this.searchText.bind(this);
  }

  componentWillMount() {
    if (!this.props.changes.length > 0) {
      this.props.getChanges(4);
    }
  }

  newChange = () => {
    // TODO: Add in the fucntionality for a new change
    this.props.setMain({MainId : null, MainTitle: 'New Change Control', CurrentMode: 'change'});
    this.props.history.push('/change/new');
  };

  exportChange = () => {
      //TODO: The export function should export the displayed list, current exports all
      const info = {fsSource : 'exp', fsAddedBy : window.USER.username, fsType : 'changes'};
      // TODO: export function to create a changes list
      //actions.exportList(info);
  };

  allChanges = () => {
      let _showAll = this.state.showAll;
      _showAll = !_showAll;
      this.setState({showAll:_showAll});

      if (this.state.showAll !== true) {
          this.props.getChanges(5);
      } else {
          this.props.getChanges(4);
      }

      Toastr.success('Only showing active changes - ' + this.state.showAll,'Change Detail', {timeOut: 1000});
  };

  linkClick(i){
    //TODO: BUG (L) Pagination Adding 1 to the page mumber as it uses the base of 0
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({activePage: i});
  }

  onChange = (page_num, searchText) => {
    let action = {};
    action.page_num = page_num || 1;
    action.search = searchText || this.state.txtSearch;
    action.numPage = this.state.numPage;
    // TODO: Write a function for call pages
    this.props.loadPage(action);
  };

  searchText(event){
    let value = event.target.value;
    let field = event.target.name;
    this.setState({activePage: 0});

    this.setState({txtSearch: value});
    this.onChange(0, value);

  }

  render() {
    var _changeTitle = "Register";
    let butText;

    var spanStyle = {
        background: "#71ABFF",
        color: "#FFFFFF",
        border: "1px solid #71ABFF"
    };

    var divStyle = { paddingRight: 15};

    if (this.state.showAll !== true) {
      butText = 'Show all changes';
    } else {
      butText = 'Show Current Changes';
    }

    return (
      <section>

        <div className="row">
           <div className="section-header">
                <div className="col-sm-6 pull-left">
                        <p className="section-header-text-main">Change Control - {_changeTitle} </p>
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

        <div className="row">
          <ChangeList { ...this.props } />
        </div>
        <div className="col-sm-6">
          <button
            className="btn btn-success pull-left"
            onClick={this.newChange} >
            New Change
          </button>
          <button
            className="btn btn-info dp-margin-10-LR"
            onClick={this.exportChange} >
            Export List
          </button>
          <button
            className="btn btn-warning"
            onClick={this.allChanges} >
            {butText}
          </button>
        </div>

        <div className="col-sm-6">
          <Pagination
            activePage = {this.state.activePage}
            numPage = {this.props.changes.per_page}
            count = {this.props.changes.total}
            getPage = {this.linkClick.bind(this)}/>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    changes : state.changes,
    main: state.main
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChange, getChanges, setMain, loadPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Changes);
