import React from 'react';
import TodoEditView from './TodoEditView';
import TodoRegularView from './TodoRegularView';

export default class Todo extends React.Component {
    state = {
        title: this.props.data.title,
        id: this.props.data._id,
        done: this.props.data.done,
        isEdit: false,
    };

    handlerSaveTitle(title) {
        this.setState({ title, isEdit: false });
    }

    handlerStartEdit() {
        this.setState({ isEdit: true });
    }

    handlerFinishEdit() {
        this.setState({ isEdit: false });
    }

    render() {
        return (
            <li>
                {this.state.isEdit ? (
                    <TodoEditView
                        title={this.state.title}
                        id={this.state.id}
                        saveCb={this.handlerSaveTitle.bind(this)}
                        cancelCb={this.handlerFinishEdit.bind(this)}
                    />
                ) : (
                    <TodoRegularView
                        title={this.state.title}
                        done={this.state.done}
                        id={this.state.id}
                        onEdit={this.handlerStartEdit.bind(this)}
                        onRemove={this.props.removeTodoCb}
                    />
                )}
            </li>
        );
    }
}