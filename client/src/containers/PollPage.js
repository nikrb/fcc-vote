import React from 'react';
import {Redirect} from 'react-router-dom';
import PollVoteForm from '../components/PollVoteForm';
import Actions from './Actions';
import Auth from '../modules/Auth';

export default class PollPage extends React.Component {
  state = {
    poll: { options: []},
    redirectToHome: false,
    message: {colour: "black", text:"Click an option to vote"}
  };
  componentWillMount = () => {
    const poll_name = decodeURIComponent( this.props.match.params.name);
    if( poll_name){
      Actions.getPoll( poll_name)
      .then( (response) => {
        this.setState( { poll: response});
      })
    } else {
      this.setState( { redirectToHome: "/"});
    }
  };
  onVote = ( text) => {
    console.log( "vote option:", text);
    let email = null;
    if( Auth.isUserAuthenticated()){
      email = Auth.getEmail();
    }
    Actions.pollVote( this.state.poll.name, text, email)
    .then( (response) => {
      if( response.success){
        this.setState( {message: {text:"Vote registered", colour:"black"}});
      } else {
        this.setState( {message: {text:response.message, colour: "red"}});
      }
    });
  };
  render = () => {
    if( this.state.redirectToHome){
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <h2>Voting Page</h2>
        <PollVoteForm poll={this.state.poll} onOptionSelect={this.onVote}
          message={this.state.message} />
      </div>
    );
  };
}
