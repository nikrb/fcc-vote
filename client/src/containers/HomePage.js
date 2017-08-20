import React from 'react';
import {Redirect} from 'react-router-dom';
import Actions from './Actions';
import PollList from '../components/PollList';

export default class HomePage extends React.Component {
  state = {
    list: [],
    redirectToPoll: false
  };
  componentWillMount = () => {
    Actions.getAllPolls()
    .then( (response) => {
      this.setState( { list: response});
    });
  };
  pollSelected = ( poll_name) => {
    this.setState( {redirectToPoll: "/poll/"+encodeURIComponent( poll_name) });
  };
  render = () => {
    if( this.state.redirectToPoll !== false){
      return <Redirect to={this.state.redirectToPoll} />;
    }
    return (
      <div className="App">
        <h1>FCC Voting Project</h1>
        <PollList data={this.state.list} onPollClick={this.pollSelected} />
      </div>
    );
  };
}
