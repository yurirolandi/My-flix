import React from "react";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaThumbsUp } from "react-icons/fa";
// import './Watch.css';

function Favorite() {
    
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="container__grid">
                    ola mundo
                </div>
            </div>
        </>
    );
}
export default Favorite;