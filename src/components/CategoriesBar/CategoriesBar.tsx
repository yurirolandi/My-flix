import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './CategoriesBar.css';

const categories = [
    'Tudo',
    'React js',
    'Angular js',
    'React Native',
    'Podcast',
    'Javascript',
    'Musicas',
    'Neymar',
    'Python',
    'Oceano',
    'Tubarões',
    'The Flash',
]

export default function CategoriesBar() {
    const [value, setValue] = useState(0);
    const [activeElement, setActiveElement] = useState('Tudo')

    function arrowLeft() {

        if (value === -600) return;
        if (value === value) {
            setValue(value + -200)
        }
    }

    function arrowRight() {
        if (value === 0) return;
        if (value === value) {
            setValue(value + 200)
        }
    }

    return (
        <div className='categoriesBar'>
            <div className="categoriesBar__container">
                <div className="arrow" onClick={() => arrowLeft()}>
                    <FaAngleLeft />
                </div>
                <div className="categoriesBar__wrapper">
                    <div className="categoriesBar__items" style={{ transform: `translateX(${value}px)` }}>
                        {categories.map((value: string, index: number) => (

                            <div
                                key={index}
                                onClick={() => setActiveElement(value)}
                                className={activeElement === value ? 'categories active' : 'categories'}
                            >
                                {value}
                            </div>

                        ))}
                    </div>
                </div>
                <div className="arrow" onClick={() => arrowRight()}>
                    <FaAngleRight />
                </div>
            </div>
        </div>
    )
}