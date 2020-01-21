





// its working good without any error;




import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import AddComment from "./comment/addComment";

const PostDetail = props => {
  //"match" will give u detail from anchor tag
  document.title = "Post Detail";

  var [blockResult, setBlockResult] = useState([]);
  var [statusCode, setStatusCode] = useState([]);
  useEffect(() => {
    axios
      .get(`/post/detail/${props.match.params.id}`)
      .then(response => {
        // if(response.data)
        setStatusCode(response.status);
        // console.log("status----------", response.status, response.data);
        setBlockResult(response.data);
      })
      .catch(error => {
        setStatusCode(400);
        // console.log("Client PostDetail,, error from PostDetail", error);
      });
  }, [statusCode, props]); //use props else 'll get props.match.params.id "error"
  // console.log('blockResult',blockResult);
  console.log('statusCode', statusCode);
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
        {statusCode === 200
          ?  <div>
          <div key={blockResult._id}>
            <h3 className="text-secondary">{blockResult.title} </h3>
            <p
              className="bg-secondary text-white"
              style={{ padding: "10px 2px 10px 2px" }}>
              Post in {blockResult.category} by
            <span style={{ color: "#03fc41" }}> {blockResult.author} </span> on
            <span style={{ color: "#03fc41" }}> {moment(blockResult.date).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </p>
            <div className="mx-auto">
              <img
                src={`/uploads/${blockResult.mainimage}`}
                alt="Blog"
                style={{ padding: "25px" }}
                className="mx-auto img-fluid d-block"
              />
            </div>
            <p className="text-black-50" style={{ textAlign: "justify" }}>
              {blockResult.body}
            </p>
            <hr style={{ border: "1px solid #6C757D" }} />
          </div>

          <AddComment postId={blockResult._id} />
        </div>
          : 
            (statusCode === 400
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
