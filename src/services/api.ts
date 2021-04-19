import axios from 'axios';

const requestApi = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: process.env.REACT_APP_YOUTUBE_KEY
    },
});

export default requestApi;