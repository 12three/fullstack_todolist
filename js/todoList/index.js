import React from 'react';
import ReactDOM from 'react-dom';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

const todoContainer = document.querySelector('#todo-component');
class TodoList extends React.Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        this.refreshTodos()
    }

    async refreshTodos() {
        const response = await fetch('/todo');
        const todos = await response.json();

        if (todos && Array.isArray(todos)) {
            this.setState({ todos });
        }
    }

    submitCb(todo) {
        this.refreshTodos()
    };

    removeTodoCb(todoId) {
        this.setState({
            todos: this.state.todos.filter(({ _id }) => _id !== todoId),
        });
    }

    render() {
        const todos = this.state.todos.map(todo => (
            <Todo data={todo} key={todo._id} removeTodoCb={this.removeTodoCb.bind(this)} />
        ));

        return (
            <div>
                <ul className="uk-list">{todos}</ul>
                <CreateTodo submitCb={this.submitCb.bind(this)} />
            </div>
        );
    }
}

if (todoContainer) {
    ReactDOM.render(<TodoList />, todoContainer);
}

