import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "../post/post";
import Pagination from "./pagination";
// import ListOfBlog from './listOfBlog/listOfBlog';

const EditPost = props => {
  // funcrion name have to start with capital letter
  //=============================================================
  //========================== fetch table content ==============
  //=============================================================
  var [posts, setPosts] = useState([]);
  var [loading, setLoading] = useState(true);
  var [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  var [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/post?pageNo=${currentPage}&&item=3`)
        .then(response => {
          setLoading(true);
          setPosts(response.data);
          setLoading(false);
          console.log(response.status, "status");
        })
        .catch(error => {
          console.log("error from server ", error);
        });
    }, 1000); //load after 1 seconds
    if (totalNumberOfPages === 0) {
      axios.get(`/post`).then(response => {
        setTotalNumberOfPages(Object.keys(response.data).length);
        console.log(totalNumberOfPages, "totalNumberOfPages");
      });
    }
  }, [props, totalNumberOfPages, currentPage]); //important after deleting [props] 'll render (pdate table)

  // fetchBlock();
  //=============================================================
  //=========================== Delete ==========================
  //=============================================================
  const deletePost = id => {
    // console.log('deleteRow',id);
    if (window.confirm("Are you Sure")) {
      console.log("conform----------------------");
      axios
        .delete(`/post/${id}`)
        .then(result => {
          console.log(result.status);
          alert("Post Deleted! ");
          console.log("post deleted with comments");
          props.history.push("/editpost");
        })
        .catch(error => {
          alert("Error While Deleting Post", error);
        });
    }
  };
  //=============================================================
  //=========================== Edit ============================
  //=============================================================
  // change page number 
  const changePageNo = number => {
    console.log(number, 'changePageNo');
    setCurrentPage(number);
  }
  return (
    <Fragment>
      <br />

      <h1>Edit And Delete</h1>
      {!loading ? (
        <div className="table-responsive-md">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Main Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((table, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`/uploads/${table.mainimage}`}
                      alt="Blog"
                      className="mx-auto img-fluid d-block"
                      style={{ width: "70px", height: "50px" }}
                    />
                  </td>
                  <td>{table.title}</td>
                  <td>{table.author}</td>
                  <td>
                    <a
                      href={`editpost/${table._id}`}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fa fa-edit"> Edit </i>
                    </a>
                    <button
                      type="button"
                      onClick={() => deletePost(table._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa fa-trash"> Delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination totalNumberOfPages={totalNumberOfPages} changePageNo={changePageNo} currentPage={currentPage} />
        </div>
      ) : (
          <img
            src={`../../../loader.gif`}
            alt="Loader"
            className="mx-auto d-block"
          />
        )}
    </Fragment>
  );
};
export default EditPost;