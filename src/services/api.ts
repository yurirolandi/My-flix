import axios from 'axios';

const requestApi = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyCRJF4eFc3m3ifxTuBXwAzuuThoVpPTJok',
    },
});

export default requestApi;