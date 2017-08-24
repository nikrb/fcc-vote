import React from 'react';
import {Redirect} from 'react-router-dom';
import Auth from '../modules/Auth';
import Actions from './Actions';
import PollList from '../components/PollList';

export default class MyPollsPage extends React.Component {
  state = {
    list: [],
    poll: {},
    redirectToEditPollPage: false
  };
  componentWillMount = () => {
    Actions.getMyPolls( {owner: Auth.getEmail()})
    .then( (response) => {
      console.log( response);
      this.setState( { list: response});
    });
  };
  createPoll = () => {
    this.setState( { redirectToEditPollPage: true, poll: {name:"unnamed", options:[]}});
  };
  onPollClick = ( name) => {
    const ep = this.state.list.filter( p => p.name === name);
    if( ep.length === 0){
      console.error( `Find poll [${name}] failed`);
    } else {
      this.setState( { redirectToEditPollPage: true, poll: ep[0]});
    }
  };
  onDeleteClick = (e) => {
    console.log( "delete poll:", e.target.name);
    const poll = this.state.list.find( (p) => { return p.name === e.target.name});
    if( poll && poll._id){
      Actions.deletePoll( poll._id)
      .then( (response) => {
        console.log( "poll delete response:", response);
      })
      .catch( (err) => {
        console.error( "poll delete failed:", err);
      });
    } else {
      console.error( "find poll failed:", e.target.name);
    }
  };
  render = () => {
    if( this.state.redirectToEditPollPage){
      return <Redirect to={{
        pathname: '/editpoll',
        state: { poll: this.state.poll }
      }} />;
    }
    return (
      <div className="container">
        <h1>My Polls</h1>
        <button onClick={this.createPoll}>New Poll</button>
        <PollList data={this.state.list} onPollClick={this.onPollClick}
          onDeleteClick={this.onDeleteClick} deleteable={true}/>
      </div>
    );
  };
}
