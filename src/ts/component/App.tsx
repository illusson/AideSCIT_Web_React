import '../../res/css/App.css';
import {RouteComponent} from "../core/RouteComponent";
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CSSTransitionGroup from "react-addons-css-transition-group";

class App extends RouteComponent {
    render() {
        const location = this.props.location
        return (
            <CSSTransitionGroup transitionName={"fade"} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <Switch key={location.pathname} location={location}>
                    <Route exact path={"/"} component={Welcome} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/home"} component={Home} />
                </Switch>
            </CSSTransitionGroup>
        )
    }
}

export default withRouter(App)