import React, { Component } from 'react'
import {partial, pipe} from '../../lib/utils'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor(props){
    super(props)
  }

  handleToggle = () => partial(this.props.handleToggle, this.props.id)

  handleRemove = () => partial(this.props.handleRemove, this.props.id)

  render() {
    return (
      <li className={this.props.isComplete ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            onChange={this.handleToggle()}
            checked={this.props.isComplete}
            type="checkbox" />
          <label>{this.props.name}</label>
          <button
            className="destroy"
            onClick={this.handleRemove()}></button>
        </div>
        <input className="edit" value={this.props.name} />
      </li>
    )
  }
}

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
}

export default TodoItem;
