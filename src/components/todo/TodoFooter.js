
import React from 'react'
import {Link} from '../router'

const todoCount = (count) => {
  return (
    <span className="todo-count"><strong>{count}</strong> item left</span>
  )
}

const clearCompleted = () => {
  return (
    <button className="clear-completed">Clear completed</button>
  )
}

export const TodoFooter = (props) => {
  return (
    <footer className="footer">
      { todoCount(props.activeTodoCount) }
      <ul className="filters">
        <li><Link to='/'>All</Link></li>
        <li><Link to='/active'>Active</Link></li>
        <li><Link to='/complete'>Complete</Link></li>
      </ul>
      { clearCompleted() }
    </footer>
  )
}
