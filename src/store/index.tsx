import React, { ReactNode, createContext, useState } from 'react';
import { ListaVideos } from '../components/types/video.interface'

interface Props {
    children: ReactNode
}
interface SearchVideos {
    id: string
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


const initialState: any = {
    video: []
};

console.log('initialState', initialState);



export const appContext = createContext(initialState);


function Store(props: Props) {
    const [state, setState] = useState(initialState);
 
    function updateVideo(key: string, value: ListaVideos | SearchVideos) {

        setState({
            ...state,
            [key]: value
        })
    }

    return (
        <appContext.Provider value={{
            video: state.video,
            setVideo: (value: any) => updateVideo('video', value)
        }}>
            {props.children}
        </appContext.Provider>
    )

}

export default Store;