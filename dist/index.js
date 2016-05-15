'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 私人频道id


// 自定义请求头部
var PERSONAL_CHANNEL_ID = 0;

// 红心频道id

// api
var PERSONAL_LIKE_CHANNEL_ID = -3;

var isVip = false;

// 开启cookie
var j = _request2.default.jar();

var req = _request2.default.defaults({
  jar: j,
  headers: _header2.default
});

var noop = function noop() {};
var random = function random() {
  return Date.now();
};

var safeParse = function safeParse(res) {
  res = res.toJSON();
  if (res.statusCode == 200) {
    return JSON.parse(res.body);
  } else {
    console.error(res.request.uri, res.body);
  }
};

var SDK = function SDK() {};

var fn = SDK.prototype;

// 获取验证码id
fn.captcha_id = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['captcha_id'],
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    var id = body.replace(/"/g, '');
    cb(null, id);
  });
};

// 获取验证码图片 Content-Type:image/jpeg
fn.captcha_pic = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['captcha_pic'],
    r: random(),
    qs: {
      size: 'm',
      id: opt.id
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    var data = {
      id: opt.id,
      url: _apis2.default['captcha_pic'] + '?size=m&id=' + opt.id,
      body: body
    };
    cb(null, data);
  });
};

// 登录
fn.login = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['login'],
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
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = {
        body: body,
        cookie_string: j.getCookieString(_apis.HOST_URL)
      };
      cb(null, result);
    }
  });
};

fn.setCookie = function (cookie_string, cb) {
  cb = cb || noop;
  j.setCookie(cookie_string, _apis.HOST_URL);
  cb();
};

// 退出登录
fn.logout = function (cb) {
  cb = cb || noop;
  var j = _request2.default.jar();
  req = _request2.default.defaults({
    jar: j
  });
  cb();
};

// 获取频道
fn.channels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['channels'],
    qs: {
      specific: opt.specific || 'all'
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = {};
      if (body.status == true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 获取热门频道
fn.hot_channels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['hot_channels'],
    qs: {
      start: opt.start || 1,
      limit: opt.limit || 6
    },
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = [];
      if (body.status == true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 获取上升最快的频道
fn.up_trending_channels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['up_trending_channels'],
    qs: {
      start: opt.start || 1,
      limit: opt.limit || 10
    },
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    if (body) {
      body = safeParse(res);
      var result = [];
      if (body.status == true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 根据流派查询频道
fn.genre_channels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['genre_channels'],
    r: random(),
    qs: {
      start: opt.start || 1,
      limit: opt.limit || 10,
      gid: opt.gid
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = [];
      if (body.status == true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 查询频道详细信息
fn.channel_detail = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['channel_detail'],
    r: random(),
    qs: {
      channel_id: opt.channel_id
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = null;
      if (body.status == true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 搜索频道
fn.search = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['search'],
    r: random(),
    qs: {
      query: opt.query,
      start: opt.start || 0,
      limit: opt.limit || 20
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = {};
      if (body.status == true) {
        result = body.data;
      }
      cb(null, result);
    }
  });
};

// 根据频道获取歌曲
fn.songs = function (opt, cb) {
  var dqs = {
    client: 's:mainsite|y:3.0',
    app_name: 'radio_website',
    version: 100,
    channel: 0,
    kbps: 128,
    type: 'n'
  };
  var qs = Object.assign({}, dqs, opt);
  cb = cb || noop;
  req({
    url: _apis2.default['songs'],
    r: random(),
    qs: qs
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = [];
      if (body.r == 0) {
        result = body.song;
      }
      cb(null, result);
    }
  });
};

// 跳过此曲(下一首)
fn.skip = function (opt, cb) {
  opt.type = 's';
  fn.songs(opt, cb);
};

//加红心
fn.star = function (opt, cb) {
  opt.type = 'r';
  fn.songs(opt, cb);
};

// 取消红心
fn.unstar = function (opt, cb) {
  opt.type = 'u';
  fn.songs(opt, cb);
};

// 不再播放
fn.never_play_again = function (opt, cb) {
  opt.type = 'b';
  fn.songs(opt, cb);
};

// 获取私人频道歌曲
fn.personal_channel = function (opt, cb) {
  opt.channel_id = PERSONAL_CHANNEL_ID;
  fn.songs(opt, cb);
};

// 获取红心频道歌曲
fn.personal_like_channel = function (opt, cb) {
  opt.channel_id = PERSONAL_LIKE_CHANNEL_ID;
  fn.songs(opt, cb);
};

// 收藏频道
fn.fav_channel = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['fav_channel'],
    r: random(),
    qs: {
      cid: opt.channel_id
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = 0;
      if (body.status == true) {
        result = body.data.res;
      }
      cb(null, result);
    }
  });
};

// 取消收藏频道
fn.unfav_channel = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['unfav_channel'],
    r: random(),
    qs: {
      cid: opt.channel_id
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = 0;
      if (body.status == true) {
        result = body.data.res;
      }
      cb(null, result);
    }
  });
};

// 是否已收藏频道
fn.is_fav_channel = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['is_fav_channel'],
    r: random(),
    cid: opt.channel_id
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      var result = false;
      if (body.status == true) {
        result = body.data.res.is_fav;
      }
      cb(null, result);
    }
  });
};

// 我收藏的频道
fn.fav_channels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['fav_channels'],
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      cb(null, body.channels || []);
    }
  });
};

// 换频率报告
fn.change_channel = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['change_channel'],
    r: random(),
    fcid: opt.fcid,
    tcid: opt.tcid,
    area: opt.area || 'system_chls'
  }, function (err, res, body) {
    if (err) return cb(err);
    cb(null, body);
  });
};

// 获取用户信息
fn.user_info = function (opt, cb) {
  var self = this;
  cb = cb || noop;
  req({
    url: _apis2.default['user_info'],
    method: 'GET',
    form: true
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      cb(null, body);
    }
  });
};

// 获取用户信息
fn.lyric = function (opt, cb) {
  var self = this;
  cb = cb || noop;
  req({
    url: _apis2.default['lyric'],
    method: 'GET',
    form: true,
    qs: {
      sid: opt.sid,
      ssid: opt.ssid
    }
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      cb(null, body);
    }
  });
};

exports.default = SDK;