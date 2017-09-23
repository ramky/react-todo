import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock'

const mockResult = [
  { "id": 1, "name": "Setup Server", "isComplete": false },
  { "id": 2, "name": "Start Server", "isComplete": false }
]

describe('App', () => {
  it('renders without crashing', () => {
    fetchMock.getOnce('http://localhost:3001/todos', mockResult)
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
