
export interface GaleriaVideos {
    id: string,
    snippet: {
        channelId: string;
        channelTitle: string;
        title: string;
        thumbnails: {
            default: {
                url: string;
            }
        }
    };
    statistics: {
        commentCount: string;
        dislikeCount: string;
        favoriteCount: string;
        likeCount: string;
        viewCount: string;
    }
}

export interface CommentsVideo {
    id: string;
    snippet: {
        topLevelComment: {
            snippet: {
                authorProfileImageUrl: string;
                authorDisplayName: string;
                textDisplay: string;
            }
        }
    }
}