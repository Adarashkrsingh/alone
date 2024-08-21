import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const startCall = () => {
        navigate('/call');
    };

    return (
        <div className="home-container">
            <h1>Welcome to Stranger Video Call</h1>
            <button onClick={startCall}>Start Video Call</button>
        </div>
    );
};

export default Home;
