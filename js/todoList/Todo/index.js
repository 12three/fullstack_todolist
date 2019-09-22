import React from 'react';
import noop from 'none';

export default class Todo extends React.Component {
    state = {
        isEdit: false,
        title: this.props.data.title,
        id: this.props.data._id,
        done: this.props.data.done,
    };
    input = React.createRef();

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEdit && this.state.isEdit) {
            this.focusEditInput();
        }
    }

    handleRemove(done) {
        return async function() {
            await fetch(`/todo/${this.state.id}`, { method: 'DELETE' });

            done(this.state.id);
        };
    }

    changeTitleCb() {
        fetch(`/todo/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title
            }),
        });
    }

    toggleEditClick(done) {
        return function() {
            const isEdit = !this.state.isEdit

            this.setState({ isEdit });
            done(isEdit);
        }
    }

    handlerEditTitle(e) {
        this.setState({ title: e.target.value });
    }

    async handlerDoneChange(e) {
        const res = await fetch(`/todo/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                done: !this.state.done,
            }),
        });

        if (res.ok) {
            this.setState({ done: !this.state.done });
        }
    }

    focusEditInput() {
        this.input.current.focus();
    }

    render() {
        const regularView = (
            <div>
                <input
                    className="uk-checkbox"
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.handlerDoneChange.bind(this)}
                    style={{ 'marginRight': '10px' }}
                ></input>
                <span
                    onDoubleClick={this.toggleEditClick(noop).bind(this)}
                    className={this.state.done ? 'uk-text-muted' : 'uk-text-emphasis'}
                    style={{
                        marginRight: '10px',
                        textDecoration: this.state.done ? 'line-through' : 'none',
                    }}
                >
                    {this.state.title}
                </span>
                <span
                    uk-icon="trash"
                    className="uk-icon-link"
                    onClick={this.handleRemove(this.props.removeTodoCb).bind(this)}
                ></span>
                <span uk-icon="pencil" className="uk-icon-link" onClick={this.toggleEditClick(noop).bind(this)}></span>
            </div>
        );

        const editView = (
            <div>
                <input
                    type="text"
                    ref={this.input}
                    className="uk-input uk-form-width-medium uk-form-small"
                    value={this.state.title}
                    onChange={this.handlerEditTitle.bind(this)}
                />
                <button
                    type="button"
                    className="uk-button uk-button-primary uk-button-small"
                    onClick={this.toggleEditClick(this.changeTitleCb.bind(this)).bind(this)}
                >
                    Ok
                </button>
            </div>
        );

        return (
            <li>
                { this.state.isEdit ? editView : regularView }
            </li>
        );
    }
}