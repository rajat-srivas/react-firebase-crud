import React from 'react';
import './App.scss';
import AddTask from './component/add-task/add-task.component';
import Tasks from './component/tasks/tasks.component';
import { firestore } from './firebase-util';
import { createTaskInFirebase, deleteTaskFromFirebase } from './firebase-service';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  unsubscribe = null;

  handleDelete = id => {
    deleteTaskFromFirebase(id);
  }

  handleCreate = task => {
    const { tasks } = this.state;
    createTaskInFirebase(task);
    //this.setState({ tasks: [task, ...tasks] });
  };

  componentDidMount = async () => {


    //QuerySnapshot => if its for a collection of things firebase returns query snapshot
    //docs=> All the document in the snapshot
    //empty => boolean that lets us know if the snapshot was empty
    //metadata => metadata about the snapshot
    //query => A reference to the actual query that was fired
    //size => the number of documents in the Query Snapshot
    //forEach() => iterate through the docs    

    //On requesting one document, firebase returns document snapshot instead of query snapshot
    // id => id of the given document
    //exists => boolean that lets us know if the document exists
    //metadata => same as query snapshot
    //ref => a reference to the document in the database
    //data() => get all the fields on the document
    // get() => get a particular property on the document


    //this is the way of getting the data manually everytime
    //const taskSnapshot = await firestore.collection('tasks').get();

    // taskSnapshot.forEach(doc => {
    //   this.handleCreate(doc.data())
    //   const id = doc.id;
    //   //console.log(doc.get('title'));
    //   const data = doc.data();
    //   console.log(id, data);
    // })

    //doc does not have the id in itself, it is there in other param so if we want to save the id locally
    //other way of doing the same thing so that we can get the id also

    // const tasksFromDb = taskSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    // this.setState({ tasks: tasksFromDb });
    //console.log(tasksFromDb);

    //Subscribing => Update our UI when the database changes, i.e. no need to refersh the pages
    //additional is to unsubsctibe
    this.unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const taskFromDb = snapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
      this.setState({ tasks: taskFromDb });
    });

  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }


  render() {
    return (
      <div className="App">
        <div className="heading">
          <span className='main'>Firebase Operations with React</span>
          <span className='subheading'>Create, Read, Update, Delete & Subscribe  </span>
        </div>

        <AddTask onCreate={this.handleCreate} ></AddTask>
        <Tasks onDelete={this.handleDelete} tasks={this.state.tasks} heading='All Tasks'></Tasks>
      </div >
    );
  }
}


export default App;
