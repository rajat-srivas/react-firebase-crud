import { firestore } from "./firebase-util";
const defaultImage = '5bRbc5kDPeHssRyeCYVh';


export const deleteCommentFromFirebase = async id => {
    const commentRef = await firestore.collection('uploads').doc(defaultImage).collection('comments').doc(id);
    console.log((commentRef));
    commentRef.delete();
}


export const updateCommentInFirebase = async (id, text) => {
    const commentRef = await firestore.collection('uploads').doc(defaultImage).collection('comments').doc(id);
    commentRef.update({
        text: text
    })
}

export const addNewComment = async (comment, author, imageId) => {
    const imageSnapshot = await firestore.doc(`uploads/${imageId}`);
    if (!imageSnapshot.empty) {
        const commentRef = await firestore.collection('uploads').doc(defaultImage).collection('comments');
        commentRef.add({ text: comment, author: author.email, profilePic: author.photoURL, createdAt: new Date() })
    }
}

export const createUserProfileInFirebase = async (user) => {
    console.log(user);
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


