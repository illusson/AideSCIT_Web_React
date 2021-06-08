import {JSEncrypt} from "jsencrypt";

export class RSAStaticUtil {
    private static readonly jse: JSEncrypt = new JSEncrypt({})

    public static setup(privateKey: string){
        RSAStaticUtil.jse.setPublicKey(privateKey);
    }

    public static encrypted(privateKey: string, data: string): string {
        return RSAStaticUtil.jse.encrypt(data) as string;
    }
}