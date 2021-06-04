import { getGigaAuth } from ".";

test('get giga auth', async () => {
  // ✨换上自己的 大健 邮箱和密码✨
  // 邮箱:giga@163.com
  // 密码:abcdefg
  const auth = await getGigaAuth('giga@163.com', 'abcdefg')
    .catch(err => {
      console.error(err);
    })
  console.log('auth', auth);
  expect(auth && auth.length > 0).toBe(true)
}, 60 * 1000)
