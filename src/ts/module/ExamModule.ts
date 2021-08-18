import {ExamData} from "../data/ExamData";
import {CurlCall, CurlCallback, CurlResponse, CurlToolException} from "../core/util/CurlUtil";
import {ApiModule} from "./ApiModule";
import {SharedPreferences} from "../core/SharedPreferences";

export class ExamModule {
    private readonly access_token: string;

    constructor() {
        this.access_token = SharedPreferences.getInterface("user")
            .getString("access_token", "");
    }

    public getExamInfo(callback: ExamCallback){
        const call = new ApiModule(this.access_token).getExamCall();
        call.enqueue(new class implements CurlCallback {
            onFailure(call: CurlCall, exception: CurlToolException, requestId: number) {
                callback.onFailure(-601, "网络请求失败", exception)
            }

            onResponse(call: CurlCall, response: CurlResponse, requestId: number) {
                if (response.code() === 200){
                    try {
                        const result = JSON.parse(response.body());
                        if (result["code"] === 200) {
                            localStorage.setItem("cache.exam", response.body());
                            ExamModule.parse(response.body(), callback);
                        } else {
                            callback.onFailure(-604, result["message"]);
                        }
                    } catch (e) {
                        callback.onFailure(-603, e.message);
                    }
                } else {
                    callback.onFailure(-605, "服务器内部出错");
                }
            }
        }())
    }

    public static parse(response: string, callback: ExamCallback) {
        callback.onReadStart();
        const result: any = JSON.parse(response);
        if (result["exam"]["count"] > 0){
            const examObject: any = result["exam"]["data"];
            for (let index = 0; index < examObject.length; index++) {
                const examData: any = examObject[index];
                callback.onReadData(new ExamData(
                    examData["name"], examData["time"], examData["location"], examData["sit_num"]
                ))
            }
        }
        callback.onReadFinish(result["count"] <= 0)
    }
}

export interface ExamCallback {
    onFailure(code: number, message?: string, e?: CurlToolException): void
    onReadStart(): void
    onReadData(data: ExamData): void
    onReadFinish(isEmpty: boolean): void
}