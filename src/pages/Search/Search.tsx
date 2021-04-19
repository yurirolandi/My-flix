import React, { ChangeEvent, useRef, useState } from "react";
import useGet from '../../hook/useGet';
import Keyboard from "react-simple-keyboard";
import Sidebar from '../../components/Sidebar/Sidebar';
import CardVideo from '../../components/CardVideo/CardVideo';
import Header from '../../components/Header/Header';
import requestApi from '../../services/api';
import { FaKeyboard, FaSearch } from "react-icons/fa";
import './Search.css';

function Search() {
    const [input, setInput] = useState("");
    const [layout, setLayout] = useState("default");
    const keyboard = useRef<any>();
    const [search, setSearch] = useState([]);
    const [keyOn, setkeyOn] = useState(true);

    const video = useGet('/videos', {
        params: {
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'BR',
            maxResults: 20
        }
    });

    const onChange = (input: string) => {
        setInput(input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button: string) => {

        if (button === "{shift}" || button === "{lock}") handleShift();

        if (button === "{enter}") handleSubmit()
    };

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setInput(input);
        keyboard.current.setInput(input);
    };

    async function SearchVideos(value: string) {
        const response = await requestApi.get('/search', {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: value,
                type: 'video',
            }
        })
        setSearch(response.data.items)

        return response;
    }

    const handleSubmit = () => {
        SearchVideos(input)
        setkeyOn(false)
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="container__form">
                    <input type="text"
                        className="form__search"
                        placeholder="Pesquisar"
                        value={input}
                        onChange={onChangeInput}
                    />

                    <div className="form__icon" onClick={() => setkeyOn(true)}>
                        <FaKeyboard size={24} />
                    </div>

                    <div className="header__button">
                        <button type='submit' onClick={handleSubmit}><FaSearch size={20} /></button>
                    </div>
                </div>
                <div className="container__grid">
                    {search.length > 0 && search.map((video: any, index: number) => {
                        return (
                            <div key={index}>
                                <CardVideo
                                    thumb={video.snippet.thumbnails.default.url}
                                    logo="https://yt3.ggpht.com/ytc/AAUvwninj1E2MC-2aA4iQ3H68k3NvsHDjY36yQhMIJnD=s68-c-k-c0x00ffffff-no-rj"
                                    title={video.snippet.title}
                                    text="Descrição"
                                    id={video.id}       
                                />
                            </div>
                        )
                    })
                    }
                    {
                        search.length === 0 && video.data.length > 0 && video.data.length > 0 &&
                        video.data.map((video: any, index: number) => {

                            return (<div className="coluna" key={index}>
                                <CardVideo
                                    thumb={video.snippet.thumbnails.high.url}
                                    logo="https://yt3.ggpht.com/ytc/AAUvwninj1E2MC-2aA4iQ3H68k3NvsHDjY36yQhMIJnD=s68-c-k-c0x00ffffff-no-rj"
                                    title={video.snippet.title}
                                    text={video.snippet.channelTitle}
                                    id={video.id}       
                                />
                            </div>)
                        })
                    }
                </div>
                <div className={keyOn ? "container__keyboard" : "container__keyboard off"}>
                    <Keyboard
                        keyboardRef={(r: any) => (keyboard.current = r)}
                        layoutName={layout}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
        </>
    );
}
export default Search;