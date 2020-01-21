import React,{ useState} from 'react';
import axios from'axios';

function Login() {
  const [formData, setformData]=useState();
  const [mainimage, setImage]=useState();
  
const formDataChangedHandler = event => {
  event.preventDefault();
  const {name, value}=event.target;
  setformData( {...formData,[name]:value} )
//     setFormValue({...formValue, [event.target.name]:event.target.value});
}
const imageAndFormDataChangeHandler=event=>{
  event.preventDefault();
  // setImage({...formData,[event.target.name]: event.target.files[0]}); //getting all data
  setImage(event.target.files[0]);

  console.log(mainimage);
}
const uploadHandler = () => {
  // console.log(fromData);
  const form  = new FormData()
  form.append('author', formData.author);
  form.append('body', formData.body);
  form.append('mainimage',mainimage);

  console.log(form);
  console.log(mainimage);

  axios.post('/post', form,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
    .then(result=>{
      console.log(result);
    })
    .catch(error=>{
      console.log(error);
    })
    // setImage('');
}

  return(
    <div style={{padding:"20px"}}>  <br /><br />
    
      <input type="text"  onChange={formDataChangedHandler} name="author" /> <br /><br />
      <input type="text"  onChange={formDataChangedHandler} name="body" />  <br /><br />
      <input type="file"  onChange={imageAndFormDataChangeHandler} name="mainimage" />
      <input type="button" onClick={uploadHandler} value="Upload" />
    </div>
  )
}
export default Login;
