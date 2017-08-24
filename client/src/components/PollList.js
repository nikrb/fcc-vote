import React from 'react';
import ListItem from './ListItem';

export default class PollList extends React.Component {
  state = {
    highlighted_item: null
  };
  onPollClick = ( name) => {
    this.props.onPollClick( name);
  };
  onMouseEnter = (e, name) => {
    this.setState( {highlighted_item: name});
  };
  onMouseLeave = ( e) => {
    this.setState( {highlighted_item: null});
  }
  render = () => {
    const wrap_style = {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline"
    };
    const delete_style = {
      background: "red",
      fontSize: "0.8em",
      borderRadius: "100%",
      lineHeight: "1.4em"
    };
    const listyle = {
      listStyle: "none",
      padding: "0.2em"
    };
    const rows = this.props.data.map( (d,i) => {
      const lis = {...listyle,
        color: this.state.highlighted_item === d.name?"darkgrey":"black"
      };
      return (
        <div key={i} style={wrap_style}>{
            this.props.deleteable?
              <button type="button" style={delete_style} name={d.name}
                onClick={this.props.onDeleteClick} >X</button>
              :""
          }
          <ListItem style={lis} onItemClick={this.onPollClick} name={d.name}
            onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
        </div>
      );
    });
    return (
      <ul>
        {rows}
      </ul>
    );
  };
}
