import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import Favorite from '../pages/Favorite';

describe('Videos listados como favoritos', () => {
    it('Deve conseguir remover o video do favorito', async () => {
        const {  getByTestId } = render(<Favorite />);
        const btnRemoveFavorito = await waitFor(() => getByTestId('removefavorito'));
        fireEvent.click(btnRemoveFavorito);
        expect(btnRemoveFavorito).toBeNull()
    })
});