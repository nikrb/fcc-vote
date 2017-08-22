import React from 'react';
import { arc } from 'd3-shape';

export default class PathArc extends React.Component {
  state = {
    highlight: false
  };
  onMouseEnter = (e) => {
    this.setState( {highlight: true});
    this.props.onMouseEnter( e, this.props.arc);
  };
  onMouseLeave = (e) => {
    this.setState( {highlight: false});
    this.props.onMouseLeave(e);
  };
  render = () => {
    const arcGen = arc()
      .innerRadius(0)
      .outerRadius(95)
      .padAngle(0.03)
      .cornerRadius(5);

    const colour = this.props.colourScale( this.props.arc.index);
    const stroke_colour = this.state.highlight?"darkgrey":"white";
    // const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
    return (<path
      fill={colour}
      stroke={stroke_colour}
      strokeWidth={2}
      d={arcGen( this.props.arc)}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave} />
    );
  };
}
