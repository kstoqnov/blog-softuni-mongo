import React, { Component } from 'react';
import { list } from "./apiPost"
import { Link } from 'react-router-dom'
import DefaultPost from '../images/post-default.jpg'

class Posts extends Component {

    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    //small cards of all users with dafault image
    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card col-md-3 ml-2 mb-1" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${process.env.REACT_APP_API_URL
                                        }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3 img-fluid"
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm">
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 jumbotron text-center">
                    {!posts.length ? "Loading..." : "Recent Posts"}
                </h2>
                {this.renderPosts(posts)}

            </div>
        );
    }
}

export default Posts;