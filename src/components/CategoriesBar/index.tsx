import React, { useState, useContext } from 'react';
import { youtubeServices } from '../../services/youtube';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import './CategoriesBar.scss';
import { appContext } from '../../store';

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
    const [activeElement, setActiveElement] = useState('Tudo');
    const { video, setVideo } = useContext(appContext)

    function arrowLeft() {

        if (value === -600) return;

        setValue(value + -200)

    }

    function arrowRight() {
        if (value === 0) return;

        setValue(value + 200)

    }

    async function handleClick(value: string) {
        setActiveElement(value);
        if (value === 'Tudo') {
            const response = await youtubeServices.getPopularVideos();
            setVideo(response)

        } else {
            const response = await youtubeServices.getSearch(value);
            setVideo(response)
        }
    }

    return (
        <SpatialNavigation>
            <div className='categoriesBar'>
                <div className="categoriesBar__container">
                    <div className="arrow" onClick={() => arrowLeft()}>
                        <FaAngleLeft />
                    </div>
                    <div className="categoriesBar-wrapper">
                        <div className="categoriesBar-wrapper__items" style={{ transform: `translateX(${value}px)` }}>
                            {categories.map((value: string, index: number) => (

                                <Focusable className="box" key={index} onClickEnter={() => handleClick(value)}>
                                    <div
                                        className={activeElement === value ? 'categories active' : 'categories'}
                                    >
                                        {value}
                                    </div>
                                </Focusable>

                            ))}
                        </div>
                    </div>
                    <div className="arrow" onClick={() => arrowRight()}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </SpatialNavigation>
    )
}