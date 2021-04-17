import React, { useState, useEffect } from 'react';
import { list } from "./apiUser"
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'


const Users = () => {

    const [users, setUsers] = useState([]);

    //init list of users
    useEffect(() => {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setUsers(data)
                }
            })

    }, [])

    //small cards of all users with default image
    const renderUsers = (users) => (
        <div className="row container">
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

                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container wrapper">
            <h2 className="text-center jumbotron">Users</h2>

            {renderUsers(users)}
        </div>
    );

}

export default Users;