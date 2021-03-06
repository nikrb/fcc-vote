// from https://github.com/bgrsquared/d3-v4-playground/blob/master/app/GUI/d3ShapeOnly/shapes/pie.js
import React from 'react';
import * as d3 from 'd3';
// import { pie } from 'd3-shape';
import PathArc from './PathArc';

export default class Pie extends React.Component {
  render = () => {
    const all_arcs = d3.pie()
      .sort(null)
      .value(function(d) { return d.value; }) (this.props.data);
    // remove option arcs with zero votes
    const arcs = all_arcs.filter( d => d.value !== 0);

    return (<g>
      {arcs.length ?
        arcs.map((a, i) => {
          return <PathArc key={i} arc={a} box={this.props.box}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            colourScale={this.props.colourScale}
            highlight={this.props.highlight} />;
        })
        :<text >No Votes!</text>
      }
      </g>
    );
  };
};
