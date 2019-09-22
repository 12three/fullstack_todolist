import React from 'react';

export default class CreateTodo extends React.Component {
    state = {
        title: this.props.title,
    };

    handlerSubmit(done) {
        return function(e) {
            e.preventDefault();

            const newTodo = {title: this.state.title};

            fetch('/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            }).then(res => {
                if (res.ok) {
                     this.setState(newTodo);
                     done(null, newTodo);
                }
            });
        }
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
    }

    render() {
        return (
            <form action="/todo" method="post" onSubmit={this.handlerSubmit(this.props.submitCb).bind(this)}>
                <input type="text" name="title" onChange={this.handleChange.bind(this)} />
                <button>
                    Create
                </button>
            </form>
        );
    }
}
