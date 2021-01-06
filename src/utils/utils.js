import { sha256 } from "js-sha256"
import { JSEncrypt } from 'jsencrypt'

const privateKeyString = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCn67gL8epZspKv8Id/rCWJ62k
olKV7HqoYiGn7PZdaa1pojNsiTeJOsvUh1fC3BJWv72mU1HSBRaY9Kt22ZRpIZiB
wZc9AOd7s2H0IcAAi8joLcBz75i/rd2fGSjgdIox4svGRbEA8uuqiISdcqXd4gS2
SCZO8+jh/UpOSkMNbwIDAQAB
-----END PUBLIC KEY-----`

const sha256withRSA = (inputString) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(privateKeyString)
    const originSign = encrypt.encrypt(inputString)
    return originSign
}

const common = {
    getToken:()=>{
        return localStorage.getItem('access_token') || null
    },
    setToken:(access_token)=>{
        localStorage.setItem('access_token',access_token)
    },
    delToken:()=>{
        localStorage.removeItem('access_token')
    }
};

common.getRandomStr = (n) => {
    let str = ""
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < n; i++) {
        str += chars.charAt(Math.floor(Math.random() * 62));
    }
    return str
}

common.getCostudyAuthorizations = (url, params) => {
    const timestamp = new Date().getTime().toString().substring(0, 10)
    const nonce_str = common.getRandomStr(20)
    const signature = sha256withRSA(sha256(`POST\n${url}\n${timestamp}\n${nonce_str}\n${JSON.stringify(params)}\n`))
    return JSON.stringify({
        timestamp,
        signature,
        nonce_str,
        serial_no: "costudy"
    })
}

export default common