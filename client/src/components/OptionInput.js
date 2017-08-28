import React from 'react';

export default class OptionInput extends React.Component {
  componentDidMount = () => {
    this.option_field.focus();
  };
  onAddClick = (e) => {
    this.props.onOptionAdd( this.props.new_option);
    this.option_field.focus();
    this.option_field.select();
  };
  grabNewOptionField = (input) => {
    this.option_field = input;
  };
  render = () => {
    return (
      <div>
        <input type="text" name="new_option" placeholder="new option"
          value={this.props.new_option} onChange={this.props.onChange}
          ref={this.grabNewOptionField} />
        <button type="button" onClick={this.onAddClick} >+</button>
      </div>
    );
  };
}
