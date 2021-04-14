import react from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';

function AppRouter () {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/post/:id">
                    <Post />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>

        </Router>
    );

}

export default AppRouter