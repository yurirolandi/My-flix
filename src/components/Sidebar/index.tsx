import React from 'react';
import { useHistory } from "react-router-dom";
import { FaHome, FaThumbsUp, FaSistrix } from "react-icons/fa";
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import './Sidebar.scss';


export default function Sidebar() {
  const history = useHistory();
  function home() {
    history.push("/");
  }
  function favoritos() {
    history.push("/favoritos");
  }
  function busca() {
    history.push("/busca");
  }
  return (
    <SpatialNavigation>
      <nav className='nav-menu'>
        <ul className="nav-menu-items">
          <Focusable onClickEnter={home}>
            <li className="nav-menu-items__text">
              <FaHome />
              <span>Home</span>
            </li>
          </Focusable>
          <Focusable onClickEnter={favoritos}>
            <li className="nav-menu-items__text">
              <FaThumbsUp />
              <span>Favoritos</span>
            </li>
          </Focusable>
          <Focusable onClickEnter={busca}>
            <li className="nav-menu-items__text">
              <FaSistrix />
              <span>Busca</span>
            </li>
          </Focusable>
        </ul>
      </nav>
    </SpatialNavigation>
  );
}