import React from 'react';
import './App.scss';
import AddTask from './component/add-task/add-task.component';
import Tasks from './component/tasks/tasks.component';
import { firestore, auth } from './firebase-util';
import { createTaskInFirebase, deleteTaskFromFirebase, createUserProfileInFirebase } from './firebase-service';
import Navbar from './component/navbar/navbar-component';
import Insta from './component/insta/insta.component';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      currentUser: null
    }
  }

  unsubscribeFromFirestore = null;
  unsubscribeAuth = null;

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
    this.unsubscribeFromFirestore = firestore.collection('tasks').onSnapshot(snapshot => {
      const taskFromDb = snapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
      this.setState({ tasks: taskFromDb });
    });

    this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileInFirebase(user);
        userRef.onSnapshot(async snapshot => {
          this.setState({ currentUser: { id: snapshot.id, ...snapshot.data() } })
        })
      }
      else {
        this.setState({ currentUser: null })
      }
    })

  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeAuth();
  }


  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Navbar currentUser={currentUser} ></Navbar>
        <Insta currentUser={currentUser} ></Insta>
      </div >
    );
  }
}


export default App;


//  <AddTask onCreate={this.handleCreate} ></AddTask>
// <Tasks onDelete={this.handleDelete} tasks={this.state.tasks} heading='All Tasks'></Tasks>  