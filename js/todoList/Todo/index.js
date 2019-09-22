import React from 'react';
import noop from 'none';

export default class Todo extends React.Component {
    state = {
        isEdit: false,
        title: this.props.data.title,
        id: this.props.data._id,
    };

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

    render() {
        const regularView = (
            <div>
                {this.state.title}
                <button type="button" onClick={this.handleRemove(this.props.removeTodoCb).bind(this)}>
                    Remove
                </button>
                <button type="button" onClick={this.toggleEditClick(noop).bind(this)}>
                    Edit
                </button>
            </div>
        );

        const editView = (
            <div>
                <input type="text" value={this.state.title} onChange={this.handlerEditTitle.bind(this)} />
                <button type="button" onClick={this.toggleEditClick(this.changeTitleCb.bind(this)).bind(this)}>
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