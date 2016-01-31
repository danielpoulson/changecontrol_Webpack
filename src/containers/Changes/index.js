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
  }

  componentWillMount() {
    if (!this.props.changes.length > 0) {
      this.props.getChanges(4);
    }
  }

  newChange = () => {
    // TODO: Add in the fucntionality for a new change
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
          //actions.getChanges(5);
      } else {
          //actions.getChanges(4);
      }

      toastr.success('Only showing active changes - ' + this.state.showAll,'Change Detail', {timeOut: 1000});
  };

  linkClick(i){
    //TODO: BUG (L) Pagination Adding 1 to the page mumber as it uses the base of 0
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({activePage: i});
  }

  onChange = (page_num, searchText) => {
    var page_num = page_num || 1;
    let search = searchText || this.state.txtSearch;
    // TODO: Write a function for call pages
    this.props.loadPage(page_num, this.state.numPage, search);
  };

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
          <h3>
          Changes - {this.props.main.MainId} - {this.props.main.MainTitle} - {this.props.main.CurrentMode}
          </h3>
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
