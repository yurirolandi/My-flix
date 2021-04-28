import react, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import { youtubeServices } from '../../services/youtube';
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import { CardField } from './CardVideo.interface';
import './CardVideo.scss';



export default function CardVideo(props: CardField) {

    const [iconChannel, setIconChannel] = useState<any>(null);
    const history = useHistory();


    useEffect(() => {

        (async function () {
            const popularVideos = await youtubeServices.getChannels(props.video.snippet.channelId);
            setIconChannel(popularVideos);
        }()); // eslint-disable-next-line
    }, []); 



    const handleVideoClick = () => {
        props.id.videoId === undefined
            ? history.push(`/watch/${props.id}`)
            : history.push(`/watch/${props.id.videoId}`);
    }

    return (
        <SpatialNavigation>
            <Focusable onClickEnter={handleVideoClick}>
                <div className="card">
                    <div className="card-content">
                        <div className="card-content__header">
                            <img src={props.video.snippet.thumbnails.high.url} alt="" />
                        </div>
                        <div className="card-content__footer">
                            <div className="card-footer">
                                <div className="card-footer__logo">
                                    <img src={iconChannel?.url} alt="" />
                                </div>
                                <div className="card-footer__text">
                                    <h3>{props.video.snippet.title}</h3>
                                    <p>{props.video.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Focusable>
        </SpatialNavigation>
    );
}