import React, { Fragment, useState, useEffect } from "react";
// import React, {useState} from "react";

import axios from 'axios';
const AddPost = (props) => {
  document.title = 'Edit Post';
  const [UpdateValue, SetUpdateValue] = useState({});
  const id = props.match.params.update;
  // console.log(id);
  //=============================================================
  //=================== send form Data to server=================
  //=============================================================
  // var [mainimage, setImage] = useState([{}]);
  useEffect(() => {
    axios
      .get(`/post/detail/${id}`)
      .then((response) => {
        SetUpdateValue(response.data);
        // console.log('response.data', response.data); 
      })
      .catch((error) => {
        alert('Client PostDetail, error from PostDetail', error)
      });
  }, [id,]);
  // console.log('UpdateValue',UpdateValue);

  const inputTextHandler = event => {
    event.preventDefault();
    SetUpdateValue({ ...UpdateValue, [event.target.name]: event.target.value }); // get all input values
  }

  //   const imageHandler=event=>{
  //     event.preventDefault();
  //     setImage(event.target.files[0]) //get image value
  // }

  // console.log(UpdateValue);

  var { title, category, author, body } = UpdateValue;

  // console.log(title,category,author,body);
  const postData = data => {
    // console.log('title,category,author, body ', title,category,author,body );
    // console.log(UpdateValue);
    
    // var form= new FormData();
    // form.append('title',title);
    // form.append('category',category);
    // form.append('author',author);
    // // form.append('mainimage',mainimage);
    // form.append('body',body);
    // console.log(form);
    axios.put(`/post/${id}`, UpdateValue
      // ,
      // {
      //   headers:{
      //     'Content-Type':'multipart/form-data'
      //   }
      // }
    )
      .then(result => {
        console.log(result.status);
        alert('Blog Updated');
        props.history.push(`/detail/${id}`)
      })
      .catch(error => {
        console.log(`client side---cannot Update Data ${error} `);
        alert('Please insert accurate data');
      })
  }

  //=============================================================
  //=========== Fetch date from localhost:3001/Category==========
  //=============================================================
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios.get('/category')
      .then((response) => {
        console.log(response.status);
        setCategoryData(response.data)
      })
      .catch((error) => {
        alert('client. error While fetching category data', error)
      });

  }, []);
  const style={
    borderTopStyle: "hidden",
    borderRightStyle: "hidden",
    borderLeftStyle: "hidden",
    borderRadius:"0"
}
  return (
    <Fragment>
      <br />
      <h1>Update Post</h1>
      <form  >
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
          {/* <label htmlFor="sel1">Category </label> */}

          <select className="form-control" style={style} onChange={inputTextHandler} value={category} name="category">
            {
              categoryData.map((cat) => (
                <option key={cat._id} >{cat.categories}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          {/* <label>Body</label> */}
          <textarea name="body"
            onChange={inputTextHandler}
            value={body}
            className="form-control"
            style={style}
            rows="5"
            placeholder="Enter Body">
          </textarea>
        </div>
        {/*
          <div className="form-group">
          <label htmlFor="uname">Main Image</label>
          <input type="file" 
          file={mainimage} 
          name="mainimage" 
          onChange={imageHandler} 
          className="form-control-file border" 
          />
          </div>
      
        */}

        <div className="form-group">
          {/* <label htmlFor="uname">Author</label> */}
          <input
            type="text"
            className="form-control"
            style={style}
            placeholder="Enter author"
            value={author}
            name="author" onChange={inputTextHandler}
          />
        </div>
        <div className="from-group">
          <button type="button" onClick={postData} className="btn btn-success"> Update </button>
          <button type="button" onClick={() => props.history.push('/editpost')} className="btn btn-danger"> Cancel </button>
        </div>
      </form>
    </Fragment> //closing main div
  );
};
export default AddPost;