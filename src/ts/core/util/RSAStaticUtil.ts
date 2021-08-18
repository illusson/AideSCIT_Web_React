import {JSEncrypt} from "jsencrypt";

export class RSAStaticUtil {
    public static encrypted(publicKey: string, data: string): string {
        const jse: JSEncrypt = new JSEncrypt({})
        jse.setPublicKey(publicKey);
        return jse.encrypt(data) as string;
    }
}