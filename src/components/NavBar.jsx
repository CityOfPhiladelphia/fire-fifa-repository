import React from "react";
import { Link } from "react-router-dom";
import logo from "/asset/logo.png";

export default function NavBar() {
    return (
        <nav>
            <div className="brand">
                <img src={logo} alt="PFD Seal" />
                🚒 PFD FIFA 2026 Portal ⚽
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/maps">Maps</Link>
                <Link to="/gis">GIS</Link>
                <Link to="/other">Other</Link>
            </div>
        </nav>
    );
}
