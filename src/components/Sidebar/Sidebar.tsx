import React from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaThumbsUp, FaSistrix } from "react-icons/fa";
import './Sidebar.css';


export default function Sidebar() {

  return (
    <>
      <nav className='nav-menu'>
        <ul className="nav-menu__items">
          <li className="nav-menu__text">
            <Link to="/">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-menu__text">
            <Link to="/favoritos">
              <FaThumbsUp />
              <span>Favoritos</span>
            </Link>
          </li>
          <li className="nav-menu__text">
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