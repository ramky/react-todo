
import React from 'react'
import {Link} from '../router'

export const TodoFooter = () => {
  return (
    <footer className="footer">
      <span className="todo-count"><strong>0</strong> item left</span>
      <ul className="filters">
        <li>
          <Link to='/'>All</Link>
        </li>
        <li>
          <Link to='/active'>Active</Link>
        </li>
        <li>
          <Link to='/complete'>Complete</Link>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}
