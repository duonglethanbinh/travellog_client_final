import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import About from '../About/About';
import Contact from '../Contact/Contact';
import Places from '../Places/Places';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Signin from '../Signin/Signin'
import Register from '../Register/Register';
import Blogs from '../Blogs/Blogs';
import Profile from '../Profile/Profile';
import Update from '../Blogs/Update';
import UpdateP from '../Places/Update';
class RouterURL extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route path="/aboutme">
                    <About />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/places">
                    <Places />
                </Route>
                <Route path="/blogs">
                    <Blogs />
                </Route>
                <Route path="/update/:Pid" component={Update} />
                <Route path="/upd/:Pid" component={UpdateP} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/profile" component={Profile} />
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        );
    }
}
export default RouterURL;