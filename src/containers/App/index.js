import React, { Component } from 'react';
/* global styles for app */

import 'scss/bootstrap/css/bootstrap.min.css';
import 'scss/font-awesome-4.5.0/css/font-awesome.min.css';
import 'scss/toastr.scss';
import 'scss/styles.scss';


/* application components */
import { Header } from 'layouts/Header';
import { Footer } from 'layouts/Footer';
import { Navigation } from 'layouts/Navigation';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="col-sm-2 dp-side-nav">
            <Navigation />
          </div>
          <div className="col-sm-10">
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}
