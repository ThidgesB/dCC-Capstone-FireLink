import React from "react";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "#FF3D00" }}>
            <h1 className="Blazing">FireLink</h1>
          </Link>
        </li>
        <li className="Requests">
          <Link
            to="/helprequests"
            style={{ textDecoration: "none", color: "#FF3D00" }}
          >
            <b>Requests</b>
          </Link>
        </li>
        <li className="Forum">
          <Link to="/" style={{ textDecoration: "none", color: "#FF3D00" }}>
            <b>Forum</b>
          </Link>
        </li>
        <li className="News">
          <Link
            to="/newspage"
            style={{ textDecoration: "none", color: "#FF3D00" }}
          >
            <b>News</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button className="btn-logout" onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
