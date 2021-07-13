import { firestore } from "./firebase-util";

export const createTaskInFirebase = async task => {
    const newDocRef = await firestore.collection('tasks').add(task);
    const newDocSnapshot = await newDocRef.get();  //this is document snapshot
    console.log(newDocSnapshot);
    const newTask = { id: newDocSnapshot.id, ...newDocSnapshot.data() }
    console.log(newTask);
}

export const deleteTaskFromFirebase = async id => {
    await firestore.doc(`tasks/${id}`).delete();
}

export const updateTaskInFirebase = async (id, completed) => {
    const taskRef = firestore.doc(`tasks/${id}`);
    taskRef.update({
        completed: !completed,
        updatedAt: new Date().toLocaleDateString()
    })
}
