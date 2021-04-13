import React from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const Menu = ({ history }) => (
    <nav className="bg-primary p-1 mb-1">
        <ul className="nav nav-tabs container">

            <li className="nav-item">
                <NavLink exact className="nav-link" activeClassName="selected" to="/">Home</NavLink>
            </li>

            <li className="nav-item ">
                <NavLink className="nav-link" activeClassName="selected" to="/users">Users</NavLink>
            </li>

            <li className="nav-item ">
                <NavLink className="nav-link" activeClassName="selected" to="/feature">Features</NavLink>
            </li>
            <li className="nav-item ">
                <NavLink className="nav-link" activeClassName="selected" to="/contact">Contact</NavLink>
            </li>
            {!isAuthenticated() && (
                <>
                    <li className="nav-item  m-left">
                        <NavLink className="nav-link" activeClassName="selected" to="/signin">Sign in</NavLink>
                    </li>

                    <li className="nav-item float-right">
                        <NavLink className="nav-link" activeClassName="selected" to="/signup">Sign up</NavLink>
                    </li>
                </>
            )}
            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={`/user/findpeople/${isAuthenticated().user._id}`} activeClassName="selected">
                            Find People
                    </NavLink>
                    </li>


                    <li className="nav-item ">
                        <Link className="nav-link" to={`/post/create/${isAuthenticated().user._id}`}>
                            Create Post
                    </Link>
                    </li>

                    <li className="nav-item ">
                        <NavLink className="nav-link" to={`/user/${isAuthenticated().user._id}`} activeClassName="selected">
                            {`${isAuthenticated().user.name}'s profile`}
                        </NavLink>
                    </li>

                    <li className="nav-item ">
                        <a className="nav-link" href=" #" onClick={() => signout(() => history.push('/'))}>
                            Sign out
                    </a>
                    </li>
                </>
            )}
        
        </ul>
        
    </nav>
);

export default withRouter(Menu);

