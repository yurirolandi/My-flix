import React from 'react'
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

    return (
        <div className='categoriesBar'>
            <div className="categoriesBar__container">
                <div className="arrow">
                    <FaAngleLeft />
                </div>
                {categories.map((value: string, i: number) => (
                    <div
                        key={i}
                        className={value === 'Tudo' ? 'categories active' : 'categories'}>
                        {value}
                    </div>
                ))}
                <div className="arrow">
                    <FaAngleRight />
                </div>
            </div>
        </div>
    )
}