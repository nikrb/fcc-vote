import React from 'react';
import ListItem from './ListItem';

export default class PollList extends React.Component {
  onPollClick = ( name) => {
    this.props.onPollClick( name);
  };
  render = () => {
    const rows = this.props.data.map( (d,i) => {
      return <ListItem key={i} onItemClick={this.onPollClick} name={d.name} />;
    });
    return (
      <ul>
        {rows}
      </ul>
    );
  };
}
