import React from 'react'
import './insta.style.scss';
import United from '../../united.jpg';
import { addNewComment, getAllComments, getPhotoUrlFromEmail, getCommentsState } from '../../firebase-service.js';
import { firestore, auth } from '../../firebase-util';
import CommentItem from '../../comment/comment.component';


class Insta extends React.Component {

    constructor() {
        super();
        this.state = {
            comment: '',
            imageUpload: null
        }
    }

    unsubscribeComments = null;

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    createComment = () => {
        const { currentUser } = this.props;
        addNewComment(this.state.comment, currentUser, '5bRbc5kDPeHssRyeCYVh');
        this.setState({ comment: '' });
    }

    // this.unsubscribeFromFirestore = firestore.collection('tasks').onSnapshot(snapshot => {
    //     const taskFromDb = snapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    //     this.setState({ tasks: taskFromDb });
    //   });

    componentDidMount = async () => {
        let dataForState = [];
        this.unsubscribeComments = firestore.doc('uploads/5bRbc5kDPeHssRyeCYVh').onSnapshot(snapshot => {
            this.setState({ imageUpload: [...snapshot.data().comments] })

            // snapshot.data().comments.map(async (data) => {
            //     const ref = await firestore.collection('users');
            //     try {
            //         await ref.where('email', '==', data.author).get(snap => {
            //             snap.docs.map(user => {
            //                 const profilePic = user.get('photoURL')
            //                 dataForState.push({ ...data, profilePic });
            //             });
            //         })

            //working code
            // const user = await ref.where('email', '==', data.author).get();
            // user.docs.map(author => {
            //     const profilePic = author.get('photoURL');
            //     const yup = { ...data, profilePic }
            //     dataForState.push(yup);
            // })
        })
    }




    componentWillUnmount = () => {
        this.unsubscribeComments();
    }

    render() {
        const { currentUser } = this.props;
        const { comment, imageUpload } = this.state;
        return (
            <div className="insta" >
                <div className="image">
                    <img src={United}
                        alt="united" />
                </div>
                <div className="details">

                    <div className="all-comments">
                        {
                            imageUpload !== null ?
                                imageUpload.map(item => <CommentItem item={item} key={item.id} ></CommentItem>) : ''
                        }
                    </div>

                    {
                        currentUser ?
                            (<div className="add-comment">
                                <input
                                    type="text"
                                    name='comment'
                                    placeholder='Comment'
                                    value={comment}
                                    onChange={this.handleChange} />
                                <span onClick={() => this.createComment()}>POST</span>
                            </div>) : ''
                    }

                </div>

            </div>
        )
    }
}
;


export default Insta;