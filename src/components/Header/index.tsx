import React from 'react';
import { FaYoutube } from "react-icons/fa";
import "react-simple-keyboard/build/css/index.css";
import './Header.scss';


export default function Header() {

    return (
        <>
            <header className='header'>
                <div className="header__logo">
                    <FaYoutube size={36} color="ff0000" />
                    <h3>My Flix</h3>
                </div>
                
                <div className="header__user">
                    <img src="https://i.pinimg.com/474x/8e/0c/fa/8e0cfaf58709f7e626973f0b00d033d0.jpg" alt="" />
                </div>
            </header>
        </>
    );
}