import React, { Component } from 'react';
import { list } from "./apiUser"
import DefaultProfile from '../images/avatar.jpg'
import { Link } from 'react-router-dom'

class Users extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
    }


    //init list of users
    componentDidMount = () => {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({ users: data })
                }
            })
    }

    //small cards of all users with dafault image
    renderUsers = users => (
        <div className="row container">
            {users.map((user, i) => (
                <div className="card col-md-4 p-1" key={i}>
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

                    </div>
                </div>
            ))}
        </div>
    );


    render() {
        const { users } = this.state;
        return (
            <div className="container wrapper">
                <h2 className="text-center jumbotron">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;