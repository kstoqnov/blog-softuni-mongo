import React from 'react';
import Posts from '../post/Posts'


const Home = () => (
    <section className="container wrapper mt-2">
        <div className="jumbotron">
            <h2 className="font-weight-bold text-center">Home</h2>
            <p className="lead text-center">Welcome!</p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </section>
);

export default Home;