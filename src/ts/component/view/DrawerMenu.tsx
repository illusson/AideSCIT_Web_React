import {Menu} from "antd";
import {ComposeComponent} from "../../core/ComposeComponent";
import {HomeSiderData} from "../../data/HomeSiderData";
import {SwipeableDrawer} from "@material-ui/core";
import * as React from "react";
import NodeImage from "./NodeImage";
const { SubMenu } = Menu;

export interface DrawerMenuProp {
    open: boolean,
    shown: 'mobile'|'normal'
    data: Array<HomeSiderData>,
    redirect: (url: string) => void,
    onClose: React.ReactEventHandler<{}>,
    onOpen: React.ReactEventHandler<{}>
}

class StaticProp {
    readonly variant: 'permanent' | 'persistent' | 'temporary'
    readonly marginTop: number|string
    readonly keepMounted: boolean
    readonly position: "fixed"|"unset"

    constructor(variant: 'permanent' | 'persistent' | 'temporary', marginTop: number|string,
                keepMounted: boolean, position: "fixed"|"unset") {
        this.variant = variant
        this.marginTop = marginTop
        this.keepMounted = keepMounted
        this.position = position
    }
}

class DrawerMenu extends ComposeComponent<DrawerMenuProp> {
    private static readonly propStatic: Map<string, StaticProp> = new Map<'mobile'|'normal', StaticProp>([
        ['mobile', new StaticProp("permanent", 0, true, "fixed")],
        ['normal', new StaticProp("temporary", "3em", false, "unset")]
    ])

    render() {
        const props: StaticProp = DrawerMenu.propStatic.get(this.props.shown)!
        return (
            <SwipeableDrawer container={document.body} open={this.props.open}
                             variant={props.variant} anchor="left"
                             className={"primary-background"} classes={{
                                 paper: "home-drawer", root: "primary-background"
                             }} color={"transparent"}
                             ModalProps={{keepMounted: props.keepMounted}}
                             onOpen={this.props.onOpen} onClose={this.props.onClose}>
                <div style={{height: props.marginTop}} />
                <Menu mode="inline">{
                    this.props.data.map((data) => {
                        if (data.child.length > 0){
                            return (
                                <SubMenu key={data.key} icon={
                                    <NodeImage src={data.icon}/>
                                } title={data.title}>{
                                    data.child.map((index) => {
                                        return (
                                            <Menu.Item key={index.key}
                                                       onClick={() => {this.props.redirect(data.path)}}>
                                                {index.title}
                                            </Menu.Item>
                                        )
                                    })
                                }</SubMenu>
                            )
                        } else {
                            return (
                                <Menu.Item key={data.key} icon={data.icon}
                                           onClick={() => {this.props.redirect(data.path)}}>
                                    {data.title}
                                </Menu.Item>
                            )
                        }
                    })
                }</Menu>
            </SwipeableDrawer>
        );
    }
}

export default DrawerMenu