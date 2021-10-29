import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user/:id" component={User}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
