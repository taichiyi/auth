import { getGotenAuth } from "../goten"

export const getSaleYeeAuth = async (accountName: string, password: string) => {
  const host = 'www.saleyee.cn'
  return getGotenAuth(accountName, password, host)
}
