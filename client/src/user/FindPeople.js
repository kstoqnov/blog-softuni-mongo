import React, { Component } from 'react';
import { findPeople, follow } from "./apiUser"
import DefaultProfile from '../images/avatar.jpg'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/index'



class FindPeople extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            error: '',
            open: false
        }
    }


    //init list of users
    componentDidMount = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({ users: data })
                }
            })
    }

    //small cards of all users with default image
    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-3 p-1 mr-3 mt-1" key={user._id}>
                    <img
                        className="img-thumbnail img-fluid"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />


                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            className="btn btn-primary"
                            to={`/user/${user._id}`}>
                            View profile
                        </Link>

                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn btn-raised btn-info float-right btn-sm">
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );


    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    let toFollow = this.state.users;
                    toFollow.splice(i, 1)
                    this.setState({
                        users: toFollow,
                        open: true,
                        followMessage: `Following ${user.name}`
                    })
                }
            })
    }

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container wrapper">
                <h2 className="mt-5 text-center jumbotron">Find People You can Follow</h2>

                {open && (
                    <div className="alert alert-success">
                        <p>{followMessage}</p>
                    </div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;