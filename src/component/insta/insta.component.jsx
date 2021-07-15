import React from 'react'
import './insta.style.scss';
import United from '../../united.jpg';
import { addNewComment, updateCommentInFirebase, deleteCommentFromFirebase } from '../../firebase-service.js';
import { firestore } from '../../firebase-util';
import CommentItem from '../comment/comment.component';


class Insta extends React.Component {

    constructor() {
        super();
        this.state = {
            comment: '',
            imageUpload: null,
            isEdit: false,
            itemToEdit: null
        }
    }

    unsubscribeComments = null;

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    deleteComment = id => {
        deleteCommentFromFirebase(id);
    }

    editComment = (id, text) => {
        console.log(text)
        this.setState({ comment: text, isEdit: true, itemToEdit: id })
    }

    createComment = () => {
        const { currentUser } = this.props;
        if (this.state.itemToEdit && this.state.isEdit) {
            updateCommentInFirebase(this.state.itemToEdit, this.state.comment);
        }
        else {
            addNewComment(this.state.comment, currentUser, '5bRbc5kDPeHssRyeCYVh');
        }
        this.setState({ comment: '' });
    }

    componentDidMount = async () => {
        this.unsubscribeComments = await firestore.collection('uploads').doc('5bRbc5kDPeHssRyeCYVh').collection('comments')
            .onSnapshot(snapshot => {
                let dataForState = [];
                snapshot.docs.forEach((item) => {
                    dataForState.push({ id: item.id, ...item.data() })
                })
                dataForState.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
                this.setState({
                    imageUpload: [...dataForState]
                }
                )
            })
    }


    componentWillUnmount = () => {
        this.unsubscribeComments();
    }

    render() {
        const { currentUser } = this.props;
        const { comment, imageUpload, isEdit } = this.state;
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
                                imageUpload.map(item => <CommentItem item={item}
                                    handleDelete={this.deleteComment}
                                    handleEdit={this.editComment}
                                    key={item.id}
                                    currentUser={currentUser} ></CommentItem>) : ''
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
                                    onChange={this.handleChange}
                                />
                                <span onClick={() => this.createComment()}>
                                    {isEdit ? 'UPDATE' : 'POST'}
                                </span>
                            </div>) : ''
                    }

                </div>

            </div>
        )
    }
}
;


export default Insta;