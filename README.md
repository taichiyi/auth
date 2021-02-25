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
  // token
  // 8F57E801F4C9F4C197CE86B26D79XXX4DD19D00C3C52C2C4F378F5CDA51D725FF0AD0022EF1EF0773F6B10B6BB584FA670A97D8XXX731865649334A01490E2B3E6D229944F29D06F07922E0XXXB3838A51A5B4797AC400FD07725EA560BCC492895C6A7F608B43A8BD1XXX9C8860A878A0E11A27
}
```
