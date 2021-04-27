export interface ListaVideos {
    id: {
        videoId: string
    },
    snippet: {
        channelId: string;
        channelTitle: string;
        title: string;
        thumbnails: {
            high:
            { url: string; };
            default: {
                url: string
            }
        };
    };

}


export interface VideoFavoritoId {
    id: {
        videoId: string
    },
}