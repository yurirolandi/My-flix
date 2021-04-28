import react from 'react';
import { CommentType } from './Comment.interface'
import './Comment.scss';


export default function Comment(props: CommentType) {

    return (
        <div className="comment">
            <img src={props.authorProfileImageUrl} alt="Logo" />
            <div className="comment__content">
                <p>{props.authorDisplayName}</p>
                <p>{props.textDisplay}</p>
            </div>
        </div>
    );
}