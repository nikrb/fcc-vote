import React from 'react';
import {Redirect} from 'react-router-dom';
import PollVoteForm from '../components/PollVoteForm';
import PieChart from '../components/charts/Pie';
import Actions from './Actions';
import Auth from '../modules/Auth';
import Tooltip from '../components/Tooltip';

export default class PollPage extends React.Component {
  state = {
    poll: { options: []},
    redirectToHome: false,
    message: {colour: "black", text:"Click an option to vote"},
    tooltip: { text:[], visible: false, pos: {x:0,y:0}}
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
  onMouseEnter = ( e, arc) => {
    const nt = {...this.state.tooltip};
    const option_text = this.state.poll.options[arc.index].text;
    nt.text = [option_text, `votes [${arc.data}]`];
    nt.visible = true;
    // TODO: position tooltip by cursor
    nt.pos = {x:0, y:0}; // e.clientX, y:e.clientY-100};
    this.setState( {tooltip: nt});
  };
  onMouseLeave = (e) => {
    const nt = {...this.state.tooltip};
    nt.visible = false;
    this.setState( {tooltip: nt});
  };
  render = () => {
    if( this.state.redirectToHome){
      return <Redirect to="/" />
    }
    const poll_data = this.state.poll.options.map( (option) => {
      return option.votes.length;
    });
    const tooltip = {display: (this.state.tooltip.visible)?"block":"none",
      left: this.state.tooltip.pos.x,
      top: this.state.tooltip.pos.y,
      padding: "10px"
    };
    const row_first = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    };
    return (
      <div className="container">
        <h2>Voting Page</h2>
        <div style={row_first}>
          <PollVoteForm poll={this.state.poll} onOptionSelect={this.onVote}
            message={this.state.message} />
          <div  style={{position:"relative",margin:"20px"}}>
            <div style={{ height: 200, width: 200 }}>
              <svg height={200} width={200}>
                <g transform={'translate( 100, 100 )'}>
                  <PieChart data={poll_data} onMouseLeave={this.onMouseLeave}
                    onMouseEnter={this.onMouseEnter} />
                </g>
              </svg>
            </div>
            <Tooltip tip_text={this.state.tooltip.text} pos={tooltip} />
          </div>
        </div>
      </div>
    );
  };
}
