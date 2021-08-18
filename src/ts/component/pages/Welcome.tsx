import {RouteComponent} from "../../core/RouteComponent";
import "../../../res/css/Welcome.css"

import {withRouter} from "react-router-dom";
import ic_launcher from "../../../res/drawble/mipmap/ic_launcher.png"
import {Progress, Row} from "antd";

class Welcome extends RouteComponent {
    state = {
        setup_process: 0,
    };

    public componentDidMount() {
        this.setState({
            setup_process: 10,
        })
        // this.redirect("/home")
    }

    public render() {
        return (
            <div id={"welcome-base"}>
                <>
                    <Row>
                        <img id={"welcome-logo"} src={ic_launcher} alt={"logo"}/>
                    </Row>
                    <Row>
                        <Progress percent={this.state.setup_process} status={"active"} showInfo={false} />
                    </Row>
                </>
            </div>
        )
    }
}

export default withRouter(Welcome)