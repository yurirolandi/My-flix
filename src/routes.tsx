import react from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/MediaPlayer';
import Favorite from './pages/Favorite';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/busca" component={Search} />
                <Route path="/Watch/:id" component={Watch} />
                <Route path="/favoritos" component={Favorite} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;