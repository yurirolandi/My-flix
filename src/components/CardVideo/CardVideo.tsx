import react from 'react';
import { useHistory } from 'react-router-dom'
import './CardVideo.css'

interface CardField {
    thumb: string,
    logo: string,
    title: string,
    text: string,
    id: string,
}

export default function CardVideo( props : CardField) {
        
    const history = useHistory();

    const handleVideoClick = () => {
        history.push(`/watch/${props.id}`)
     }
    return (
        <>
            <div className="card" onClick={handleVideoClick}>
                <div className="card-content">
                    <div className="card-header">
                        <img src={props.thumb} alt="" />
                    </div>
                    <div className="card-footer">
                        <div className="card-footer__container">
                            <div className="card-logo">
                                <img src={props.logo} alt="" />
                            </div>
                            <div className="card-text">
                                <h3>{props.title}</h3>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}