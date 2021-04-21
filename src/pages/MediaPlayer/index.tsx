import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import { youtubeServices } from '../../services/youtube';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Comment from '../../components/Comment';
import VideoGallery from '../../components/VideoGallery';
import './MediaPlayer.scss';


function Watch() {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);
    const [comment, setComment] = useState([]);
    const [favorites, setFavorites] = useState([] as Array<number>);
    const [activeElement, setActiveElement] = useState(false);
    const [player, setPlayer] = useState<any>(null);
    const [pause, setPause] = useState(false);

    const notify = (text: string) => toast.success(text);

    const opts: any = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
        },
    };


    useEffect(() => {
        (async function () {
            const channel = youtubeServices.getChannelVideos(id);
            const comment = youtubeServices.getComment(id);
            const popularVideos = youtubeServices.getPopularVideos();


            Promise.all([channel, comment, popularVideos]).then((data) => {
                setVideos(data[0]);
                setComment(data[1]);
                setGalleryVideos(data[2]);
              });
        }())
    }, [id])


    function handleFavorite(video: any) {
        let array = favorites;
        let addArray = true;

        array.forEach((item: any, index: number) => {
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

    function handlePlayer(event: any) {
        setPlayer(event.target);
    }

    function onPlay() {
        if (!pause) {
            player.pauseVideo();
            setPause(true)
        } else {
            player.playVideo();
            setPause(false)
        }

    }


    return (
        <SpatialNavigation>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="media-grid">
                    <div className="media-grid__player">
                        <Focusable onClickEnter={() => {
                            onPlay();
                        }}>
                            <YouTube videoId={`${id}`} opts={opts} onReady={handlePlayer} />
                        </Focusable>
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
                                                <Focusable onClickEnter={() => handleFavorite(video)}><span><FaHeart className={activeElement ? 'active' : ''} /> <p>Favoritar</p></span></Focusable>

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
        </SpatialNavigation>
    );
}
export default Watch;