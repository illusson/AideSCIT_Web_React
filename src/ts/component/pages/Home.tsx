import {RouteComponent} from "../../core/RouteComponent";
import "../../../res/css/Home.css"

import {withRouter} from "react-router-dom";
import {Layout} from "antd";
import {HomeSiderData} from "../../data/HomeSiderData";
import ic_launcher from "../../../res/drawble/mipmap/ic_launcher.png";
import {Hidden, IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from "../view/DrawerMenu";

const { Header, Content, Footer } = Layout;

class Home extends RouteComponent {
    state = {
        open: false,
        sider_items: new Array<HomeSiderData>(),
    };

    public componentDidMount() {
        this.state.sider_items.push(
            new HomeSiderData(ic_launcher, "测试title", "测试key", "/home")
        )
        this.forceUpdate()
    }

    public render() {
        return (
            <Layout className={"page-base"}>
                <Header className={"primary-background home-header"}>
                    <IconButton onClick={() => this.setState({open: !this.state.open})}>
                        <MenuIcon />
                    </IconButton>
                    <img id={"home-logo"} src={ic_launcher} alt={"Logo"}/>
                </Header>
                <Content style={{display: "flex"}}>
                    <nav>
                        <Hidden smUp>
                            <DrawerMenu shown={"normal"} open={this.state.open} data={this.state.sider_items}
                                        redirect={this.redirect.bind(this)} onOpen={this.onDrawerOpen.bind(this)}
                                        onClose={this.onDrawerClose.bind(this)}/>
                        </Hidden>
                        <Hidden xsDown>
                            <DrawerMenu shown={"mobile"} open={true} data={this.state.sider_items}
                                        redirect={this.redirect.bind(this)} onOpen={this.onDrawerOpen.bind(this)}
                                        onClose={this.onDrawerClose.bind(this)}/>
                        </Hidden>
                    </nav>
                    <Layout>
                        <h2>工科助手</h2>
                    </Layout>
                </Content>
                <Footer>

                </Footer>
            </Layout>
        )
    }

    private onDrawerOpen(){
        this.setState({ open: true })
    }

    private onDrawerClose(){
        this.setState({ open: false })
    }
}

export default withRouter(Home)