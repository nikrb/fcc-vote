import React from 'react';
import { arc } from 'd3-shape';

export default class PathArc extends React.Component {
  onMouseEnter = (e) => {
    this.props.onMouseEnter( e, this.props.arc);
  };
  render = () => {
    const arcGen = arc()
      .innerRadius(0)
      .outerRadius(100)
      .padAngle(0.03)
      .cornerRadius(5);

    const colour = this.props.colourScale( this.props.arc.index);

    // const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
    return (<path
      fill={colour}
      stroke={'white'}
      d={arcGen( this.props.arc)}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.props.onMouseLeave} />
    );
  };
}
