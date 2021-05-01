import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoriesBar from '../components/CategoriesBar';

describe('Renderia o trilho de Categorias', () => {
    const categories = [
        'React js',
    ]

    it('Deve renderizar o trilho de categoria e escolher um', async () => {
        const { container } = render(<CategoriesBar categories={categories} />);

        const categoriaReact: any = container.querySelector('.focusable');

        fireEvent.keyPress(categoriaReact, { key: "Enter", code: 13 });

        expect(categoriaReact).toBeTruthy();
    });
});

