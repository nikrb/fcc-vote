import React from 'react';

export default class PollVoteForm extends React.Component {
  render = () => {
    const {name} = this.props;
    return (
      <div>
        {name}
      </div>
    );
  };
}
