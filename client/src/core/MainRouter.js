import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './HomePage'
import HeaderMenu from './HeaderMenu'
import Signup from '../user/Signup'
import Signin from '../user/Signin'
import Profile from '../user/Profile'
import Users from '../user/Users'
import EditProfile from '../user/EditProfile'
import FindPeople from '../user/FindPeople'
import NewPost from '../post/NewPost'
import SinglePost from '../post/SinglePost'
import PrivateRoute from '../auth/route/PrivateRoute'
import EditPost from '../post/EditPost'
import ForgotPassword from "../user/ForgotPassword";
import ResetPassword from "../user/ResetPassword";
import ContactPage from './ContactPage';
import FooterPage from './FooterPage';
import FeaturesPage from './FeaturesPage';


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
            <Route exact path="/feature" component={FeaturesPage} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/findpeople/:userId" component={FindPeople} />
            <PrivateRoute exact path="/post/create/:userId" component={NewPost} />

            <PrivateRoute exact path="/user/:userId" component={Profile} />

        </Switch>
        <FooterPage />
    </>
);

export default MainRouter;