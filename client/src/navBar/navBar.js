import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navBar.css';
const style = {
    color: '#fff',
    padding: '10px',
    display: 'inline',
    textDecoration: 'none'
}
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="myNavbar" style={{ position: 'sticky', top: '0' }}>
            <ul className="nav-link" style={{ margin: "10px" }}>
                <NavLink to="/" exact activeClassName={classes.active}> <li style={style} className="box">Home  </li> </NavLink>
                <NavLink to="/post" activeClassName={classes.active}> <li style={style} className="box">Post  </li> </NavLink>
                <NavLink to="/addCategory" exact activeClassName={classes.active}> <li style={style} className="box">Add Category  </li> </NavLink>
                <NavLink to="/editpost" exact activeClassName={classes.active}> <li style={style} className="box">Edit Post  </li> </NavLink>
            </ul>
        </nav>
    )
}
export default NavBar;