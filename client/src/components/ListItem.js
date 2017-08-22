import React from 'react';

export default class ListItem extends React.Component {
  clicked = () => {
    this.props.onItemClick( this.props.name);
  };
  onMouseEnter = (e) => {
    if( this.props.onMouseEnter){
      this.props.onMouseEnter( e, this.props.name);
    }
  };
  render = () => {
    return (
      <li style={this.props.style} onClick={this.clicked}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
        {this.props.name}
      </li>
    );
  };
}
