import React from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaThumbsUp, FaSistrix } from "react-icons/fa";
import './Sidebar.scss';


export default function Sidebar() {

  return (
    <>
      <nav className='nav-menu'>
        <ul className="nav-menu-items">
          <li className="nav-menu-items__text">
            <Link to="/">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-menu-items__text">
            <Link to="/favoritos">
              <FaThumbsUp />
              <span>Favoritos</span>
            </Link>
          </li>
          <li className="nav-menu-items__text">
            <Link to="/busca">
              <FaSistrix />
              <span>Busca</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}