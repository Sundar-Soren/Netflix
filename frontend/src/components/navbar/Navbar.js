import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Search, Notifications } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { logout } from "../../context/action/userAction";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
            />

            <Link to="/" className="link link-style">
              <span>Homepage</span>
            </Link>
            <Link to="/series" className="link link-style">
              <span>Series</span>
            </Link>
            <Link to="/movies" className="link link-style">
              <span>Movies</span>
            </Link>
          </div>
          <div className="right ">
            <input type="search" />
            <Search className="icon res" />
            <Notifications className="icon res" />
            <img
              className="res"
              src="https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="profile pic"
            />

            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Setting</span>

                {isAuthenticated && <span onClick={handleLogOut}>Log Out</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
