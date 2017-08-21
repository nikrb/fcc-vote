// from https://github.com/bgrsquared/d3-v4-playground/blob/master/app/GUI/d3ShapeOnly/shapes/pie.js
import React from 'react';
import { pie } from 'd3-shape';
import PathArc from './PathArc';

export default class Pie extends React.Component {
  render = () => {
    const arcs = pie()( this.props.data);
    console.log( this.props.data, arcs);
    return (<g>
      { arcs.map((a, i) => {
          return <PathArc key={i} arc={a} onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}/>;
        })
      }
      </g>
    );
  };
};
