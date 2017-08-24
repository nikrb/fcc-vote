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

    const a = this.props.arc;
    const colour = this.props.colourScale( a.index);
    const stroke_colour = this.props.highlight===this.props.arc.index?"darkgrey":"white";
    const label_style = {
      fontSize: "14px"
    };
    const da = (a.endAngle-a.startAngle)/2;
    let ptx = 90*Math.cos( a.startAngle-Math.PI/2 + da);
    let pty = 90*Math.sin( a.startAngle-Math.PI/2 + da);
    let text_anchor;
    let tang;
    if( a.startAngle + da > Math.PI){
      tang = (a.startAngle-Math.PI/2 + da - Math.PI) * 180/Math.PI;
      text_anchor = "start";
    } else {
      tang = (a.startAngle-Math.PI/2 + da) * 180/Math.PI;
      text_anchor = "end";
    }
    const transform = `translate( ${ptx},${pty})rotate( ${tang})`;
    return (
      <g>
        <path
          fill={colour}
          stroke={stroke_colour}
          strokeWidth={2}
          d={arcGen( this.props.arc)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave} />
        <text style={label_style} dy="0.35em"
                          transform={transform} textAnchor={text_anchor}>
          {this.props.arc.data.label}
        </text>
      </g>
    );
  };
}
