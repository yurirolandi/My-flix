import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CardVideo from '../components/CardVideo';

describe('Testa o Componente Card Video', () => {

    const video = {
        "id": {
            "videoId": "Vfd7H69OnM0"
        },
        "snippet": {
            "channelId": "UCNUQK9mQoqi4yNXw2_Rj6SA",
            "title": "Teste Mock component",
            "description": "Ouça em todas as plataformas 2021",
            "thumbnails": {
                "high": {
                    "url": "https://i.ytimg.com/vi/Vfd7H69OnM0/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
            },
            "channelTitle": "GR6 EXPLODE",
            "defaultAudioLanguage": "pt"
        }
    };

    const VideoId = video.id;

    it('Deve renderizar o componente CardVideo', async () => {
        const { getByTestId } = render(<CardVideo
            video={video}
            id={VideoId}
        />);

        const title = await waitFor(() => getByTestId('title-text'));
        expect(title).toHaveTextContent('Teste Mock component')

    })
})