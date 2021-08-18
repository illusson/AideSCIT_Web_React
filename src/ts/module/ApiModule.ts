import {CurlCall, CurlClientBuilder, CurlRequestBuilder, FormBodyBuilder} from "../core/util/CurlUtil";

export class ApiModule {
    public static readonly debug: boolean = true;

    private static readonly API_HOST: string = "https://api.sgpublic.xyz/aidescit"
    public static readonly METHOD_GET: number = 0
    public static readonly METHOD_POST: number = 1

    private readonly access_token: string = "";
    private readonly refresh_token: string = "";

    constructor(access_token: string = "", refresh_token: string = "") {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    public getLoginCall(username: string, password: string): CurlCall {
        const args = new Map<string, any>()
            .set("password", password)
            .set("username", username);
        return this.onReturn("login", args, ApiModule.METHOD_POST, true);
    }

    public getSpringboardCall(): CurlCall {
        const url = "springboard.php"
        const args = new Map<string, any>()
            .set("access_token", this.access_token)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true);
    }

    public getRefreshTokenCall(): CurlCall {
        const url = "token.php"
        const args: Map<string, any> = new Map<string, any>()
            .set("access_token", this.access_token)
            .set("refresh_token", this.refresh_token)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true);
    }

    public getSentenceCall(): CurlCall {
        return this.onReturn("https://v1.hitokoto.cn/?encode=json");
    }

    public getDayCall(): CurlCall {
        return this.onReturn("day")
    }

    public getInfoCall(): CurlCall {
        const url = "info"
        const args: Map<string, any> = new Map<string, any>()
            .set("access_token", this.access_token)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true)
    }

    public getTableCall(year: string, semester: number): CurlCall {
        const url = "schedule"
        const args: Map<string, any> = new Map<string, any>()
            .set("access_token", this.access_token)
            .set("semester", semester)
            .set("year", year)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true);
    }

    public getExamCall(): CurlCall {
        const url = "exam"
        const args: Map<string, any> = new Map<string, any>()
            .set("access_token", this.access_token)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true);
    }

    public getAchievementCall(year: string, semester: number): CurlCall {
        const url = "achieve"
        const args: Map<string, any> = new Map<string, any>()
            .set("access_token", this.access_token)
            .set("semester", semester)
            .set("year", year)
        return this.onReturn(url, args, ApiModule.METHOD_POST, true);
    }

    private onReturn(url: string, argArray: Map<string, any> = new Map<string, any>(),
                     method: number = ApiModule.METHOD_GET, withSign: Boolean = true): CurlCall {
        let url_final;
        if (url.substr(0, 4) === "http"){
            url_final = url;
        } else {
            url_final = ApiModule.API_HOST + "/" + url;
        }
        let app_secret = ""
        if (withSign){
            app_secret = "866e8fed1ce94b9193f44479e70bbe87"
            argArray.set("ts", ApiModule.TS)
                .set("platform", "web")
                .set("app_key", "65b2b12ffd98edb9")
        }
        const form_builder = new FormBodyBuilder();
        if (argArray.size !== 0){
            Object.keys(argArray).sort().forEach(function (key) {
                form_builder.add(key, argArray.get(key));
            })
        }
        const form = form_builder.build(app_secret);

        const client = new CurlClientBuilder()
            .followLocation(false)
            .setTimeout(5)
            .build();
        const request_builder = new CurlRequestBuilder();
        if (method === ApiModule.METHOD_POST){
            request_builder.post(form);
        } else if (argArray.size !== 0){
            url_final = url_final + "?" + form.getFormBody()
        }
        request_builder.url(url_final);
        const request = request_builder.build();
        return client.newCall(request);
    }

    static get TS(){
        return Date.parse(new Date().toUTCString()) / 1000;
    }
}