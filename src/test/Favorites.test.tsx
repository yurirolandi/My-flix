import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Favorite from '../pages/Favorite';


describe('Videos listados como favoritos', () => {
   
    it('Deve Aparecer que não tenho nenhum video como favorito', async () => {
        const { getByTestId } = render(<Favorite />);
        const text = await waitFor(() => getByTestId('sem-favorito'));
        const valor = 'Você não tem nenhum video como favorito!'

        expect(text).toHaveTextContent(valor)
    })
});
