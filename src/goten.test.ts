import { getLoginInfo, getGotenAuth } from "./goten";

test('get goten info', async () => {
  let cookieToken = ''
  let inputToken = ''
  let modulus = ''
  try {
    ({ cookieToken, inputToken, modulus } = await getLoginInfo());
    console.log(cookieToken);
    console.log(inputToken);
    console.log(modulus);
  } catch (error) {
    console.error(error);
  }
  expect(cookieToken.length > 0 && inputToken.length > 0).toBe(true)
})

test('get goten auth', async () => {
  // ✨换上自己的 goten 账号和密码✨
  // 账号:18888888888
  // 密码:abcdefg
  const auth = await getGotenAuth('18888888888', 'abcdefg')
    .catch(err => {
      console.error(err);
    })
  console.log(auth);
  expect(auth && auth.length > 0).toBe(true)
})