import React, { useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import './Videocall.css'

const VideoCall = () => {
    const [stream, setStream] = useState(null);
    const myVideo = useRef();
    const userVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();

    const startVideoCall = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;

            socketRef.current = io.connect('http://localhost:5000');
            socketRef.current.emit('join-room');

            socketRef.current.on('other-user', (userId) => {
                callUser(userId);
            });

            socketRef.current.on('user-joined', (signal) => {
                peerRef.current.signal(signal);
            });

            socketRef.current.on('receiving-returned-signal', (signal) => {
                peerRef.current.signal(signal);
            });
        });
    };

    const callUser = (userId) => {
        peerRef.current = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peerRef.current.on('signal', (signal) => {
            socketRef.current.emit('sending-signal', { userId, signal });
        });

        peerRef.current.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
    };

    return (
        <div className="video-call-container">
            <div className="video">
                <video playsInline muted ref={myVideo} autoPlay />
                <video playsInline ref={userVideo} autoPlay />
            </div>
            <button onClick={startVideoCall}>Start Call</button>
        </div>
    );
};

export default VideoCall;
