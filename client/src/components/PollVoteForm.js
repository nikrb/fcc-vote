import React from 'react';
import RadioItem from './RadioItem';
import OptionInput from './OptionInput';

export default class PollVoteForm extends React.Component {
  state = {
    enabled: false,
    selected_option: null,
    add_option_enabled: true,
    show_add_option: false,
    new_option_text: ""
  };
  onChangeOption = (e) => {
    console.log( "option changed:", e.target.value);
    this.setState( { enabled: true, selected_option: e.target.value});
  };
  onSubmit = (e) => {
    this.props.onVoteSubmit( this.state.selected_option);
    this.setState( {add_option_enabled: false});
  };
  onNewOptionChange = (e) => {
    this.setState( {new_option_text: e.target.value});
  };
  onShowAddOption = () => {
    this.setState( { show_add_option: true});
  };
  onAddOption = (e) => {
    this.props.onAddOption( this.state.new_option_text);
  };
  onAddOptionDone = () => {
    this.setState( {new_option_text: "", show_add_option: false});
  };
  render = () => {
    const {poll, message, highlight, colourScale} = this.props;
    const options = poll.options.map( (d,i) => {
      const colour = colourScale(i);
      let style = {color: colour, padding:"2px", border:"2px solid white"};
      if( highlight === i){
        style = {...style, border: `2px solid darkgrey`, borderRadius:"4px"};
      }
      return (
        <RadioItem key={i} style={style} name="vote_options" value={d.text}
          selected={d.text === this.state.selected_option}
          onChange={this.onChangeOption}
          onMouseEnter={this.props.onMouseEnterOption}
          onMouseLeave={this.props.onMouseLeave} />
      );
    });
    const style = { color: message.colour};
    const add_style = {
      fontSize: "0.8em"
    };
    return (
      <div className="container" >
        <div style={style}>
          {message.text}
          {this.state.show_add_option || !this.state.add_option_enabled
            || !this.props.allowAddOption ?
              ""
            : <button type="button" style={add_style} onClick={this.onShowAddOption}>
                Add Option
              </button>
          }
        </div>
        <h2>{poll.name}</h2>
        <div>
          {options}
          {this.state.show_add_option?
            <div>
              <OptionInput value={this.state.new_option_text} onChange={this.onNewOptionChange}
                onOptionAdd={this.onAddOption} />
              <button type="button" onClick={this.onAddOptionDone} >Done</button>
            </div>
            :<button type="button" disabled={!this.state.enabled} onClick={this.onSubmit} >
              Vote!
            </button>
          }
        </div>
      </div>
    );
  };
}
