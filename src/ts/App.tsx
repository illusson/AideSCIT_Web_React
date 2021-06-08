import {ReactComponentCompact} from "./core/ReactComponentCompact";
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

class App extends ReactComponentCompact {
    render() {
        const location = this.props.location
        return (
            <Switch location={location}>
                <Route exact path={"/"} component={Welcome} />
                <Route exact path={"/login"} component={Login} />
                <Route path={"/home"} component={Home} />
            </Switch>
        )
    }
}

export default withRouter(App)