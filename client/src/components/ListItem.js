import React from 'react';

export default class ListItem extends React.Component {
  clicked = () => {
    this.props.onItemClick( this.props.name);
  };
  render = () => {
    return (
      <li style={this.props.style} onClick={this.clicked}>{this.props.name}</li>
    );
  };
}
