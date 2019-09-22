import React from 'react';

export default class CreateTodo extends React.Component {
    state = {
        title: this.props.title,
    };

    handlerSubmit(done) {
        return async function(e) {
            e.preventDefault();

            const title = this.state.title;

            if (title) {
                const newTodo = {title};

                const res = await fetch('/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTodo),
                })
                if (res.ok) {
                    this.setState({ title: '' });
                    done(null, newTodo);
                }
            }
        }
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
    }

    render() {
        return (
            <form action="/todo" method="post" onSubmit={this.handlerSubmit(this.props.submitCb).bind(this)}>
                <input
                    type="text"
                    name="title"
                    className="uk-input uk-form-width-large"
                    value={this.state.title}
                    onChange={this.handleChange.bind(this)}
                />
                <button className="uk-button uk-button-primary">Create</button>
            </form>
        );
    }
}
