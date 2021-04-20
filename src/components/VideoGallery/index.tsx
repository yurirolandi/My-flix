import react from 'react';
import { useHistory } from 'react-router-dom'
import './VideoGallery.scss'

interface galleryField {
    thumb: string,
    title: string,
    text: string,
    id: string,
}

export default function VideoGallery( props : galleryField) {
        
    const history = useHistory();

    const handleVideoClick = () => {
        history.push(`/watch/${props.id}`)
     }
    return (
        <>
            <div className="gallery" onClick={handleVideoClick}>
                <div className="gallery-container">
                    <div className="gallery-container__header">
                        <img src={props.thumb} alt="" />
                    </div>
                    <div className="gallery-container__footer">
                        <div className="gallery-footer">
                            <div className="gallery-footer__text">
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