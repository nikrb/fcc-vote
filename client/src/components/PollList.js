import React from 'react';

export default class PollList extends React.Component {
  render = () => {
    const rows = this.props.data.map( (d,i) => {
      return <li key={i} onClick={this.props.onPollClick} name={d.name} >{d.name}</li>
    });
    return (
      <ul>
        {rows}
      </ul>
    );
  };
}
