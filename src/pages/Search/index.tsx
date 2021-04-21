import React, { ChangeEvent, useRef, useState, useEffect, ChangeEventHandler, ButtonHTMLAttributes } from "react";

// import Keyboard from "react-simple-keyboard";
import Sidebar from '../../components/Sidebar';
import CardVideo from '../../components/CardVideo';
import Header from '../../components/Header';
import { youtubeServices } from '../../services/youtube';
import { FaKeyboard, FaSearch, FaArrowLeft } from "react-icons/fa";
// @ts-ignore
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';
import './Search.scss';


function Search() {
    const [input, setInput] = useState("");
    const [search, setSearch] = useState([]);
    const [keyOn, setkeyOn] = useState(true);
    const [video, setVideo] = useState([]);


    const keyLetter = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "BACKSPACE"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ENTER"],
        ["z", "x", "c", "v", "b", "n", "m", ",", "."],
        ["SPACE"]
    ];


    useEffect(() => {
        (async function () {
            const popularVideos = await youtubeServices.getPopularVideos();
            setVideo(popularVideos);
        }())
    }, []);

    const onChangeInput = (event: string|any) => {

        let stateNow = input;
        if (event.type === 'change') {
            setInput(event.target.value)
        }
        switch (event) {
            case 'ENTER':
                handleSubmit();
                setInput('');
                break;
            case 'SPACE':
                setInput(stateNow += ' ');
                break;
            case 'BACKSPACE':
                setInput(input.substring(0, input.length - 1));
                break;

        }
        if (event === 'SPACE' || event === 'BACKSPACE' || event === 'ENTER') return
        setInput(stateNow += event);
    };

    async function SearchVideos(value: string) {
        const response = await youtubeServices.getSearch(value);
        setSearch(response);
        return response;
    }

    const handleSubmit = () => {
        SearchVideos(input)
        setkeyOn(false)
    }

    return (
        <SpatialNavigation>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="header-form">
                    <div className="form">
                        <Focusable>
                            <input type="text"
                                className="form__search"
                                placeholder="Pesquisar"
                                value={input}
                                onChange={onChangeInput}
                            />
                        </Focusable>


                        <div className="form__icon" onClick={() => setkeyOn(true)}>
                            <Focusable> <FaKeyboard size={24} /> </Focusable>
                        </div>

                        <div className="form__button">
                            <Focusable> <button type='submit' onClick={handleSubmit}><FaSearch size={20} /></button></Focusable>
                        </div>
                    </div>
                </div>
                <div className="container__grid">
                    {search.length > 0 && search.map((video: any, index: number) => {
                        return (
                            <div key={index}>
                                <CardVideo
                                    video={video}
                                    id={video.id.videoId}
                                />
                            </div>
                        )
                    })
                    }
                    {
                        search.length === 0 && video.length > 0 &&
                        video.map((video: any, index: number) => {

                            return (<div className="coluna" key={index}>
                                <CardVideo
                                    video={video}
                                    id={video.id}
                                />
                            </div>)
                        })
                    }
                </div>

                <div className={keyOn ? "keyboard" : "keyboard keyboard--hidden"}>
                    <div className="keyboard-keys">
                        <div className="keyboard-keys__container">
                            {keyLetter[0].map((items: string, index: number) => {
                                return (
                                    <Focusable onClickEnter={() => onChangeInput(items)} key={index}>
                                        <button type="button"
                                            value={items}
                                            className="keyboard-key"
                                        >{items !== 'BACKSPACE' ? items : <FaArrowLeft />}
                                        </button>
                                    </Focusable>
                                )
                            })
                            }
                        </div>
                        <div className="keyboard-keys__container">
                            {keyLetter[1].map((items: string, index: number) => {
                                return (
                                    <Focusable onClickEnter={() => onChangeInput(items)}>
                                        <button type="button"
                                            value={items}
                                            className="keyboard-key"
                                            key={index}
                                        >{items}
                                        </button>
                                    </Focusable>
                                )
                            })
                            }
                        </div>
                        <div className="keyboard-keys__container">
                            {keyLetter[2].map((items: string, index: number) => {
                                return (
                                    <Focusable onClickEnter={() => onChangeInput(items)}>
                                        <button
                                            type="button"
                                            value={items}
                                            className="keyboard-key"
                                            key={index}
                                        >{items}
                                        </button>
                                    </Focusable>
                                )
                            })
                            }
                        </div>
                        <div className="keyboard-keys__container">
                            {keyLetter[3].map((items: string, index: number) => {
                                return (
                                    <Focusable onClickEnter={() => onChangeInput(items)}>
                                        <button type="button"
                                            value={items}
                                            className="keyboard-key"
                                            key={index}
                                        >{items}
                                        </button>
                                    </Focusable>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </SpatialNavigation>
    );
}
export default Search;