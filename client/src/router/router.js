import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../navBar/navBar';
import Post from '../components/post/post';
import AddCategory from '../components/addCategory/addCategory';
import Home from '../components/home/home';
import PostDetail from '../components/postDetail/postDetail';
import Test from '../components/test/test';
import EditPost from '../components/editPost/editPost';
import Update from '../components/editPost/update';

const router=()=>{
    return(
        <Router>
            <NavBar /> {/* import 'Nav Bar' template */}
            <div className="container">
              <Switch> {/* 'switch' from one route to another */}
                {/* below lines of codes Contain only routers */}
                  <Route path="/"  exact component={Home} />
                  <Route path="/post" exact component={Post} />
                  <Route path="/detail/:id" exact component={PostDetail} />
                  <Route path="/addCategory" exact component={AddCategory} />
                  <Route path="/editpost" exact component={EditPost} />
                  <Route path="/test" exact component={Test} />
                  <Route path="/editpost/:update" exact component={Update} />
                  <Route component={Notfound} />
                </Switch>
            </div>
        </Router>
    )
}
  const pageNotFoundStyle={
    color:'#f00'
  }
  const Notfound=()=>{
    return(
      <div>
      <a href="/">Home Page!</a>
        <h1 style={pageNotFoundStyle}> Oops! Page not found</h1>
      </div>
    )
  } 
export default router;
