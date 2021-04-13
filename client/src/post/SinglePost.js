import React, { Component } from 'react';
import {singlePost, remove} from './apiPost';
import DefaultPost from '../images/post-default.jpg'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth/index'

class SinglePost extends Component {
    state = {
        post:'',
        redirectToHome: false
    }

    componentDidMount =()=>{
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data =>{
            if (data.error){
                console.log(data.error);
            } else {
                this.setState({post: data});
            }
        });
    };

    deletePost =()=>{
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;
            remove(postId, token).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    this.setState({
                        redirectToHome: true
                    })
                }
            })
    }

    deleteConfirmed =()=>{
        let answer = window.confirm("Are you sure you want to delete your post?")
        if(answer){
            this.deletePost()
        }
    }

    renderPost=(post)=>{
        const posterId = post.postedBy?`/user/${post.postedBy._id}`:"";
        const posterName = post.postedBy?post.postedBy.name:"Unknown";

        return (

                        <div className="card-body">
                        
                            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            alt={post.title}
                            onError={i=>(i.target.src=`${DefaultPost}`)}
                            style={{ height: "auto",
                                     maxWidth: "100%",
                                     objectFit: "cover"}}

                            className="img-thunbnail mb-3"
                            />

                            <p className="card-text">{post.body}</p>
                            <br/>
                            <p className="font-italic mark">
                            Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                               on {new Date(post.created).toDateString()}
                            </p>
                            <div className="d-inline-block">
                            <Link
                                className="btn btn-raised btn-primary btn-sm mr-5"
                                to={`/`}>
                            Back to posts...
                            </Link>

                            {isAuthenticated().user
                            &&isAuthenticated().user._id===post.postedBy._id
                            &&<>
                                <Link
                               
                                className="btn btn-raised btn-warning btn-sm mr-5"
                                to={`/post/edit/${post._id}`}>
                                Edit post
                                </Link>

                                <Link
                                onClick={this.deleteConfirmed}
                                className="btn btn-raised btn-warning btn-sm mr-5"
                                to={`/`}>
                                Delete post
                                </Link>
                                </>
                            }
                           
                            
                            </div>
                        </div>
                );
        }

    render() {
        if(this.state.redirectToHome){
            return <Redirect to={`/`}/>;
        }
        const {post} = this.state;
        return (
            <div className="container">
            <h2 className="display-2 mt-5 mb-5 jumbotron text-center">{post.title}</h2>
            {!post ? <div className ="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>:this.renderPost(post)}  
            </div>
        );
    }
}

export default SinglePost;