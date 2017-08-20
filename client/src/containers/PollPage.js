import React from 'react';
import PollVoteForm from '../components/PollVoteForm';

export default class PollPage extends React.Component {
  render = () => {
    const poll = this.props.location.state.poll;
    console.log( "poll (vote) page:", poll);
    return (
      <div className="container">
        <h2>Voting Page</h2>
        <PollVoteForm poll={poll} />
      </div>
    );
  };
}
