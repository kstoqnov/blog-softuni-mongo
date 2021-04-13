import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/HomePage'
import HeaderMenu from './core/HeaderMenu'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import PrivateRoute from './auth/PrivateRoute'
import EditPost from './post/EditPost'
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import ContactPage from './core/ContactPage';
import FooterPage from './core/FooterPage';


const MainRouter = () => (
    <>
        <HeaderMenu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/contact" component={ContactPage} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/findpeople/:userId" component={FindPeople} />
            <PrivateRoute exact path="/post/create/:userId" component={NewPost} />

            <PrivateRoute exact path="/user/:userId" component={Profile} />

        </Switch>
        <FooterPage />
    </>
);

export default MainRouter;