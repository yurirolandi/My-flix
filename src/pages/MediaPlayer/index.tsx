import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Comment from '../../components/Comment';
import VideoGallery from '../../components/VideoGallery';
import requestApi from '../../services/api';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import './MediaPlayer.scss';


function Watch() {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);
    const [comment, setComment] = useState([]);
    const [favorites, setFavorites] = useState([] as Array<number>);
    const [activeElement, setActiveElement] = useState(false);

    const notify = (text: string) => toast.success(text);

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
                setActiveElement(false);
                localStorage.setItem('favorites', JSON.stringify(array));
                notify("Video removido como favorito com sucesso!");
                return;
            };
        });
        if (addArray) {
            array.push(video)
            setActiveElement(true);
            setFavorites([...array])
            localStorage.setItem('favorites', JSON.stringify(array));
            notify("Video salvo como favorito com sucesso!");
        }
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="media-grid">
                    <div className="media-grid__player">
                        <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            frameBorder='0'
                            allowFullScreen
                            width='100%'
                            height='100%'></iframe>
                    </div>
                    <div className="media-grid__playlist">
                        <div className="media-grid__container">

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
                    <div className="media-grid__information">
                        <div className="media-grid-information-video">
                            {
                                videos.length > 0 && videos.map((video: any, index: number) => {
                                    return (
                                        <div className="information-box" key={index}>
                                            <div className="information-box__title">
                                                <h3>{video.snippet.channelTitle}</h3>
                                                <p>{video.statistics.viewCount} visualizações</p>
                                                <p>{video.statistics.commentCount} comentários</p>
                                            </div>
                                            <div className="information-box__likeds">
                                                <span><FaThumbsUp /> <p>{video.statistics.likeCount} Mil</p></span>
                                                <span><FaThumbsDown /> <p>{video.statistics.dislikeCount} Mil</p></span>
                                                <span onClick={() => handleFavorite(video)}><FaHeart className={activeElement ? 'active' : ''} /> <p>Favoritar</p></span>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="media-comments">
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
                <ToastContainer />
            </div>
        </>
    );
}
export default Watch;