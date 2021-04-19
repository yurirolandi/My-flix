import react from 'react';
import './Comment.css';
interface CommentType {
    authorProfileImageUrl: string,
    authorDisplayName: string,
    textDisplay: string,
}

export default function Comment(props: CommentType) {
       
    return(
        <div className="comment">
            <img src={props.authorProfileImageUrl} />
            <div className="comment-body">
                <p>{props.authorDisplayName}</p>
                <p>{props.textDisplay}</p>
            </div>
        </div>
    );
}