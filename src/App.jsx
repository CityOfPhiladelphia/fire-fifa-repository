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
                            <Route path="/fire-fifa-repository" element={<Home />} />
                            <Route path="/fire-fifa-repository/maps" element={<Maps />} />
                            <Route path="/fire-fifa-repository/gis" element={<GIS />} />
                            <Route path="/fire-fifa-repository/other" element={<Other />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
