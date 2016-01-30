import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  ChangeList from 'components/Changes/change-list';

/* actions */
import { getChange, getChanges, addChange } from 'actions/actions_changes';
import { setMain } from 'actions/actions_main';


class Changes extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.changes.length > 0) {
      this.props.getChanges(4);
    }
  }

  render() {
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
  return bindActionCreators({ getChange, getChanges, setMain }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Changes);
