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
    let ptx1 = 20*Math.cos( a.startAngle-Math.PI/2 + da);
    let ptx2 = 90*Math.cos( a.startAngle-Math.PI/2 + da);
    let pty1 = 20*Math.sin( a.startAngle-Math.PI/2 + da);
    let pty2 = 90*Math.sin( a.startAngle-Math.PI/2 + da);
    if( a.startAngle + da > Math.PI){
      let t = ptx1;
      ptx1 = ptx2;
      ptx2 = t;
      t = pty1;
      pty1 = pty2;
      pty2 = t;
    }
    const path_text = `M${ptx1},${pty1} L${ptx2},${pty2}`;
    const path_id = "apath"+a.index;
    return (
      <g>
        <path
          fill={colour}
          stroke={stroke_colour}
          strokeWidth={2}
          d={arcGen( this.props.arc)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave} />
        <defs>
          <path id={path_id} d={path_text} />
        </defs>
        <text style={label_style} dy="0.35em">
          <textPath d={path_text} xlinkHref={"#"+path_id} >
            {this.props.arc.data.label}
          </textPath>
        </text>
      </g>
    );
  };
}
