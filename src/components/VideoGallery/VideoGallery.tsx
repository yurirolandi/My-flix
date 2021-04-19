import react from 'react';
import { useHistory } from 'react-router-dom'
import './VideoGallery.css'

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
                <div className="gallery-content">
                    <div className="gallery-header">
                        <img src={props.thumb} alt="" />
                    </div>
                    <div className="gallery-footer">
                        <div className="gallery-footer__container">
                            <div className="gallery-text">
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