import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const AddPost = props => {
  document.title = "Add Post";

  // if(props.match !== null){
  // }
  // console.log(props.match);
  // console.log(props.match.id);

  //=============================================================
  //=================== send form Data to server=================
  //=============================================================
  var reset = {
    title: "",
    category: "",
    author: "",
    body: ""
  };
  const style={
      borderTopStyle: "hidden",
      borderRightStyle: "hidden",
      borderLeftStyle: "hidden",
      borderRadius:"0",
      color:"#797589"
  }
  var [inputValue, SetInputValue] = useState(reset);
  var [mainimage, setImage] = useState([{}]);

  const inputTextHandler = event => {
    event.preventDefault();
    SetInputValue({ ...inputValue, [event.target.name]: event.target.value }); // get all input values
  };
  const imageHandler = event => {
    event.preventDefault();
    setImage(event.target.files[0]); //get image value
  };
  // console.log(inputValue);

  var { title, category, author, body } = inputValue;
  // console.log(title,category,author,body);
  const postData = data => {
    // console.log('title,category,author,body', title,category,author,body, image);
    // console.log(mainimage)
    var form = new FormData();
    form.append("title", title);
    form.append("category", category);
    form.append("author", author);
    form.append("mainimage", mainimage);
    form.append("body", body);
    // console.log(form);
    axios
      .post("/post", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(result => {
        console.log(result.status);
        alert("Blog Posted");
        SetInputValue(reset);
        setImage([{}]);
        props.history.push("/");
      })
      .catch(error => {
        console.log(`client side---cannot Insert Data ${error} `);
        alert("Please insert accurate data");
      });
  };
  //=============================================================
  //=========== Fetch date from localhost:3001/Category==========
  //=============================================================
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios
      .get("/category")
      .then(response => {
        // console.log(response);
        setCategoryData(response.data);
      })
      .catch(error => {
        alert("client. error While fetching category data", error);
      });
  }, []);

  return (
    <Fragment>
      <br />
      <h1>Add Post</h1>
      <form>
        <div className="form-group">
          {/* <label htmlFor="uname">Title</label> */}
          <input
            type="text"
            className="form-control"
            style={style}
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={inputTextHandler}
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
            style={style}
            onChange={inputTextHandler}
            name="category"
          >
            <option value="" disabled selected hidden>Select Category</option>
            {categoryData.map(cat => (
              <option key={cat._id}>{cat.categories}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <textarea
            name="body"
            onChange={inputTextHandler}
            value={body}
            className="form-control"
            style={style}
            rows="5"
            placeholder="Enter Body"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="uname">Main Image</label> */}
          <input
            type="file"
            file={mainimage}
            name="mainimage"
            onChange={imageHandler}
            className="form-control-file border"
            placeholder="Main Image"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="uname">Author</label> */}
          <input
            type="text"
            className="form-control"
            style={style}
            placeholder="Enter author"
            value={author}
            name="author"
            onChange={inputTextHandler}
          />
        </div>
        <button type="button" onClick={postData} className="btn btn-success">
          Post
        </button>
      </form>
    </Fragment> //closing main div
  );
};
export default AddPost;
