import requestApi from './api';

export const youtubeServices = {
    getChannelVideos: (id: string) => {
        return requestApi.get('/videos', {
            params: {
                part: 'snippet,statistics',
                id: id,
            }
        }).then((response) => {
            return response.data.items
        })
    },
    getComment: (id: string) => {
        return requestApi.get('/commentThreads', {
            params: {
                part: 'snippet',
                videoId: id,
            },
        }).then((response) => {
            return response.data.items;
        })
    },
    getPopularVideos: () => {
        return requestApi.get('/videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'BR',
                maxResults: 20
            }
        }).then((response) => {
            return response.data.items
        })
    },
    getSearch: (value: string) => {
        return requestApi.get('/search', {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: value,
                type: 'video',
            }
        }).then(response => {
            return response.data.items
        })
    },
    getChannels: (id: string) => {
        return requestApi.get('/channels', {
            params: {
                part: 'snippet',
                id: id
            }
        }).then((response) => {
            return response.data.items[0].snippet.thumbnails.default
        })
    }
}