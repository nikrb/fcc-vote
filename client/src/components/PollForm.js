import React from 'react';
import PropTypes from 'prop-types';

export default class PollForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    poll: PropTypes.object,
    new_option: PropTypes.string,
    errors: PropTypes.object
  };
  render = () => {
    const {onSubmit, onChange, poll, errors} = this.props;
    const option_list = poll.options.map( (d,i)=>{
      return <li key={i}>{d.text} ({d.votes})</li>;
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
              value={this.props.new_option} onChange={onChange} />
            <button type="button" onClick={onChange} name="add_option" >+</button>
          </div>
          <div style={{margin:"10px"}}>
            <button type="submit" >Save</button>
          </div>
        </form>
      </div>
    );
  };
}
