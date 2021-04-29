import React from 'react';
import axios from 'axios';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import MediaPlayer from '../pages/MediaPlayer/';

describe('Assistindo o video', () => {
    it('Deve Permitir poder favoritar o video', async () => {
        const rota = '/watch/XQxitgyZ_S4';
        const history = createMemoryHistory()

        const { container } = render(<Router history={history}>
            <MediaPlayer />
        </Router>);

        history.push(rota);
        screen.getByText('Favoritar', { exact: false });

        const btnFavorito: any = container.querySelector('.btn-favorito-off');
        fireEvent.click(btnFavorito)

        const textoSalvo = 'Video salvo como favorito com sucesso!'

        const texto = await screen.findAllByText(textoSalvo)

        expect(texto).toBeTruthy();
    });

})
