import React from "react";
import {SharedPreferences} from "./SharedPreferences";
import {RouteComponentProps} from "react-router-dom"
import 'antd/dist/antd.css';
import {MenuTheme} from "antd";

export class ReactComponentCompact extends React.Component<RouteComponentProps, any> {
    protected readonly theme = {
        menu: 'light' as MenuTheme
    }

    protected static setup = false

    protected getSharedPreference(name: string): SharedPreferences {
        return SharedPreferences.getInterface(name)
    }
}