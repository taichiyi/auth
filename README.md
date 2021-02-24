# Auth

通过脚本获取 goten 的登录 token

## 下载

``` bash
yarn add @taichi-yi/auth
```

或者

``` bash
npm install @taichi-yi/auth
```

## 使用

``` js
import {getGotenAuth} from '@taichi-yi/auth';
const foo = async () => {
  const token = await getGotenAuth('18888888888', 'abcdefg')
    .catch(err => {
      console.error(err);
    });
}
```
