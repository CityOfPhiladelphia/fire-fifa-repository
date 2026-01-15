import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Maps from "./pages/Maps";
import GIS from "./pages/GIS";
import Other from "./pages/Other";

import "./style.css";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="page-wrapper">
                    <NavBar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/maps" element={<Maps />} />
                            <Route path="/gis" element={<GIS />} />
                            <Route path="/other" element={<Other />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
