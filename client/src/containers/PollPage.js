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
    message: {colour: "black", text:"Click an option to vote"},
    tooltip: { text:[], visible: false, pos: {x:0,y:0}},
    highlight_option : -1
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
  onMouseEnterOption = (e, name) => {
    const ndx = this.state.poll.options.findIndex( (opt) => {
      if( opt.text === name) return true;
      return false;
    });
    this.setState( {highlight_option: ndx});
  };
  onMouseEnter = ( e, arc) => {
    const nt = {...this.state.tooltip};
    const option_text = this.state.poll.options[arc.index].text;
    nt.text = [option_text, `votes [${arc.data}]`];
    nt.visible = true;
    // TODO: position tooltip by cursor
    nt.pos = {x:0, y:0}; // e.clientX, y:e.clientY-100};
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
      return option.votes.length;
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
      flexWrap: "wrap",
      alignItems: "center",
    };
    return (
      <div className="container">
        <h2>Voting Page</h2>
        <div style={row_first}>
          <PollVoteForm poll={this.state.poll} onOptionSelect={this.onVote}
            message={this.state.message} colourScale={colourScale}
            highlight={this.state.highlight_option}
            onMouseEnterOption={this.onMouseEnterOption}
            onMouseLeave={this.onMouseLeave} />
          <div  style={{position:"relative",margin:"20px"}}>
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
