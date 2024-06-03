import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResultsPage from "./SearchResultsPage";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>My articles</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/create">New article</Link>
            <button className="create logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registration</Link>
          </>
        )}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
