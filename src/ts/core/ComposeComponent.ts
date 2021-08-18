import React from "react";
import {SharedPreferences} from "./SharedPreferences";
import 'antd/dist/antd.css';

export class ComposeComponent<T> extends React.Component<T, any> {
    protected getSharedPreference(name: string): SharedPreferences {
        return SharedPreferences.getInterface(name)
    }
}