import React from 'react';
import {Redirect} from 'react-router-dom';
import PollForm from '../components/PollForm';
import Actions from './Actions';

export default class EditPollPage extends React.Component {
  state ={
    poll: {},
    new_option: "",
    errors: {},
    redirectToList: false
  };
  componentWillMount = () => {
    // get name from uri
    console.log( "edit poll page props:", this.props);
    this.setState( { poll: this.props.location.state.poll});
  };
  processForm = ( e) => {
    console.log( "edit poll process form");
    e.preventDefault();
    Actions.savePoll( this.state.poll)
    .then( (response) => {
      console.log( "save poll response:", response);
      this.setState( {redirectToList: true});
    });
  };
  onAddClick = () => {
    const np = {...this.state.poll};
    const no = { text: this.state.new_option, votes: []};
    const nol = this.state.poll.options.concat( no);
    np.options = nol;
    this.setState( {poll: np});
  };
  onDeleteOption = (option_text) => {
    console.log( "option text:", option_text);
    const new_options = this.state.poll.options.filter( (o) => {
      return o.text !== option_text;
    });
    this.setState( { poll: {...this.state.poll, options: new_options}});
  };
  onChange = ( e) => {
    const field_name = e.target.name;
    const np = {...this.state.poll};
    if( field_name === "new_option"){
      this.setState( {new_option: e.target.value});
    } else {
      np[field_name] = e.target.value;
    }
    this.setState( {poll: np});
  };
  render = () => {
    if( this.state.redirectToList){
      return <Redirect to="/mypolls" />
    }
    return (
      <div className="container">
        <h2>Edit Poll</h2>
        <button type="button" style={{color:"red",background:"steelblue"}} >Delete this poll</button>
        <PollForm onChange={this.onChange} poll={this.state.poll} new_option={this.state.new_option}
          onSubmit={this.processForm} errors={this.state.errors} addButtonClick={this.onAddClick}
          deleteOption={this.onDeleteOption} />
      </div>
    );
  };
}
