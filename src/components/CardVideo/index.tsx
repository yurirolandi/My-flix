import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import requestApi from '../../services/api';
import './CardVideo.css';

interface CardField {
    id: string,
    video: {
        snippet: {
            channelId: string,
            channelTitle: string,
            title: string,
            thumbnails: {
                high: {
                    url: string
                }
            },
        }
    }
}

export default function CardVideo(props: CardField) {

    const [iconChannel, setIconChannel] = useState<any>(null);
    const history = useHistory();

    useEffect(() => {
        requestApi.get('/channels', {
            params: {
                part: 'snippet',
                id: props.video.snippet.channelId
            }
        }).then((response) => {
            setIconChannel(response.data.items[0].snippet.thumbnails.default)
        })
    }, []);


    const handleVideoClick = () => {
        history.push(`/watch/${props.id}`)
    }

    return (
        <>
            <div className="card" onClick={handleVideoClick}>
                <div className="card-content">
                    <div className="card-header">
                        <img src={props.video.snippet.thumbnails.high.url} alt="" />
                    </div>
                    <div className="card-footer">
                        <div className="card-footer__container">
                            <div className="card-logo">
                                <img src={iconChannel?.url} alt="" />
                            </div>
                            <div className="card-text">
                                <h3>{props.video.snippet.title}</h3>
                                <p>{props.video.snippet.channelTitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}