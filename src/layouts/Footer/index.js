import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Footer extends Component {

  render() {
    return (
      <footer className={`${styles}`}>
        <div className="container">
          <div className="dpFooter">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              Daniel Poulson (c) 2016
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
