import React from 'react';
import ListItem from './ListItem';

export default class PollVoteForm extends React.Component {
  render = () => {
    const {poll, message, highlight, colourScale} = this.props;
    const options = poll.options.map( (d,i) => {
      const colour = colourScale(i);
      let style = {color: colour, padding:"2px", border:"2px solid white"};
      if( highlight === i){
        style = {...style, border: `2px solid darkgrey`, borderRadius:"4px"};
      }
      return <ListItem key={i} onItemClick={this.props.onOptionSelect}
        style={style} name={d.text} onMouseEnter={this.props.onMouseEnterOption}
        onMouseLeave={this.props.onMouseLeave} />;
    });
    const style = { color: message.colour};
    return (
      <div className="container" >
        <div style={style}>{message.text}</div>
        <h2>{poll.name}</h2>
        <ul>
          {options}
        </ul>
      </div>
    );
  };
}
