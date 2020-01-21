import React, { useState, Fragment } from 'react';
import axios from 'axios';
const style={
  borderTopStyle: "hidden",
  borderRightStyle: "hidden",
  borderLeftStyle: "hidden",
  borderRadius:"0",
  color:"#797589"
}
const AddCategory = () => {
  document.title = 'Add Category';
  const [name, setName] = useState('');
  const SendData = () => {
    if (!name) {
      alert(' Cannot send Blank Data!');
    } else {
      axios
        .post('/category', { categories: name })
        .then(response => {
          console.log(response.status);
          // console.log(response.config); 
          if (response.status === 200) {
            alert('Category Inserted!');
            setName('');
          }
        })
        .catch(error => {
          alert('Client side error', error);
        });
    }
  }
  return (
    <Fragment>
      <br />
      <form  >
        <h1>Add Category</h1>
        <div className="form-group">
          {/* <label>Category</label> */}
          <input
            type="text"
            className="form-control"
            style={style}
            placeholder="Enter Category"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={SendData} className="btn btn-success">Submit</button>
      </form>
    </Fragment>
  );
}
export default AddCategory;
