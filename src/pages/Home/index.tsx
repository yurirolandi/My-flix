import React, { useContext, useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CategoriesBar from '../../components/CategoriesBar';
import CardVideo from '../../components/CardVideo';
import SkeletonLoad from '../../components/SkeletonLoad'
import { youtubeServices } from '../../services/youtube';// @ts-ignore
import SpatialNavigation from 'react-js-spatial-navigation';
import { appContext } from "../../store";
import { ListaVideos } from '../../components/types/video.interface';



function Home() {

    const { video, setVideo } = useContext(appContext)


    useEffect(() => {
        (async function () {
            const popularVideos = await youtubeServices.getPopularVideos();
            setVideo(popularVideos)
        }())
    }, [])


    return (
        <SpatialNavigation>
            <Header />
            <Sidebar />

            <div className="container">
                <CategoriesBar />

                <div className="container__grid">
                    {
                        video ?
                            video.map((video: ListaVideos, index: number) => {

                                return (<div className="coluna" key={index}>

                                    <CardVideo
                                        video={video}
                                        id={video.id}
                                    />

                                </div>)
                            }) : [...Array(20)].map((index: number) => {
                                return (<div className="coluna" key={index}>
                                    <SkeletonLoad />
                                </div>)
                            })
                    }

                </div>
            </div>
        </SpatialNavigation>
    );
}
export default Home;