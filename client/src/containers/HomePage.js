import React from 'react';
import Actions from './Actions';
import PollList from '../components/PollList';

export default class HomePage extends React.Component {
  state = {
    list: []
  };
  componentWillMount = () => {
    Actions.getAllPolls()
    .then( (response) => {
      this.setState( { list: response});
    });
  };
  render = () => {
    const poll_list = this.state.list.map( (d) => {
      return { text: d.name, link: `site-url.com/${d.name}`};
    });
    return (
      <div className="App">
        <h1>FCC Voting Project</h1>
        <PollList data={poll_list} />
      </div>
    );
  };
}
