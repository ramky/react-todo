import React from 'react'
import {partial} from '../../lib/utils'
import PropTypes from 'prop-types'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <li className={props.isComplete ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          onChange={handleToggle}
          checked={props.isComplete}
          type="checkbox" />
        <label>{props.name}</label>
        <button
          className="destroy"
          onClick={handleRemove}></button>
      </div>
    </li>

  )
}

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
}
