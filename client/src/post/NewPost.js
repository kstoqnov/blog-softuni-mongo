import React, { Component } from 'react';
import { isAuthenticated } from '../auth/index';
import { create } from './apiPost';
import { Redirect } from 'react-router-dom';



class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }




    componentDidMount() {
        this.postData = new FormData()
        this.setState({ user: isAuthenticated().user })
    };

    isValid = () => {

        const { title, body, fileSize } = this.state
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false })
            return false;
        }
        if (fileSize > 100000) {
            this.setState({ error: "File size should be less than 100Kb", loading: false })
            return false;
        }

        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize: fileSize })
    };

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error })
                    else {
                        this.setState({
                            loading: false,
                            title: '',
                            body: '',
                            redirectToProfile: true
                        })
                    }
                });
        }
    };

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post photo</label>
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control w-25" required="required" />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} type="text" value={title} className="form-control w-25" required="required" />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <input onChange={this.handleChange("body")} type="text" value={body} className="form-control w-25" required="required" />
            </div>


            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create post</button>
        </form>
    )


    render() {

        const {
            title,
            body,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;


        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />
        }

        return (
            <div className="container wrapper">
                <h2 className="mt-5 mb-5 jumbotron text-center">Create a new post</h2>
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading
                    ? <div className="jumbotron text-center"><h2>Loading...</h2></div>
                    : ""}
                {this.newPostForm(title, body)}
            </div>
        );
    }
}

export default NewPost;