import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

export default class PollForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    poll: PropTypes.object,
    new_option: PropTypes.string,
    errors: PropTypes.object
  };
  onAddClick = (e) => {
    this.props.addButtonClick();
    this.option_field.focus();
    this.option_field.select();
  };
  render = () => {
    const {onSubmit, onChange, poll, errors} = this.props;
    const option_list = poll.options.map( (d,i)=>{
      return <ListItem key={i} onItemClick={this.props.deleteOption} name={d.text} />;
    });
    return (
      <div className="container" >
        <form action="/" onSubmit={onSubmit} >
          <h2>New Poll</h2>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <label>Name
            <div className="error-wrap">
              {errors.name && <p className="error-field">{errors.name}</p>}
              <input type="text" name="name" value={poll.name} onChange={onChange} />
            </div>
          </label>
          <div>
            Options
          </div>
          <div>
            {option_list}
            <input type="text" name="new_option" placeholder="new option"
              value={this.props.new_option} onChange={onChange}
              ref={(input) => { this.option_field = input;}} />
            <button type="button" onClick={this.onAddClick} >+</button>
          </div>
          <div style={{margin:"10px"}}>
            <button type="submit" >Save</button>
          </div>
        </form>
      </div>
    );
  };
}
