import React, {Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const ListOfBlog = (posts)=>(
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
        {
            posts.map((table, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><img src={`/uploads/${table.mainimage}`} alt="Blog" className="mx-auto img-fluid d-block" style={{ width: '70px', height: '50px' }} /></td>
              <td>{table.title}</td>
              <td>{table.author}</td>
             {/* <td>
                <a href={`editpost/${table._id}`} className="btn btn-success btn-sm"><i className="fa fa-edit"> Edit </i>  </a>
                <button type="button" onClick={() => deletePost(table._id)} className="btn btn-danger btn-sm"> <i className="fa fa-trash"> Delete</i> </button>
              </td>
             */}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>  
)

export default ListOfBlog;