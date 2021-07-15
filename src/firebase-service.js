import { firestore } from "./firebase-util";
import firebase from 'firebase/app';
import uuid from 'react-uuid'


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

export const addNewComment = async (comment, author, imageId) => {
    const imageSnapshot = await firestore.doc(`uploads/${imageId}`);
    if (!imageSnapshot.empty) {
        imageSnapshot.update({
            comments: firebase.firestore.FieldValue.arrayUnion({ text: comment, author: author.email, id: uuid(), profilePic: author.photoURL })
        })
    }

}

export const getAllComments = async (currentUser, imageId) => {
    const uploadRef = await firestore.doc(`uploads/${imageId}`);
    return uploadRef;
}

export const createUserProfileInFirebase = async (user) => {
    if (!user) return;   //in case it is signout action, then the user object will be null
    const userRef = await firestore.doc(`users/${user.uid}`);
    const userSnaphot = userRef.get();

    if (!userSnaphot.exists) {
        //check if the user has not been already created before

        const { displayName, email, photoURL, uid } = user;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                photoURL,
                uid
            })
        }
        catch (error) {
            console.error('error creating the user', error.message);
        }
    }

    return userRef;
}

export const getPhotoUrlFromEmail = async (email) => {
    const ref = await firestore.collection('users');
    try {
        const snapshot = await ref.where('email', '==', email).get();
        snapshot.forEach(doc => {
            return doc.get('photoURL');
        })
    }
    catch (error) {
        console.error(error);
    }
}

