import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import MediaPlayer from '../pages/MediaPlayer';

describe('Assistindo o video', () => {
    it('Deve Permitir poder favoritar o video', async () => {
        const { getByTestId } = render(<MediaPlayer />);
        const icone = await waitFor(() => getByTestId('btn-favorito'));
        const textoSalvo = 'Video salvo como favorito com sucesso!'

        fireEvent.click(icone);
        const texto = await screen.findAllByText(textoSalvo)
        expect(texto).toBeInTheDocument()
    });
    it('Deve Permitir poder desmarcar o favoritar video', async () => {
        const { getByTestId } = render(<MediaPlayer />);
        const icone = await waitFor(() => getByTestId('btn-favorito'));
        const textoSalvo = 'Video removido como favorito com sucesso!'

        fireEvent.click(icone);
        const texto = await screen.findAllByText(textoSalvo)
        expect(texto).toBeInTheDocument()
    })
})