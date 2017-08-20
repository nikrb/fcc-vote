import React from 'react';
import ListItem from './ListItem';

export default class PollVoteForm extends React.Component {
  render = () => {
    const {poll, message} = this.props;
    const options = poll.options.map( (d,i) => {
      return <ListItem key={i} onItemClick={this.props.onOptionSelect} name={d.text} />;
    });
    const style = { color: message.colour};
    return (
      <div className="container" >
        <div style={style}>{message.text}</div>
        <h2>{poll.name}</h2>
        <ul>
          {options}
        </ul>
      </div>
    );
  };
}
