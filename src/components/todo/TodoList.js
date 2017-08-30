import React from 'react'
import {TodoItem} from './TodoItem'
import PropTypes from 'prop-types'

export const TodoList = (props) => {
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {
          props.todos.map(todo =>
              <TodoItem
                handleToggle={props.handleToggle}
                key={todo.id} {...todo} handleRemove={props.handleRemove} />
        )}
      </ul>

    </section>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}
