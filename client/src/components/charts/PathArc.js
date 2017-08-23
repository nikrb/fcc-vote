import React from 'react';
import { arc } from 'd3-shape';

export default class PathArc extends React.Component {
  onMouseEnter = (e) => {
    this.props.onMouseEnter( e, this.props.arc);
  };
  render = () => {
    const arcGen = arc()
      .innerRadius(0)
      .outerRadius(95)
      // .padAngle(0.03)
      .cornerRadius(5);

    const colour = this.props.colourScale( this.props.arc.index);
    const stroke_colour = this.props.highlight===this.props.arc.index?"darkgrey":"white";
    const label_style = {
      fontSize: "12px",

    };
    const t = arcGen( this.props.arc);
    console.log( this.props.arc, t);
    const a = this.props.arc;
    const tang = a.startAngle + Math.abs(a.endAngle-a.startAngle)/2;
    console.log( "text angle:", tang);
    const text_transform = "rotate( "+a.startAngle*180/Math.PI+")";
    // const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
    return (
      <g>
        <path
          fill={colour}
          stroke={stroke_colour}
          strokeWidth={2}
          d={arcGen( this.props.arc)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave} />
        <text style={label_style} transform={text_transform}>
          {this.props.arc.data.label}
        </text>
      </g>
    );
  };
}
