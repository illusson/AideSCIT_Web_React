import {ReactComponentCompact} from "../core/ReactComponentCompact";
import {withRouter} from "react-router-dom";
import "../../res/css/Welcome.css"
import ic_launcher from "../../res/drawble/mipmap/ic_launcher.png"
import {Progress, Row} from "antd";

class Welcome extends ReactComponentCompact {
    state = {
        setup_process: 0,
    };

    componentDidMount() {
        this.setState({
            setup_process: 10,
        })
    }

    render() {
        return (
            <div id={"welcome-base"}>
                <>
                    <Row>
                        <img id={"welcome-logo"} src={ic_launcher} alt={"logo"}/>
                    </Row>
                    <Row>
                        <Progress className={"welcome-loading"} percent={this.state.setup_process} status={"active"} showInfo={false} />
                    </Row>
                </>
            </div>
        )
    }
}

export default withRouter(Welcome)