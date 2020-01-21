import React, {useState, useEffect} from 'react';
import axios from 'axios';
const Comment=(props)=>{
  console.log('-----------id', props);
    //=============================================================
    //========================== fetch Comments ===================
    //=============================================================
    const [commentData, setCommentData]=useState([]);
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
return (
    <div>
    in comments{props.postId}
      <h4>  { (commentData.length <= 1 )? (commentData.length == 0)?'':'Comment' :'Comments' } </h4> 
      <br />{
          commentData.map(data=>(
            <div key={data._id}>
              <p className="text-black-50" style={{ textAlign: 'justify', marginTop:'-20px'}}> - {data.body}</p>
            </div>
          ))
        }   
      <br />
    </div>
    );
  }
export default Comment;
