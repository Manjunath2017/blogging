import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, Fragment, useReducer } from "react";
import axios from "axios";
import moment from "moment";
import AddComment from "./comment/addComment";

const initialState = {
  blockResult:[],
  statusCode:[]
}
const reducer = (state, action)=>{
  switch(action.type){
    case 'FETCH_DATA': return{
      blockResult:action.result,
      statusCode:action.statusCode
    }
    case 'FETCH_ERROR': return{
      statusCode:action.statusCode
    }
    default: return state;
  }
}

const PostDetail = props => {
  document.title = "Post Detail";
  const [data, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get(`/post/detail/${props.match.params.id}`)
      .then(response => {
        dispatch({type:'FETCH_DATA', result:response.data, statusCode:response.status})
      })
      .catch(error => {
        dispatch({type:'FETCH_ERROR', statusCode:400})
      });
  }, [props]); 
  console.log('statusCode', data.statusCode);
  const returnHomePage = ()=>{
    setTimeout(()=>{
      console.log('settimeout');
      props.history.push(`/`)
    },5000)
  }
 
  return (
    <Fragment>
      <div style={{ padding: "10px" }}>
        <br />
        {data.statusCode === 200
          ?  <div>

          <div key={data.blockResult._id}>
            <h3 className="text-secondary">{data.blockResult.title} </h3>
            <p
              className="bg-secondary text-white"
              style={{ padding: "10px 2px 10px 2px" }}>
              Post in {data.blockResult.category} by
            <span style={{ color: "#03fc41" }}> {data.blockResult.author} </span> on
            <span style={{ color: "#03fc41" }}> {moment(data.blockResult.date).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </p>
            <div className="mx-auto">
              <img
                src={`/uploads/${data.blockResult.mainimage}`}
                alt="Blog"
                style={{ padding: "25px" }}
                className="mx-auto img-fluid d-block"
              />
            </div>
            <p className="text-black-50" style={{ textAlign: "justify" }}>
              {data.blockResult.body}
            </p>
            <hr style={{ border: "1px solid #6C757D" }} />
          </div>
             <AddComment postId={data.blockResult._id} /> 
          </div>
          : 
            (data.statusCode === 400
              ? <div> 
                  <h2 style={{ color: "#ff0000" }}>Some thing went wrong!</h2>
                  <h4>You are redirected to home page after <span style={{ color: "#ff0000" }}> 5 seconds </span>  {returnHomePage()}</h4>
                </div>
              : <div>Loading....</div>
            )
        }
      </div>
    </Fragment>

  );
};
export default PostDetail;
