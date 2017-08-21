import React from 'react';
import { arc } from 'd3-shape';

export default class PathArc extends React.Component {
  onMouseEnter = (e) => {
    this.props.onMouseEnter( e, this.props.arc);
  };
  render = () => {
    const a = this.props.arc;
    const arcGen = arc()
      .innerRadius(0)
      .outerRadius(100);

    // const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
    return (<path
      fill="blue"
      stroke={'white'}
      d={arcGen(a)}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.props.onMouseLeave} />
    );
  };
}
