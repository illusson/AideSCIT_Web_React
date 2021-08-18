import {CurlCall, CurlCallback, CurlResponse, CurlToolException} from "../core/util/CurlUtil";
import {ApiModule} from "./ApiModule";

export class LoginModule {
    public login(username: string, password: string, callback: LoginCallback) {
        
    }

    private loginPost(username: string, password_encrypted: string, callback: LoginCallback){
        const call: CurlCall = new ApiModule().getLoginCall(username, password_encrypted);
        call.enqueue(new class implements CurlCallback {
            onFailure(call: CurlCall, exception: CurlToolException, requestId: number) {
                callback.onFailure(-101, "网络请求失败", exception)
            }

            onResponse(call: CurlCall, response: CurlResponse, requestId: number) {
                LoginModule.parse(response, callback)
            }
        }())
    }

    public springboard(access: string, callback: SpringboardCallback){
        const call = new ApiModule(access).getSpringboardCall()
        call.enqueue(new class implements CurlCallback {
            onFailure(call: CurlCall, exception: CurlToolException, requestId: number) {
                callback.onFailure(-101, "网络请求失败", exception)
            }

            onResponse(call: CurlCall, response: CurlResponse, requestId: number) {
                if (response.code() === 200){
                    try {
                        const result = JSON.parse(response.body());
                        if (result["code"] === 200){
                            callback.onResult(result["location"]);
                        } else {
                            callback.onFailure(-114, result["message"]);
                        }
                    } catch (e) {
                        callback.onFailure(-113, e.message);
                    }
                } else {
                    callback.onFailure(-115, "服务器内部出错");
                }
            }
        }())
    }

    public refreshToken(access_token: string, refresh_token: string, callback: LoginCallback){
        const call = new ApiModule(access_token, refresh_token).getRefreshTokenCall();
        call.enqueue(new class implements CurlCallback {
            onFailure(call: CurlCall, exception: CurlToolException, requestId: number) {
                callback.onFailure(-111, "网络请求失败", exception)
            }

            onResponse(call: CurlCall, response: CurlResponse, requestId: number) {
                LoginModule.parse(response, callback)
            }
        }())
    }

    private static parse(response: CurlResponse, callback: LoginCallback) {
        if (response.code() === 200){
            try {
                const result = JSON.parse(response.body());
                if (result["code"] === 200){
                    callback.onResult(result["access_token"], result["refresh_token"]);
                } else {
                    callback.onFailure(-104, result["message"]);
                }
            } catch (e) {
                callback.onFailure(-103, e.message);
            }
        } else {
            callback.onFailure(-105, "服务器内部出错");
        }
    }
}

interface PublicKeyCallback {
    onFailure(code: number, message?: string, e?: CurlToolException): void
    onResult(key: string, hash: string): void
}

export interface LoginCallback {
    onFailure(code: number, message?: string, e?: CurlToolException): void
    onResult(access: string, refresh: string): void
}

export interface SpringboardCallback {
    onFailure(code: number, message?: string, e?: CurlToolException): void
    onResult(location: string): void
}