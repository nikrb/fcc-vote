import React from 'react';
import { arc } from 'd3-shape';

export default class PathArc extends React.Component {
  state = {
    font_size: "1"
  };
  componentDidMount = () => {
    const {width} = this.props.box;
    const bbox = this.segment_text.getBBox();
    const padded_width = width*0.8;
    if( bbox.width > padded_width/2){
      const r = padded_width/2/bbox.width;
      if( r < 1){
        this.setState( {font_size: r.toFixed(1)});
      }
    }
  };
  onMouseEnter = (e) => {
    this.props.onMouseEnter( e, this.props.arc);
  };
  grabSegmentText = ele => this.segment_text = ele;
  render = () => {
    const box_width = this.props.box.width;
    const arcGen = arc()
      .innerRadius(0)
      .outerRadius( box_width/2*0.95)
      // .padAngle(0.03)
      .cornerRadius(5);

    const a = this.props.arc;
    const colour = this.props.colourScale( a.index);
    const stroke_colour = this.props.highlight===this.props.arc.index?"darkgrey":"white";
    const label_style = {
      fontSize: this.state.font_size+"em",
      pointerEvents: "none"
    };
    const label_offset = (this.state.font_size * 0.35).toFixed(2) + "em";
    const da = (a.endAngle-a.startAngle)/2;
    let ptx = box_width/2*0.9*Math.cos( a.startAngle-Math.PI/2 + da);
    let pty = box_width/2*0.9*Math.sin( a.startAngle-Math.PI/2 + da);
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
        <text style={label_style} dy={label_offset} ref={this.grabSegmentText}
                          transform={transform} textAnchor={text_anchor}>
          {this.props.arc.data.label}
        </text>
      </g>
    );
  };
}
