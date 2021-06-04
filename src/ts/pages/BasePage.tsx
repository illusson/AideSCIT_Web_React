import {ReactComponentCompact} from "../core/ReactComponentCompact";
import {Route, Switch, withRouter} from "react-router-dom";
import React from "react";

class BasePage extends ReactComponentCompact {
    render() {
        const location = this.props.location
        return (
            <Switch location={location}>

            </Switch>
        )
    }
}

export default withRouter(BasePage)