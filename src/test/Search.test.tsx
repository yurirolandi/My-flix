import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Search from '../pages/Search';

describe('Teste Search Component', () => {
    it('Deve buscar video de acordo com o campo de busca', async () => {
        const { getByTestId } = render(<Search />);
        const inputCampo = await waitFor(() => getByTestId('form__search'));
        const valorInput = 'React Js'

        fireEvent.change(inputCampo, { target: { value: valorInput } });
        expect(inputCampo.value).toEqual(valorInput);

        const btn = await waitFor(() => getByTestId('form__btn'));
        fireEvent.click(btn);
    });
});
