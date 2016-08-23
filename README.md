# doubanfm-sdk

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/xwartz/doubanfm-sdk.svg?branch=master)](https://travis-ci.org/xwartz/doubanfm-sdk) [![codecov](https://codecov.io/gh/xwartz/doubanfm-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/xwartz/doubanfm-sdk)

豆瓣 FM SDK

inspired by https://github.com/sapjax/dbfm-app-sdk

## 使用

```js
import WebSDK from 'doubanfm-sdk'

const wsdk = new WebSDK()

const operate = (method, opt, cb) => {
  wsdk[method](opt, (err, data) => {
    if (err) return console.error(err) // error handle
    cb && cb(data)
  })
}
```

### API

#### 获取验证码 id

```js
operate('captchaId', null, id => {
  // todo
})
```

#### 登录

```js
const opt = {
  alias: '',
  form_password: '',
  captcha_solution: '',
  captcha_id: '',
  source: 'radio',
  task: 'sync_channel_list'
}
operate('login', opt, data => {
  // todo
})
```

#### 登出

```js
operate('logout', () => {
  // todo
})
```

#### 获取频道

```js
operate('channels', opt, data => {
  // todo
})
```

#### 获取热门频道

```js
operate('hotChannels', opt, data => {
  // todo
})
```

#### 加心

```js
operate('star', opt, data => {
  // todo
})
```

#### 取消红心

```js
operate('unstar', opt, data => {
  // todo
})
```

#### 不再播放

```js
operate('neverPlayAgain', opt, data => {
  // todo
})
```

#### 获取歌词

```js
operate('lyric', opt, data => {
  // todo
})
```

#### 获取用户信息

```js
operate('userInfo', opt, data => {
  // todo
})
```


## License
MIT
