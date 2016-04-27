import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import { myData } from './data';
import './styles.scss'

export default class LineGraph extends Component{

  componentDidMount(){
    this.updateChart();
  }

  updateChart(){
    var margin = {top: 30, right: 20, bottom: 30, left: 50};
    var w = 500 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;
    var data = myData;

    var dates = _.map(data, 'date');
    var counts = _.map(data, 'count');

    var x = d3.scale.ordinal()
      .rangePoints([0, w]);

    var y = d3.scale.linear()
      .range([h, 0]);

    var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    var line = d3.svg.line()
      .interpolate('linear')
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.count);
      });

    var svg = d3
      .select('#chart')
      .append('svg')
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data
    x.domain(dates);
    y.domain([0, 40]);

    var path = svg.append("path")
      .attr("d", line(data));

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

    svg.append("g")         // Add the X Axis
        .attr("class", "axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")         // Add the Y Axis
      .attr("class", "axis")
      .call(yAxis);

  }


  render(){
  			return <div id="chart"></div>
  		}
}
