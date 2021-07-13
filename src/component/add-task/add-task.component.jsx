import React from 'react';
import './add-task.style.scss';

class AddTask extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { onCreate } = this.props;
        const { title, description } = this.state;

        const task = {
            title,
            description,
            completed: false,
            updatedAt: new Date().toLocaleDateString()
        }

        onCreate(task);

        this.setState({ title: '', description: '' });
    };

    render() {
        const { title, description } = this.state;
        return (
            <div className="task-create">
                <form onSubmit={this.handleSubmit} className="add-task">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Task Description"
                        value={description}
                        onChange={this.handleChange}
                    />
                    <input disabled={!title.length > 0} className="create" type="submit" value="Create Task" />
                </form>
            </div >
        );
    }
}


export default AddTask;
