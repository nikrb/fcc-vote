import React from 'react';

export default class RadioItem extends React.Component {
  onMouseEnter = (e) => {
    this.props.onMouseEnter( e, this.props.value);
  };
  render = () => {
    const {name, value, style} = this.props;
    return (
      <label style={style} onMouseEnter={ this.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
        {value}
        <input type="radio" name={name} value={value}
          onChange={this.props.onChange} checked={this.props.selected} />
      </label>
    );
  };
}
