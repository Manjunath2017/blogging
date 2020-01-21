// need to debug...

import React, { useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';

import { contextPostId } from '../postDetail'; //get ID 

const initialState = {
  comment: {
    comment_id: '',
    email: '',
    body: ''
  },
  // commentData: [],
  error: true
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMMENT': return {
      commentData: action.result,
      error: false
    }
    case 'FETCH_ERROR': return {
      error: true
    }
    case 'COLLECT_DATA': return {
      comment: {
        comment_id: action.comment_id,
        email: action.email,
        body: action.body
      }
    }
    case 'POST_COMMENT': return {

    }
    default: return state
  }
}

const Comment = (props) => {

  const id = useContext(contextPostId); //assign ID
  console.log('context : ', id.postId, '---------');

  // var commentNull = {
  //   comment_id:'',
  //   email:'',
  //   body:''
  // }

  // var [comment, setComment]=useState(commentNull);
  // var  id=props.postId;
  //=============================================================
  //========================== fetch Comments ===================
  //=============================================================
  const [data, dispatch] = useReducer(reducer, initialState);

  const [commentData, setCommentData] = useState([])
  useEffect(() => {
    axios
      .get(`/comment/${id.postId}`)
      .then(result => {
        dispatch({ type: 'FETCH_COMMENT', result: result.data })
      })
      .catch(error => {
        console.log(error, '-------comment error');
        dispatch({ type: 'FETCH_ERROR' });
      })
  }, [id.postId]); //on every update this will render

  console.log('id------------', commentData);
  //=============================================================
  //========================== Insert Comments ==================
  //============================================================= 
  const commentInputHandler = e => {
    e.preventDefault();
    // dispatch({type:'COLLECT_DATA', [e.target.name] : e.target.value, comment_id:id.postId  })
    setComment({ ...initialState.comment, [e.target.name]: e.target.value, comment_id: id.postId });
  }
  const SendData = () => {
    var { email, body } = data.comment;
    console.log('email', email, 'email', body)
    var { email, body } = comment;
    if (email.length === 0 || body.length === 0) {
      alert('Please add Email and Comment');
    } else {
      console.log('comment');
      axios
        .post('/comment', comment)
        .then(result => {
          console.log(result);
          setComment(commentNull);
        })
        .catch(error => {
          console.log('----', error);
        })
    }
  }

  return (
    <div>
      <h4>   {(data.commentData.length <= 1) ? (data.commentData.length === 0) ? '' : 'Comment' : 'Comments'} </h4>
      <br />
      {
        data.commentData.map(data => (
          <div key={data._id}>
            <p className="text-black-50" style={{ textAlign: 'justify', marginTop: '-20px' }}> - {data.body}</p>
          </div>
        ))
      }
      <br />
      <h1>Add Comment</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="text"
          className="form-control"
          placeholder="Enter email"
          value={data.email}
          onChange={commentInputHandler}
        />
      </div>
      {/*
      <div className="form-group">
      <label>Comment Id</label>
        <input
            name="comment_id"
            type="text" 
            className="form-control"
            placeholder="Enter ID"
            value={id}
            onChange={(e)=>setCommentData({ ...comment, [e.target.name] : e.target.value } )}
        />
      </div>  
      */}
      <div className="form-group">
        <label>Body</label>
        <textarea name="body"
          onChange={commentInputHandler}
          value={data.body}
          className="form-control"
          rows="5"
          placeholder="Enter body">
        </textarea>
      </div>
      <button type="button" onClick={SendData} className="btn btn-success">Comment</button>
    </div>
  );
}
// }
export default Comment;
