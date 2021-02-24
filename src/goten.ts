import { requestPromise } from "./utils"
import { RSAKeyPair, encryptedString } from './RSA.js';


const getCookieObject = (cookieStr: string[]) => {
  const cookieObject: { [x: string]: string } = {};
  const cookieList = cookieStr.map((val) => val.split('; ')[0]);
  cookieList.forEach((val) => {
    const valSplit = val.split('=');
    const [key, value] = valSplit;
    cookieObject[key] = value;
  });
  return cookieObject;
}

export const getLoginInfo = async () => {
  let cookieToken = ''
  return requestPromise('https://www.gotenchina.com/login.html')
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

export const getGotenAuth = async (accountName: string, password: string) => {
  const { cookieToken, inputToken, modulus } = await getLoginInfo()

  const key = new RSAKeyPair("010001", "", modulus);
  const HidPassword = encryptedString(key, password);

  const options = {
    'method': 'POST',
    'url': 'https://www.gotenchina.com/login.html',
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
  return await requestPromise('https://www.gotenchina.com/login.html', options)
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
