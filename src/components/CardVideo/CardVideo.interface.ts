export interface CardField {
    id: {
        videoId: string
    },
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