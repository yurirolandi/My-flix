import react from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Watch from './pages/Watch/Watch';
import Favorite from './pages/Favorite/Favorite';

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