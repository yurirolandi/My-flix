import requestApi from './api';

export const youtubeServices = {
    getChannelVideos: (id: string) => {
        try {
            return requestApi.get('/videos', {
                params: {
                    part: 'snippet,statistics',
                    id: id,
                }
            }).then((response) => {
                return response.data.items
            })
        } catch (error) {
            console.log('Ocorreu um erro em getChannelVideos', error);

        }
    },
    getComment: (id: string) => {
        try {
            return requestApi.get('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id,
                },
            }).then((response) => {
                return response.data.items;
            })
        } catch (error) {
            console.log('Ocorreu um erro em getComment', error);
        }
    },
    getPopularVideos: () => {
        try {
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
        } catch (error) {
            console.log('Ocorreu um erro em getPopularVideos', error);
        }
    },
    getSearch: (value: string) => {
        try {
            return requestApi.get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    q: value,
                    type: 'video',
                }
            }).then((response) => {
                return response.data.items
            })
        } catch (error) {
            console.log('Ocorreu um erro em getSearch', error);
        }
    },
    getChannels: (id: string) => {
        try {
            return requestApi.get('/channels', {
                params: {
                    part: 'snippet',
                    id: id
                }
            }).then((response) => {
                return response.data.items[0].snippet.thumbnails.default
            })
        } catch (error) {
            console.log('Ocorreu um erro em getChannels', error);
        }
    }
}