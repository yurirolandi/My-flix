import React, { useEffect, useState } from "react";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import CardVideo from '../../components/CardVideo/CardVideo';
import { FaHeart } from "react-icons/fa";
import './Favorite.css';

function Favorite() {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const store = localStorage.getItem('favorites');
        if (!store) return
        setFavorite(JSON.parse(store))
    }, []);

    function removeFavorite(video: any) {
        let array = favorite;

        array.map((item:any, index: number) => {
            if (item.id === video.id) {
                array.splice(index, 1);
                setFavorite([...array])
                localStorage.setItem('favorites', JSON.stringify(array));
            };
        })
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="container__grid">

                {
                        favorite.length > 0 ?
                        favorite.map((video: any, index: number) => {

                            return (<div className="coluna" key={index}>
                                <CardVideo                                                              
                                    thumb={video.snippet.thumbnails.high.url}
                                    logo="https://yt3.ggpht.com/ytc/AAUvwninj1E2MC-2aA4iQ3H68k3NvsHDjY36yQhMIJnD=s68-c-k-c0x00ffffff-no-rj"
                                    title={video.snippet.title}
                                    text={video.snippet.channelTitle}
                                    id={video.id}        
                                />
                                <div className="favorite">
                                    <FaHeart color="red" onClick={() => removeFavorite(video)} />
                                </div>
                            </div>)
                        }) : <h1>Você não tem nenhum video como favorito!</h1>
                    }
                </div>
            </div>
        </>
    );
}
export default Favorite;