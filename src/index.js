import request from 'request'

// 自定义请求头部
import customHeaders from './header'
// api
import Apis, { HOST_URL } from './apis'

// 私人频道id
const PERSONAL_CHANNEL_ID = 0

// 红心频道id
const PERSONAL_LIKE_CHANNEL_ID = -3

// 开启cookie
const j = request.jar()

let req = request.defaults({
  jar: j,
  headers: customHeaders
})

const noop = () => {}
const random = () => Date.now()

const safeParse = (res) => {
  res = res.toJSON()
  if (res.statusCode === 200) {
    return JSON.parse(res.body)
  } else {
    console.error(res.request.uri, res.body)
  }
}

const SDK = () => {}

let fn = SDK.prototype

// 获取验证码id
fn.captchaId = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['captchaId'],
    r: random()
  }, (err, res, body) => {
    if (err) return cb(err)
    const id = body.replace(/"/g, '')
    cb(null, id)
  })
}

// 登录
fn.login = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['login'],
    method: 'POST',
    form: true,
    qs: {
      remember: opt.remember || 'on',
      source: 'radio',
      captcha_solution: opt.captcha_solution,
      alias: opt.alias,
      form_password: opt.form_password,
      captcha_id: opt.captcha_id
    }
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      const result = {
        body: body,
        cookie_string: j.getCookieString(HOST_URL)
      }
      cb(null, result)
    }
  })
}

// 退出登录
fn.logout = (cb) => {
  cb = cb || noop
  const j = request.jar()
  req = request.defaults({
    jar: j
  })
  cb()
}

// 获取频道
fn.channels = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['channels'],
    qs: {
      specific: opt.specific || 'all'
    }
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      let result = {}
      if (body.status === true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 获取热门频道
fn.hotChannels = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['hotChannels'],
    qs: {
      start: opt.start || 1,
      limit: opt.limit || 6
    },
    r: random()
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      let result = []
      if (body.status === true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 根据频道获取歌曲
fn.songs = (opt, cb) => {
  const dqs = {
    from: 'mainsite',
    app_name: 'radio_website',
    version: 100,
    channel: 0,
    pb: 128,
    pt: 12.8,
    type: 'n'
  }
  const qs = Object.assign({}, dqs, opt)
  cb = cb || noop
  req({
    url: Apis['songs'],
    r: random(),
    qs: qs
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      let result = []
      if (body.r === 0) {
        result = body.song
      }
      cb(null, result)
    }
  })
}

// 跳过此曲(下一首)
fn.skip = (opt, cb) => {
  opt.type = 's'
  fn.songs(opt, cb)
}

// 加红心
fn.star = (opt, cb) => {
  opt.type = 'r'
  fn.songs(opt, cb)
}

// 取消红心
fn.unstar = (opt, cb) => {
  opt.type = 'u'
  fn.songs(opt, cb)
}

// 不再播放
fn.neverPlayAgain = (opt, cb) => {
  opt.type = 'b'
  fn.songs(opt, cb)
}

// 获取私人频道歌曲
fn.personalChannel = (opt, cb) => {
  opt.channel_id = PERSONAL_CHANNEL_ID
  fn.songs(opt, cb)
}

// 获取红心频道歌曲
fn.personalLikeChannel = (opt, cb) => {
  opt.channel_id = PERSONAL_LIKE_CHANNEL_ID
  fn.songs(opt, cb)
}

// 我收藏的频道
fn.favChannels = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['favChannels'],
    r: random()
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      cb(null, body.channels || [])
    }
  })
}

// 获取用户信息
fn.userInfo = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['userInfo'],
    method: 'GET',
    form: true
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      cb(null, body)
    }
  })
}

// 获取歌曲信息
fn.lyric = (opt, cb) => {
  cb = cb || noop
  req({
    url: Apis['lyric'],
    method: 'GET',
    form: true,
    qs: {
      sid: opt.sid,
      ssid: opt.ssid
    }
  }, (err, res, body) => {
    if (err) return cb(err)
    body = safeParse(res)
    if (body) {
      cb(null, body)
    }
  })
}

export default SDK
