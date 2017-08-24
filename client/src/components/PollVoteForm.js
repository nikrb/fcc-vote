import React from 'react';
import RadioItem from './RadioItem';

export default class PollVoteForm extends React.Component {
  state = {
    enabled: false,
    selected_option: null
  };
  onChangeOption = (e) => {
    console.log( "option changed:", e.target.value);
    this.setState( { enabled: true, selected_option: e.target.value});
  };
  onSubmit = (e) => {
    this.props.onVoteSubmit( this.state.selected_option);
  };
  render = () => {
    const {poll, message, highlight, colourScale} = this.props;
    const options = poll.options.map( (d,i) => {
      const colour = colourScale(i);
      let style = {color: colour, padding:"2px", border:"2px solid white"};
      if( highlight === i){
        style = {...style, border: `2px solid darkgrey`, borderRadius:"4px"};
      }
      // return <ListItem key={i} onItemClick={this.props.onOptionSelect}
      //   style={style} name={d.text} onMouseEnter={this.props.onMouseEnterOption}
      //   onMouseLeave={this.props.onMouseLeave} />;
      return (
        <RadioItem key={i} style={style} name="vote_options" value={d.text}
          selected={d.text === this.state.selected_option}
          onChange={this.onChangeOption}
          onMouseEnter={this.props.onMouseEnterOption}
          onMouseLeave={this.props.onMouseLeave} />
      );
    });
    const style = { color: message.colour};
    return (
      <div className="container" >
        <div style={style}>{message.text}</div>
        <h2>{poll.name}</h2>
        <div>
          {options}
          <button type="button" disabled={!this.state.enabled} onClick={this.onSubmit} >
            Vote!
          </button>
        </div>
      </div>
    );
  };
}
