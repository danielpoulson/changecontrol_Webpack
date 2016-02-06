import React, { Component } from 'react';
import { connect } from 'react-redux';
/* component styles */
import { styles } from './styles.scss';
import { setUser } from 'actions/actions_main';

@connect(null, {setUser})

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    setTimeout(() => {
      const user = window.USER;
      this.props.setUser(user);
    }, 500);
  }

  render() {

    return (
      <section>
        <div className={`${styles}`}></div>
      </section>

    );
  }
}
