import React from 'react';

export default class TodoEditView extends React.Component {
    state = {
        title: this.props.title,
    };
    input = React.createRef();

    componentDidMount() {
        this.focusInput();
    }

    focusInput() {
        this.input.current.focus();
    }

    handlerChangeTitle(e) {
        this.setState({ title: e.target.value });
    }

    handlerSave(done) {
        return async function() {
            const res = await fetch(`/todo/${this.props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                }),
            });

            if (res.ok) {
                done(this.state.title);
            }
        }
    }

    handlerCancel(done) {
        return done;
    }

    render () {
        return (
            <div>
                <input
                    type="text"
                    ref={this.input}
                    className="uk-input uk-form-width-medium uk-form-small"
                    value={this.state.title}
                    onChange={this.handlerChangeTitle.bind(this)}
                />
                <button
                    type="button"
                    className="uk-button uk-button-primary uk-button-small"
                    onClick={this.handlerSave(this.props.saveCb).bind(this)}
                >
                    Ok
                </button>
                <button
                    type="button"
                    className="uk-button uk-button-default uk-button-small"
                    onClick={this.handlerCancel(this.props.cancelCb)}
                >
                    Cancel
                </button>
            </div>
        );
    }
}