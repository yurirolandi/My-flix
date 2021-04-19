import React from "react";
import useGet from '../../hook/useGet';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar';
import CardVideo from '../../components/CardVideo/CardVideo';

function Home() {

    const video = useGet('/videos', {
        params: {
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'BR',
            maxResults: 20
        }
    });    
  

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <CategoriesBar />

                <div className="container__grid">
                    {
                        video.data.length > 0 &&
                        video.data.map((video: any, index: number) => {

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