import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* component styles */
import './styles.scss';

@connect(
  state => ({fullname: state.main.user.fullname})
)

export class Header extends Component {

render() {
        const textStyle = {
            color: 'white'
        }


        return (
            <div>
                <div className="topband">
                    <section className="col-sm-12">
                        <div className="col-sm-5">
                            <h3 className="topband_h1">Change Control</h3>
                        </div>
                        <div className="col-sm-7">
                            <h5 style={textStyle} className="pull-right">Welcome: {this.props.fullname} </h5>
                        </div>
                    </section>
                </div>
                <div className="col-sm-12 nav-strip"></div>
            </div>
        );
    }

}
