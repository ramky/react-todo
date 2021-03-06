import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {partial} from '../../lib/utils'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends Component {
  state = {
    editText: ""
  }

  getInitialState = () => { return {editText: this.props.name} }

  handleToggle = () => partial(this.props.handleToggle, this.props.id)

  handleRemove = () => partial(this.props.handleRemove, this.props.id)

  handleEdit = () => partial(this.props.handleEdit, this.props.id)

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleSubmit = (event) => 
    this.props.handleUpdate(this.props.id, this.state.editText, event)

  handleChange = (event) => {
		if (this.props.editing) {
			this.setState({editText: event.target.value});
		}
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.setState({editText: this.props.name})
      var node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    return (
      <li className={classNames({
        completed: this.props.isComplete,
        editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            onChange={this.handleToggle()}
            checked={this.props.isComplete}
            type="checkbox" />
          <label onDoubleClick={this.handleEdit()}>{this.props.name}</label>
          <button
            className="destroy"
            onClick={this.handleRemove()} />
        </div>
        <input
          className="edit"
          value={this.state.editText}
          ref="editField"
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
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
