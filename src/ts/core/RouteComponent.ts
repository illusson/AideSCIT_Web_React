import {RouteComponentProps} from "react-router-dom"
import 'antd/dist/antd.css';
import {MenuTheme} from "antd";
import {ComposeComponent} from "./ComposeComponent";

export class RouteComponent extends ComposeComponent<RouteComponentProps> {
    protected readonly theme = {
        menu: 'light' as MenuTheme
    }

    protected redirect(url: string) {
        this.props.history.replace(url)
    }
}