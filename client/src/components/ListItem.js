import React from 'react';

export default class ListItem extends React.Component {
  clicked = () => {
    this.props.onItemClick( this.props.name);
  };
  render = () => {
    return (
      <li onClick={this.clicked}>{this.props.name}</li>
    );
  };
}
