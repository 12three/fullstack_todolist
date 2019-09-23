import React from 'react';

export default class TodoRegularView extends React.Component {
    state = {
        done: this.props.done
    }

    async handlerChangeDoneStatus(e) {
        const res = await fetch(`/todo/${this.props.id}`, {
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

    handleRemove(done) {
        return async function() {
            const res = await fetch(`/todo/${this.state.id}`, { method: 'DELETE' });

            if (res.ok) {
                done(this.state.id);
            }
        };
    }

    render () {
        return (
            <div>
                <input
                    className="uk-checkbox"
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.handlerChangeDoneStatus.bind(this)}
                    style={{ marginRight: '10px' }}
                ></input>
                <span
                    onDoubleClick={this.props.onEdit}
                    className={this.done ? 'uk-text-muted' : 'uk-text-emphasis'}
                    style={{
                        marginRight: '10px',
                        textDecoration: this.done ? 'line-through' : 'none',
                    }}
                >
                    {this.props.title}
                </span>
                <span
                    uk-icon="trash"
                    className="uk-icon-link"
                    onClick={this.handleRemove(this.props.onRemove).bind(this)}>
                </span>
                <span uk-icon="pencil" className="uk-icon-link" onClick={this.props.onEdit}></span>
            </div>
        );
    }
}
