import React from 'react';
import {Redirect} from 'react-router-dom';
import * as d3 from 'd3';
import PollVoteForm from '../components/PollVoteForm';
import PieChart from '../components/charts/Pie';
import Actions from './Actions';
import Auth from '../modules/Auth';
import Tooltip from '../components/Tooltip';

export default class PollPage extends React.Component {
  state = {
    poll: { options: []},
    redirectToHome: false,
    message: {colour: "black", text:"Select an option and vote!"},
    tooltip: { text:[], visible: false, pos: {x:0,y:0}},
    highlight_option : -1
  };
  componentWillMount = () => {
    const poll_name = decodeURIComponent( this.props.match.params.name);
    if( poll_name){
      this.getPoll( poll_name);
    } else {
      this.setState( { redirectToHome: "/"});
    }
  };
  getPoll = ( poll_name) => {
      Actions.getPoll( poll_name)
      .then( (response) => {
        this.setState( { poll: response});
      });
  };
  onVote = ( text) => {
    const {name,owner} = this.state.poll;
    let email = null;
    if( Auth.isUserAuthenticated()){
      email = Auth.getEmail();
    }
    this.setState( {message: {text:"Vote submitted ...", colour:"black"}});
    Actions.pollVote( name, owner, text, email)
    .then( (response) => {
      if( response.success){
        this.getPoll( this.state.poll.name);
        this.setState( {message: {text:"Vote registered", colour:"black"}});
      } else {
        this.setState( {message: {text:response.message, colour: "red"}});
      }
    })
    .catch( (err) => {
      console.error( "vote failed:", err);
    });
  };
  onAddOption = (new_option_text) => {
    const {poll} = this.state;
    const no = [...poll.options, {text: new_option_text, votes: []}];
    this.setState( {poll: {...poll, options: no}}, () => {
      Actions.savePoll( this.state.poll)
      .then( (response) => {
        console.log( "save poll (options) response:", response);
      });
    });
  };
  // hover over text list item option
  onMouseEnterOption = (e, name) => {
    const ndx = this.state.poll.options.findIndex( (opt) => {
      if( opt.text === name) return true;
      return false;
    });
    this.setState( {highlight_option: ndx});
  };
  // position cursor inside parent div
  grabPieParentRef = (input) => { this.pie_parent = input; }
  // hover over pie chart segment
  onMouseEnter = ( e, arc) => {
    const box = this.pie_parent.getBoundingClientRect();
    const nt = {...this.state.tooltip};
    const option_text = arc.data.label;
    nt.text = [option_text, `votes [${arc.data.value}]`];
    nt.visible = true;
    nt.pos = {x: e.clientX - box.left, y: e.clientY - box.top};
    this.setState( {tooltip: nt, highlight_option: arc.index});
  };
  onMouseLeave = (e) => {
    const nt = {...this.state.tooltip};
    nt.visible = false;
    this.setState( {tooltip: nt, highlight_option: -1});
  };
  render = () => {
    if( this.state.redirectToHome){
      return <Redirect to="/" />
    }
    const {options} = this.state.poll;
    const poll_data = options.map( (option) => {
      return { value: option.votes.length, label: option.text};
    });
    const colourScale = d3.scaleOrdinal(options.length>10?d3.schemeCategory20:d3.schemeCategory10);

    const tooltip = {display: (this.state.tooltip.visible)?"block":"none",
      left: this.state.tooltip.pos.x,
      top: this.state.tooltip.pos.y,
      padding: "10px"
    };
    const row_first = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "center"
    };
    return (
      <div className="container">
        <h2>Voting Page</h2>
        <div style={row_first}>
          <PollVoteForm poll={this.state.poll} onVoteSubmit={this.onVote}
            message={this.state.message} colourScale={colourScale}
            highlight={this.state.highlight_option}
            onMouseEnterOption={this.onMouseEnterOption}
            onMouseLeave={this.onMouseLeave}
            onAddOption={this.onAddOption} />
          <div ref={this.grabPieParentRef} style={{position:"relative"}}>
            <div style={{ height: 200, width: 200 }}>
              <svg height={200} width={200}>
                <g transform={'translate( 100, 100 )'}>
                  <PieChart data={poll_data} onMouseLeave={this.onMouseLeave}
                    onMouseEnter={this.onMouseEnter} colourScale={colourScale}
                    highlight={this.state.highlight_option} />
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
