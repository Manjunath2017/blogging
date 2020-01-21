import React, {useState,useEffect} from "react";
import axios from 'axios';
import useForm from 'react-hook-form'

const AddPost = (props) => {
const [categoryData, setCategoryData]=useState([]);
  
useEffect(()=>{
  axios.get('/category')
  .then( (response) =>{
    console.log(response);
    setCategoryData(response.data)
  })
  .catch((error)=> {
    console.log('client. error While fetching category data',error)
  });
},[]);

const { register, handleSubmit } = useForm(); 
const postData=values=>{
  console.log('values', values);
  // https://www.taniarascia.com/crud-app-in-react-with-hooks/ (good)
}

return (
    <div style={{padding:'10px'}}>
    <br />
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit(postData)}>
        <div className="form-group">
          <label htmlFor="uname">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title"
            name="title" 
            ref={register} 
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea name="body" ref={register}  className="form-control" rows="5" placeholder="Enter Body"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="uname">Author</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter author"
            name="author" ref={register}
          />
        </div>

        <div className="form-group">
          <label htmlFor="uname">Main Image</label>
          <input type="file" name="mainimage" ref={register} className="form-control-file border" />
        </div>

        <div className="form-group">
          <label htmlFor="uname">Author</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Author"
            name="author" ref={register}
          /> 
        </div>
          <div className="form-group">
          <label htmlFor="sel1">Category </label>
          <select   className="form-control"  ref={register} name="category">
          {
            categoryData.map( (cat)=>(
              <option key={cat._id} ref={register} name="category" >{cat.categories}</option>
            ))
          }
          </select>
          </div>
      
        <button type="submit"  className="btn btn-success">Success</button>

      </form>
    </div>
  );
};
export default AddPost;