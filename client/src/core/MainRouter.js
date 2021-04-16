import React from 'react';
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
import Footer from './Footer';
import FeaturesPage from './FeaturesPage';

import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary }   from './ErrorBoundary';


const MainRouter = () => (
    <>
        <HeaderMenu />
        <Switch>
            <Route exact path="/" component={() => <ErrorBoundary> <Home/> </ErrorBoundary>} />
            <Route exact path="/forgot-password" component={() => <ErrorBoundary><ForgotPassword/></ErrorBoundary>} />
            <Route exact path="/reset-password/:resetPasswordToken" component={() => <ErrorBoundary><ResetPassword/></ErrorBoundary>} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/users" component={() => <ErrorBoundary><Users/></ErrorBoundary>} />
            <Route exact path="/signup" component={() => <ErrorBoundary><Signup/></ErrorBoundary>} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/contact" component={() => <ErrorBoundary><ContactPage/></ErrorBoundary>} />
            <Route exact path="/feature" component={() => <ErrorBoundary><FeaturesPage/></ErrorBoundary>} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/findpeople/:userId" component={FindPeople} />
            <PrivateRoute exact path="/post/create/:userId" component={NewPost} />

            <PrivateRoute exact path="/user/:userId" component={Profile} />

        </Switch>
        <Footer />
    </>
);

export default MainRouter;