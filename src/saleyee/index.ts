import { getGotenAuth, getLoginInfo } from "../goten"

export const getSaleYeeLoginInfo = async () => {
  const host = 'www.saleyee.cn'
  return getLoginInfo(host)
}

export const getSaleYeeAuth = async (accountName: string, password: string) => {
  const host = 'www.saleyee.cn'
  return getGotenAuth(accountName, password, host)
}
