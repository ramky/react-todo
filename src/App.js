import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import './App.css'
import {TodoHeader, TodoList, TodoFooter} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'

import '../node_modules/todomvc-app-css/index.css'

class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    editing: false
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos, editing: false})
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'))
  }

  handleEdit = (id, evt) => {
    evt.preventDefault()
    this.setState({editing: id})
  }

  handleUpdate = (id, name, evt) => {
    const todo = findById(id, this.state.todos)
    const updated = {...todo, name: name}
    const updatedTodos = updateTodo(this.state.todos, updated)
    this.setState({todos: updatedTodos, editing: false})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos, editing: false})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: '',
      editing: false
    })
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name',
      editing: false
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    var activeTodoCount = this.state.todos.reduce(function (accum, todo) {
      return todo.isComplete ? accum : accum + 1;
    }, 0);

    return (
        <section className="todoapp">
          <TodoHeader
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler} />

            <TodoList
              handleToggle={this.handleToggle}
              todos={displayTodos}
              handleRemove={this.handleRemove}
              handleEdit={this.handleEdit}
              handleUpdate={this.handleUpdate}
              editing={this.state.editing} />

            <TodoFooter
              activeTodoCount={activeTodoCount} />
        </section>
    );
  }
}

export default App;
