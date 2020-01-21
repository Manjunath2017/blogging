import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Home";
  var [blockResult, setBlockResult] = useState([]);
  var [next, setNext] = useState(2);
  var [totalNoOfPages, setTotalNoOfPages] = useState(0);
  var [noOfPostsLoaded, setNoOfPostsLoaded]=useState(0);
  useEffect(() => {
    const fetchBlock = async () => {
      await axios
        // .get(`/post?pageNo=${next}&&item=${next}`)
        .get(`/post?item=${next}`)
        .then(response => {
          setNoOfPostsLoaded(Object.keys(response.data).length);
          setBlockResult(response.data);
          console.log(response.status);
        })
        .catch(error => {
          alert("error from server ", error);
        });
    };
    fetchBlock();
    console.log('totalNoOfPages', totalNoOfPages, noOfPostsLoaded,'noOfPostsLoaded');
    if (totalNoOfPages === 0) { // this will call only once 
      axios.get(`/post`).then(response => {
        // console.log(Object.keys(response.data).length);
        setTotalNoOfPages(Object.keys(response.data).length);
      });
    }
  }, [noOfPostsLoaded, next, totalNoOfPages]);

  const loadMore = () => {
    // console.log("Load More!");
    setNext(next + 2);
    // window.scrollTo(0, 0); // Take page on top
  };
  console.log(next, blockResult);
  // setTotalNoOfPages(blockResult.total);
  // console.log(totalNoOfPages, 'blockResult.total');
  const showBlock = () => (
    <Fragment>
      <div className="container">
        {blockResult
          ? blockResult.map((postsBlock, index) => (
              // const [_id, title, category, author, date, mainimage, body ] = postsBlock;
              <div key={index}>
                <h3 className="text-secondary">{postsBlock.title} </h3>
                <p
                  className="text-white bg-secondary"
                  style={{ padding: "10px 2px 10px 2px" }}
                >
                  Post in{" "}
                  <span style={{ color: "#03fc41" }}>
                    {" "}
                    {postsBlock.category}{" "}
                  </span>
                  by{" "}
                  <span style={{ color: "#03fc41" }}>
                    {" "}
                    {postsBlock.author}{" "}
                  </span>{" "}
                  on{" "}
                  <span style={{ color: "#03fc41" }}>
                    {" "}
                    {moment(postsBlock.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>{" "}
                </p>
                <div className="mx-auto">
                  <img
                    src={`/uploads/${postsBlock.mainimage}`}
                    alt="Blog"
                    className="mx-auto img-fluid d-block"
                    style={{ width: "30%" }}
                  />
                </div>
                <p
                  className="text-black-50"
                  style={{
                    textAlign: "justify",
                    height: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {postsBlock.body}{" "}
                </p>
                <Link className="btn btn-dark" to={`/detail/${postsBlock._id}`}>
                  Read More
                </Link>
                <hr />
              </div>
            ))
          : `Loading...`}
        {noOfPostsLoaded === totalNoOfPages ? (
          <div
            className="btn btn-block white"
            style={{ backgroundColor: "#6C757D", color: "#fff" }}
          >
            no more result
          </div>
        ) : (
          <input
            type="submit"
            value="Load More"
            className="btn btn-block white"
            style={{ backgroundColor: "#6C757D", color: "#03fc41" }}
            onClick={e => loadMore()}
          />
        )}
      </div>
    </Fragment>
  );
  return (
    <div>
      <br />
      {showBlock()}
    </div>
  );
};
export default Home;
