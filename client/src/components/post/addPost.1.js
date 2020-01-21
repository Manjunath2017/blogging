import React, {useState,useEffect} from "react";
import axios from 'axios';

const AddPost = (props) => {
const [categoryData, setCategoryData]=useState([]);
  
useEffect(()=>{
  axios.get('/category')
  .then( (response) =>{
    // console.log(response);
    setCategoryData(response.data)
  })
  .catch((error)=> {
    console.log('client. error While fetching category data',error)
  });
},[]);

  const nullObj={ 
    title:'', 
    category:'', 
    body:'', 
    author:'' 
  }

const [postState, setPostState] = useState(nullObj);
  
const inputFormData= e =>{


  const {name, value}=e.target
  setPostState({...postData, [name]: value});
}

console.log('postState', postState);

const postData=(e)=>{
  // console.log('e',e);
  e.preventDefault();

  // console.log('post Data', postState);
}
return (
    <div style={{padding:'10px'}}>
    <br />
      <h1>Add Post</h1>
        <form onSubmit={postData}>
          <div className="form-group">
            <label htmlFor="uname">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              name="title" value={postState.title}
              onChange={inputFormData}
  
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea name="body" value={postState.body} onChange={inputFormData} className="form-control" rows="5" placeholder="Enter Body"></textarea>
          </div>




          <div className="form-group">
            <label htmlFor="uname">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author"
              name="author" value={postState.author}
              onChange={inputFormData}
  
            />
          </div>
 {/*
          <div className="form-group">
            <label htmlFor="uname">Main Image</label>
            <input name="mainimage" value={mainimage} type="file" className="form-control-file border" />
          </div>

          <div className="form-group">
            <label htmlFor="uname">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Author"
              name="author" value={postState.author}
              onChange={inputFormData}
            /> 
          </div>
   

          <div className="form-group">
          <label htmlFor="sel1">Category </label>
          <select name="category"  className="form-control">
          {
            categoryData.map( (cat)=>(
              <option key={cat._id} value={cat.categories}  onChange={inputFormData}>{cat.categories}</option>
            ))
          }
          </select>
          
        </div>
        */}  
        <button type="submit" className="btn btn-success">Success</button>
          </form> 
    </div>
  );
};
export default AddPost;