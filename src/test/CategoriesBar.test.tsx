import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';

describe('Teste Home Component', () => {
    it('Deve buscar video de acordo com o campo de busca', async () => {
        const { container } = render(<Home />);
        const categorias: any = container.querySelector("div.categoriesBar-wrapper > div > div:nth-child(2)");
        fireEvent.keyPress(categorias, {key: "Enter", code: 13});
        screen.getByText('React Js', { exact: false });

        const video: any = container.querySelector('.focusable');
        fireEvent.keyPress(video, {key: "Enter", code: 13});       

    });
});
