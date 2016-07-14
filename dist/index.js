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
  if (res.statusCode === 200) {
    return JSON.parse(res.body);
  } else {
    console.error(res.request.uri, res.body);
  }
};

var SDK = function SDK() {};

var fn = SDK.prototype;

// 获取验证码id
fn.captchaId = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['captchaId'],
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    var id = body.replace(/"/g, '');
    cb(null, id);
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
      if (body.status === true) {
        result = body.data.channels;
      }
      cb(null, result);
    }
  });
};

// 获取热门频道
fn.hotChannels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['hotChannels'],
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
      if (body.status === true) {
        result = body.data.channels;
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
      if (body.r === 0) {
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

// 加红心
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
fn.neverPlayAgain = function (opt, cb) {
  opt.type = 'b';
  fn.songs(opt, cb);
};

// 获取私人频道歌曲
fn.personalChannel = function (opt, cb) {
  opt.channel_id = PERSONAL_CHANNEL_ID;
  fn.songs(opt, cb);
};

// 获取红心频道歌曲
fn.personalLikeChannel = function (opt, cb) {
  opt.channel_id = PERSONAL_LIKE_CHANNEL_ID;
  fn.songs(opt, cb);
};

// 我收藏的频道
fn.favChannels = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['favChannels'],
    r: random()
  }, function (err, res, body) {
    if (err) return cb(err);
    body = safeParse(res);
    if (body) {
      cb(null, body.channels || []);
    }
  });
};

// 获取用户信息
fn.userInfo = function (opt, cb) {
  cb = cb || noop;
  req({
    url: _apis2.default['userInfo'],
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

// 获取歌曲信息
fn.lyric = function (opt, cb) {
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