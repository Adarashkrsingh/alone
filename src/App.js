import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import VideoCall from './components/Videocall';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/call" element={<VideoCall />} />
            </Routes>
        </Router>
    );
};

export default App;
