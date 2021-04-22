import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CategoriesBar from '../../components/CategoriesBar';
import CardVideo from '../../components/CardVideo';
import { youtubeServices } from '../../services/youtube';
// @ts-ignore
import SpatialNavigation from 'react-js-spatial-navigation';

function Home() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        (async function () {
            const popularVideos = await youtubeServices.getPopularVideos();
            setVideo(popularVideos);
        }())
    }, []);


    return (
        <SpatialNavigation>
            <Header />
            <Sidebar />

            <div className="container">
                <CategoriesBar />

                <div className="container__grid">
                    {
                        video.length > 0 ?
                        video.map((video: any, index: number) => {

                            return (<div className="coluna" key={index}>

                                <CardVideo
                                    video={video}
                                    id={video.id}
                                />

                            </div>)
                        }) : <h1>Op´s, ocorreu algum erro!</h1>
                    }

                </div>
            </div>
        </SpatialNavigation>
    );
}
export default Home;