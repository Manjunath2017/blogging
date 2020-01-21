import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Comment=(props)=>{
 
  // var  id=props.postId;
//=============================================================
//========================== fetch Comments ===================
//=============================================================
const [commentData, setCommentData]=useState([])
useEffect(()=>{
    axios
      .get(`/comment/${props.postId}`)
      .then(result=>{
        console.log(result.data);
        setCommentData(result.data)
      })
      .catch(error=>{
        console.log(error);
      })
},[props]);

console.log('id------------',commentData);
//=============================================================
//========================== Insert Comments ==================
//=============================================================
  var commentNull = {
    comment_id:'',
    email:'',
    body:''
  }
  
  var [comment, setComment]=useState(commentNull);
  const commentInputHandler=(e)=>{
    e.preventDefault();
    setComment({ ...comment, [e.target.name]:e.target.value, comment_id:props.postId });
  }
  
  console.log('id-----',comment);
  
const SendData=(props)=>{
  var {comment_id,email, body}=comment;
    console.log('id-----',comment, `detail/${comment.comment_id}`);
      if(email.length === 0 || body.length === 0) {
        alert('Please add Email and Comment');
      }else{
        console.log('comment');
        axios
          .post('/comment',comment)
          .then(result=>{
            console.log(result);
            setComment(commentNull);
            // props.history.push('/editpost');
            console.log(`/detail/${comment_id}`);
            window.location.replace(`/detail/${comment_id}`)
            
            // props.history.push('/editpost');
          })
          .catch(error=>{
            console.log('----',error);
          })
      }
}

return (
    <div>
    <h4>  { (commentData.length <= 1 )?'Comment':'comments' } </h4> 
    <br />
    {
        commentData.map(data=>(
          <div key={data._id}>
            <p className="text-black-50" style={{ textAlign: 'justify', marginTop:'-20px'}}> - {data.body}</p>
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
            value={comment.email}
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
                  value={comment.body} 
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
