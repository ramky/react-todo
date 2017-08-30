import React from 'react'
import PropTypes from 'prop-types'

export const TodoHeader = (props) => (
  <header className="header">
    <h1>todos</h1>
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={props.handleInputChange}
        value={props.currentTodo}
        autoFocus />
      </form>
  </header>
)

TodoHeader.propTypes = {
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
