import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar';
import CardVideo from '../../components/CardVideo/CardVideo';
import requestApi from '../../services/api';

function Home() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        requestApi.get('/videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'BR',
                maxResults: 20
            }
        }).then((response) => {
            setVideo(response.data.items)
        })
    }, []);
   

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <CategoriesBar />

                <div className="container__grid">
                    {
                        video.length > 0 &&
                        video.map((video: any, index: number) => {

                            return (<div className="coluna" key={index}>
                                <CardVideo
                                    thumb={video.snippet.thumbnails.high.url}
                                    logo="https://yt3.ggpht.com/ytc/AAUvwninj1E2MC-2aA4iQ3H68k3NvsHDjY36yQhMIJnD=s68-c-k-c0x00ffffff-no-rj"
                                    title={video.snippet.title}
                                    text={video.snippet.channelTitle}
                                    id={video.id}

                                />
                            </div>)
                        })
                    }

                </div>
            </div>
        </>
    );
}
export default Home;