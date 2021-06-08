import {ReactComponentCompact} from "../core/ReactComponentCompact";
import "../../res/css/Home.css"

import {withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import {HomeSiderData} from "../data/HomeSiderData";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends ReactComponentCompact {
    state = {
        collapsed: false,
        sider_items: new Array<HomeSiderData>(),
    };

    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout>
                <Header className={"primary-background"}>
                    <div className={"logo"} />
                </Header>
                <Content>
                    <Layout style={{ minHeight: '100vh'}}>
                        <Sider className={"primary-background"} collapsible collapsed={this.state.collapsed}
                               onCollapse={this.onCollapse}>
                            <Menu theme={this.theme.menu} mode={"inline"}>{
                                this.state.sider_items.map((data) => {
                                    if (data.child.length > 0){
                                        return (
                                            <SubMenu key={data.key} icon={data.icon} title={data.title}>{
                                                data.child.map((index) => {
                                                    return (
                                                        <Menu.Item key={index.key}
                                                                   onClick={() => this.props.history.replace(data.path)}>
                                                            {index.title}
                                                        </Menu.Item>
                                                    )
                                                })
                                            }</SubMenu>
                                        )
                                    } else {
                                        return (
                                            <Menu.Item key={data.key} icon={data.icon}
                                                       onClick={() => this.props.history.replace(data.path)}>
                                                {data.title}
                                            </Menu.Item>
                                        )
                                    }
                                })
                            }</Menu>
                        </Sider>
                    </Layout>
                </Content>
                <Footer>

                </Footer>
            </Layout>
        )
    }
}

export default withRouter(Home)