import React from 'react';
import ListItem from './ListItem';

export default class PollVoteForm extends React.Component {
  render = () => {
    const {poll} = this.props;
    const options = poll.options.map( (d,i) => {
      return <ListItem key={i} onItemClick={this.props.onOptionSelect} name={d.text} />;
    });
    return (
      <div className="container" >
        <h2>{poll.name}</h2>
        <ul>
          {options}
        </ul>
      </div>
    );
  };
}
