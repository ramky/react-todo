
import React, { Component } from 'react'
import {Link} from '../router'

const todoCount = (count) => {
  return (
    <span className="todo-count"><strong>{count}</strong> item left</span>
  )
}

export class TodoFooter extends Component {
  handleClearCompleted = (event, props) => props.handleClearCompleted(event)

  render () {
    return (
      <footer className="footer">
        { todoCount(this.props.activeTodoCount) }
        <ul className="filters">
          <li><Link to='/'>All</Link></li>
          <li><Link to='/active'>Active</Link></li>
          <li><Link to='/complete'>Complete</Link></li>
        </ul>
        <button className="clear-completed" onClick={(e) => this.handleClearCompleted(e, this.props)}>Clear completed</button>
      </footer>
    )
  }
}
