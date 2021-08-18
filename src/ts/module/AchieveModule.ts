import {ApiModule} from "./ApiModule";
import {CurlCall, CurlCallback, CurlResponse, CurlToolException} from "../core/util/CurlUtil";
import {FailedMarkData} from "../data/FailedMarkData";
import {PassedMarkData} from "../data/PassedMarkData";
import {SharedPreferences} from "../core/SharedPreferences";

export class AchieveModule {
    private readonly access_token: string;

    constructor() {
        this.access_token = SharedPreferences.getInterface("user")
            .getString("access_token", "");
    }

    public get(school_year: string, semester: number, callback: AchievementCallback){
        const call: CurlCall = new ApiModule(this.access_token).getAchievementCall(school_year, semester);
        call.enqueue(new class implements CurlCallback {
            onResponse(call: CurlCall, response: CurlResponse, requestId: number) {
                if (response.code() === 200){
                    try {
                        const result = JSON.parse(response.body());
                        if (result["code"] === 200) {
                            localStorage.setItem("cache.achievement", response.body());
                            AchieveModule.parse(response.body(), callback);
                        } else {
                            callback.onFailure(-504, result["message"]);
                        }
                    } catch (e) {
                        callback.onFailure(-503, e.message);
                    }
                } else {
                    callback.onFailure(-505, "服务器内部出错");
                }
            }

            onFailure(call: CurlCall, exception: CurlToolException, requestId: number) {
                callback.onFailure(-501, "网络请求失败", exception)
            }
        }())
    }

    public static parse(response: string, callback: AchievementCallback){
        callback.onReadStart();
        const result: any = JSON.parse(response)["achievement"];
        const passed: any = result["passed"];
        if (passed["count"] > 0){
            const data: any = passed["data"];
            for (let i = 0; i < data.length; i++){
                const data_index = data[i];
                callback.onReadPassed(new PassedMarkData(
                    data_index["name"],
                    data_index["mark"],
                    data_index["retake"],
                    data_index["rebuild"],
                    data_index["credit"]
                ))
            }
        }
        const failed: any = result["failed"];
        if (failed["count"] > 0){
            const data: any = failed["data"];
            for (let i = 0; i < data.length; i++){
                const data_index = data[i];
                callback.onReadFailed(new FailedMarkData(
                    data_index["name"],
                    data_index["mark"]
                ))
            }
        }
        callback.onReadFinish()
    }
}

export interface AchievementCallback {
    onFailure(code: number, message?: string, e?: CurlToolException): void
    onReadStart(): void
    onReadPassed(data: PassedMarkData): void
    onReadFailed(data: FailedMarkData): void
    onReadFinish(): void
}