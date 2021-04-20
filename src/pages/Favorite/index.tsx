import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CardVideo from '../../components/CardVideo';
import { FaHeart } from "react-icons/fa";
import './Favorite.scss';

function Favorite() {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const store = localStorage.getItem('favorites');
        if (!store) return
        setFavorite(JSON.parse(store))
    }, []);

    function removeFavorite(video: any) {
        let array = favorite;
        
        array.map((item: any, index: number) => {
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
                                        video={video}
                                        id={video.id}
                                    />
                                    <div className="coluna__favorite">
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