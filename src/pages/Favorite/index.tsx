import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CardVideo from '../../components/CardVideo';
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { ListaVideos, VideoFavoritoId } from '../../components/types/video.interface';
import './Favorite.scss';


function Favorite() {
    const history = useHistory();
    const [favorite, setFavorite] = useState([]);
    const notify = (text: string) => toast.success(text);

    useEffect(() => {
        const store = localStorage.getItem('favorites');
        if (!store) return
        setFavorite(JSON.parse(store))
    }, []);

    function removeFavorite(video: VideoFavoritoId) {
        let array = favorite;

        array.forEach((item: VideoFavoritoId, index: number) => {
            if (item.id === video.id) {
                array.splice(index, 1);
                setFavorite([...array])
                localStorage.setItem('favorites', JSON.stringify(array));
                notify("Video removido como favorito com sucesso!");
            };
        })
    }


   function handleGoHome(){
        history.push('/')
    }


    return (
        <SpatialNavigation>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="container__grid">

                    {
                        favorite.length > 0 ?
                            favorite.map((video: ListaVideos, index: number) => {

                                return (<div className="coluna" key={index}>
                                    <CardVideo
                                        video={video}
                                        id={video.id}
                                    />
                                    <div className="coluna__favorite">
                                        <Focusable onClickEnter={() => removeFavorite(video)}>
                                            <button data-testid="removefavorito"
                                                onClick={() => removeFavorite(video)}>
                                                <FaHeart color="red" size={24} />
                                            </button>
                                        </Focusable>
                                    </div>
                                </div>)
                            }) : <div className="coluna__notfound">
                                    <h1 data-testid="sem-favorito">Você não tem nenhum video como favorito!</h1>
                                    <Focusable onClickEnter={handleGoHome}><button onClick={handleGoHome}>Voltar</button></Focusable>
                                </div>
                    }
                </div>
                <ToastContainer />
            </div>
        </SpatialNavigation>
    );
}
export default Favorite;