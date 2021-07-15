import React from 'react';
import './add-task.style.scss';

class AddTask extends React.Component {
    constructor() {
        super();
        this.state = {
            title: ''
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { onCreate } = this.props;
        const { title } = this.state;

        const task = {
            title,
            updatedAt: new Date().toLocaleDateString()
        }

        onCreate(task);

        this.setState({ title: '' });
    };

    render() {
        const { title } = this.state;
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
                    <input disabled={!title.length > 0} className="create" type="submit" value="Create Task" />
                </form>
            </div >
        );
    }
}


export default AddTask;
