import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li>
      <Link to="/">Home</Link>
    </li>,
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="corner-button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li>
      <Link to="/">Home</Link>
    </li>,
    <li>
      <Link to="/language-groups">Find Groups</Link>
    </li>,
    <li>
      <Link to="/users/my-profile">Your Profile</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">LINGO SQUADS</li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
