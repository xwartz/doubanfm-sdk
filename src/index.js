import request from 'request'

// 自定义请求头部
import customHeaders from './header'
// api
import Apis, { HOST_URL } from './apis'

// 私人频道id
const PERSONAL_CHANNEL_ID = 0

// 红心频道id
const PERSONAL_LIKE_CHANNEL_ID = -3

const isVip = false

// 开启cookie
const j = request.jar()

let req = request.defaults({
  jar : j,
  headers : customHeaders
})

const noop = () => {}
const random = () => Date.now()

const safeParse = (res) => {
  res = res.toJSON()
  if(res.statusCode == 200) {
    return JSON.parse(res.body)
  } else {
    console.error(res.request.uri, res.body)
  }
}

const SDK = () => {}

let fn = SDK.prototype

// 获取验证码id
fn.captcha_id = (opt,cb) => {
  cb = cb || noop
  req({
    url : Apis['captcha_id'],
    r : random()
  }, (err, res, body) => {
    if(err) return cb(err)
    const id = body.replace(/"/g,'')
    cb(null, id)
  })
}

// 获取验证码图片 Content-Type:image/jpeg
fn.captcha_pic = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['captcha_pic'],
    r : random(),
    qs : {
      size : 'm',
      id : opt.id
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    const data = {
      id : opt.id,
      url : `${Apis['captcha_pic']}?size=m&id=${opt.id}`,
      body : body
    }
    cb(null, data)
  })
}

// 登录
fn.login = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['login'],
    method : 'POST',
    form : true,
    qs : {
      remember : opt.remember || 'on',
      source : 'radio',
      captcha_solution: opt.captcha_solution,
      alias : opt.alias,
      form_password : opt.form_password,
      captcha_id : opt.captcha_id
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      const result = {
        body : body,
        cookie_string : j.getCookieString(HOST_URL)
      }
      cb(null, result)
    }
  })
}

fn.setCookie = (cookie_string, cb) => {
  cb = cb || noop
  j.setCookie(cookie_string, HOST_URL)
  cb()
}

// 退出登录
fn.logout = (cb) => {
  cb = cb || noop
  const j = request.jar()
  req = request.defaults({
    jar : j
  })
  cb()
}

// 获取公共频道列表
fn.personal_channels = (opt, cb) => {
  cb = cb || noop
  const result = [{
    id : PERSONAL_CHANNEL_ID,
    name : '私人频道'
  },{
    id : PERSONAL_LIKE_CHANNEL_ID,
    name : '红心频道'
  }]
  cb(null, result)
  return result
}

// 获取热门频道
fn.hot_channels = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['hot_channels'],
    qs : {
      start : opt.start || 1,
      limit : opt.limit || 6
    },
    r : random()
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = []
      if(body.status == true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 获取上升最快的频道
fn.up_trending_channels = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['up_trending_channels'],
    qs : {
      start : opt.start || 1,
      limit : opt.limit || 10
    },
    r : random()
  }, (err, res, body) => {
    if(err) return cb(err)
    if(body) {
      body = safeParse(res)
      let result = []
      if(body.status == true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 根据流派查询频道
fn.genre_channels = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['genre_channels'],
    r : random(),
    qs : {
      start : opt.start || 1,
      limit : opt.limit || 10,
      gid : opt.gid
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = []
      if(body.status == true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 查询频道详细信息
fn.channel_detail = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['channel_detail'],
    r : random(),
    qs : {
      channel_id : opt.channel_id
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = null
      if(body.status == true) {
        result = body.data.channels
      }
      cb(null, result)
    }
  })
}

// 搜索频道
fn.search = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['search'],
    r : random(),
    qs : {
      query : opt.query,
      start : opt.start || 0,
      limit : opt.limit || 20
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = {}
      if(body.status == true) {
        result = body.data
      }
      cb(null, result)
    }
  })
}

// 根据频道获取歌曲
fn.songs = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['songs'],
    r : random(),
    qs : {
      from : 'mainsite',
      channel : opt.channel_id || 0,
      kbps : opt.kbps || 128,
      type : opt.type || 'n',
      pt : opt.pt || '',
      sid : opt.sid || ''
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = []
      if(body.r== 0) {
        result = body.song
      }
      cb(null, result)
    }
  })
}

// 跳过此曲(下一首)
fn.skip = (opt,cb) => {
  opt.type = 's'
  fn.songs(opt, cb)
}

//加红心
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
fn.never_play_again = (opt, cb) => {
  opt.type = 'b'
  fn.songs(opt, cb)
}

// 获取私人频道歌曲
fn.personal_channel = (opt,cb) => {
  opt.channel_id = PERSONAL_CHANNEL_ID
  fn.songs(opt, cb)
}

// 获取红心频道歌曲
fn.personal_like_channel = (opt,cb) => {
  opt.channel_id = PERSONAL_LIKE_CHANNEL_ID
  fn.songs(opt, cb)
}

// 收藏频道
fn.fav_channel = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['fav_channel'],
    r : random(),
    qs : {
      cid : opt.channel_id,
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = 0
      if(body.status== true) {
        result = body.data.res
      }
      cb(null, result)
    }
  })
}

// 取消收藏频道
fn.unfav_channel = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['unfav_channel'],
    r : random(),
    qs : {
      cid : opt.channel_id,
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = 0
      if(body.status== true) {
        result = body.data.res
      }
      cb(null, result)
    }
  })
}

// 是否已收藏频道
fn.is_fav_channel = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['is_fav_channel'],
    r : random(),
    cid : opt.channel_id
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      let result = false
      if(body.status == true) {
        result = body.data.res.is_fav
      }
      cb(null, result)
    }
  })
}

// 我收藏的频道
fn.fav_channels = (opt, cb) => {
  cb = cb || noop
  req({
    url : Apis['fav_channels'],
    r : random()
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      cb(null, body.channels || [])
    }
  })
}

// 换频率报告
fn.change_channel = (opt,cb) => {
  cb = cb || noop
  req({
    url : Apis['change_channel'],
    r : random(),
    fcid : opt.fcid,
    tcid : opt.tcid,
    area : opt.area || 'system_chls'
  }, (err, res, body) => {
    if(err) return cb(err)
    cb(null, body)
  })
}

// 获取用户信息
fn.user_info = function(opt, cb) {
  var self = this
  cb = cb || noop
  req({
    url: Apis['user_info'],
    method : 'GET',
    form : true
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      cb(null, body)
    }
  })
}

// 获取用户信息
fn.lyric = function(opt, cb) {
  var self = this
  cb = cb || noop
  req({
    url: Apis['lyric'],
    method : 'GET',
    form : true,
    qs: {
      sid: opt.sid,
      ssid: opt.ssid
    }
  }, (err, res, body) => {
    if(err) return cb(err)
    body = safeParse(res)
    if(body) {
      cb(null, body)
    }
  })
}


export default SDK
