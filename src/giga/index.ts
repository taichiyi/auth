import { requestPromise, getCookieObject } from "../utils"

export const getGigaAuth = async (
  email: string,
  password: string,
) => {
  const url = 'https://b2b.gigacloudlogistics.com/index.php?route=account/login'
  const formData = {
    email,
    password,
    'logged_redirect_url': '/',
  }
  const options = {
    'method': 'POST',
    'url': url,
    'timeout': 60 * 1000,
    formData
  };

  const auth = await requestPromise(url, options)
    .then(response => {
      const setCookie = response.headers['set-cookie'];
      if (!setCookie) {
        throw new Error('请求头[set-cookie] 错误')
      }
      const auth = getCookieObject(setCookie)['OCSESSID']
      if (!auth) {
        throw new Error('获取“OCSESSID”失败')
      }
      return auth
    })

  return auth
}
