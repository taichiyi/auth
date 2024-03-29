import { requestPromise, getCookieObject } from "../utils"
import { RSAKeyPair, encryptedString } from "./RSA";

export const getLoginInfo = async (host='www.gotenchina.com') => {
  let cookieToken = ''
  return requestPromise(`https://${host}/login.html`)
    .then((response) => {
      const headersSetCookie = response.headers['set-cookie'];
      if (!headersSetCookie) {
        throw new Error('请求头[set-cookie] 错误')
      }
      const cookieObject = getCookieObject(headersSetCookie);
      const cookieArray = []
      for (const item in cookieObject) {
        cookieArray.push(`${item}=${cookieObject[item]}`)
      }
      cookieToken = cookieArray.join('; ');
      return response;
    })
    .then((response) => response.body)
    .then(text => {
      const TOKEN_REGEX = /<input name="__RequestVerificationToken" type="hidden" value="(.*)" \/>/;
      const tokenRegexResult = text.match(TOKEN_REGEX);
      if (tokenRegexResult === null || tokenRegexResult.length !== 2) {
        throw new Error('__RequestVerificationToken 匹配失败')
      }
      const inputToken = tokenRegexResult[1];

      const MODULUS_REGEX = /\w{256}/;
      const modulusRegexResult = text.match(MODULUS_REGEX);
      if (modulusRegexResult === null || !modulusRegexResult[0] || modulusRegexResult[0].length !== 256) {
        throw new Error('modulus 获取失败')
      }
      const modulus = modulusRegexResult[0]

      return {
        inputToken,
        cookieToken,
        modulus,
      };
    })
}

export const getGotenAuth = async (accountName: string, password: string, host='www.gotenchina.com') => {
  const { cookieToken, inputToken, modulus } = await getLoginInfo(host)

  const key = new RSAKeyPair("010001", "", modulus);
  const HidPassword = encryptedString(key, password);
  const url = `https://${host}/login.html`

  const options = {
    'method': 'POST',
    'url': url,
    'timeout': 60 * 1000,
    'headers': {
      'cookie': cookieToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      '__RequestVerificationToken': inputToken,
      'AccountName': accountName,
      'valiCode': '',
      'HidPassword': HidPassword
    }
  };
  return await requestPromise(url, options)
    .then(response => {
      const setCookie = response.headers['set-cookie'];
      if (!setCookie) {
        throw new Error('请求头[set-cookie] 错误')
      }
      const auth = getCookieObject(setCookie)['GOTEN.AUTH.CN']
      if (!auth) {
        throw new Error('获取“GOTEN.AUTH.CN”失败')
      }
      return auth
    })
}
