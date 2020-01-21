import React, { useState, Fragment } from 'react';
import axios from 'axios';
const AddCategory = () => {
 document.title = 'Add Category';
 var [getInput, setInput] = useState({category:'', subject:''});
 const inputTextHandler=e=>{
    e.preventDefault();
    setInput({...getInput, [e.target.name]:e.target.value});
    console.log({[e.target.name]:e.target.value});
 }
 const sendData = ()=>{
   var {category, subject } = getInput; //key has to be same named
   console.log(category , subject, '----------');
    axios.post('/data', getInput)
    .then(result =>{
      console.log(result);
    })
    .catch(error=>{
      console.log(error);
    })
}
  return (
    <Fragment>
      <br />
      <form  >
        <h1>Test Category</h1>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Category"
            required
            name="category"
            // value={category}
            onChange={inputTextHandler}
          />
        </div>
         <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Subject"
            required
            name="subject"
            // value={subject}
            onChange={inputTextHandler}
          />
        </div>
        <button type="button" onClick={sendData}   className="btn btn-success">Submit</button>
      </form>
    </Fragment>
  );
}
export default AddCategory;
