import React, { useEffect, useState } from "react";
import Sidebar from  '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Comment from '../../components/Comment/Comment';
import VideoGallery from '../../components/VideoGallery/VideoGallery';
import requestApi from '../../services/api';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import './Watch.css';


function Watch() {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);
    const [comment, setComment] = useState([]);
    const [favorites, setFavorites] = useState([] as Array<number>);

    useEffect(() => {
        requestApi.get('/videos', {
            params: {
                part: 'snippet,statistics',
                id: id,
            }
        }).then((response) => {
            setVideos(response.data.items)
        })
        requestApi.get('/commentThreads', {
            params: {
                part: 'snippet',
                videoId: id,
            },
        }).then((response) => {
            setComment(response.data.items);
        })

        requestApi.get('/videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'BR',
                maxResults: 20
            }
        }).then((response) => {
            setGalleryVideos(response.data.items)
        })
    }, [id])

    function handleFavorite(video: any) {
        let array = favorites;
        let addArray = true;

        array.map((item: any, index: number) => {
            if (item.id === video.id) {
                array.splice(index, 1);
                addArray = false;
            };
        });
        if (addArray) {
            array.push(video)
        }
        setFavorites([...array])

       localStorage.setItem('favorites', JSON.stringify(array));
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="watch-grid">
                    <div className="watch-player">
                        <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            frameBorder='0'
                            allowFullScreen
                            width='100%'
                            height='100%'></iframe>
                    </div>
                    <div className="watch-playlist">
                        <div className="watch-playlist__container">

                            {galleryVideos.length > 0 && galleryVideos.map((video: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <VideoGallery
                                            thumb={video.snippet.thumbnails.default.url}
                                            title={video.snippet.title}
                                            text={video.snippet.channelTitle}
                                            id={video.id}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="whatch-information">
                        <div className="whatch-information-video">
                            {
                                videos.length > 0 && videos.map((video: any, index: number) => {
                                    return (
                                        <div className="info" key={index}>
                                            <div className="info-title">
                                                <h3>{video.snippet.channelTitle}</h3>
                                                <p>{video.statistics.viewCount} visualizações</p>
                                                <p>{video.statistics.commentCount} comentários</p>
                                            </div>
                                            <div className="info-likeds">
                                                <span><FaThumbsUp /> <p>{video.statistics.likeCount} Mil</p></span>
                                                <span><FaThumbsDown /> <p>{video.statistics.dislikeCount} Mil</p></span>
                                                <span onClick={() => handleFavorite(video)}><FaHeart /> <p>Favoritar</p></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="whatch-comments">
                            {comment.length > 0 && comment.map((comments: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Comment key={index}
                                            authorProfileImageUrl={comments.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                            authorDisplayName={comments.snippet.topLevelComment.snippet.authorDisplayName}
                                            textDisplay={comments.snippet.topLevelComment.snippet.textDisplay}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Watch;