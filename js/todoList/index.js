import React from 'react'
import ReactDOM from 'react-dom'

const todoContainer = document.querySelector('#todo-component');
class MyComponent extends React.Component {
    render() {
        return <div>Todo List!!</div>;
    }
}

if (todoContainer) {
    ReactDOM.render(<MyComponent />, todoContainer);
}

