'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HOST_URL = exports.HOST_URL = 'https://douban.fm/';

var Apis = {
  // 验证码id
  captchaId: 'j/new_captcha',
  // 登录
  login: 'j/login',
  // 频道
  channels: 'j/v2/rec_channels',
  // 热门兆赫
  hotChannels: 'j/explore/hot_channels',
  // 搜索频道
  search: 'j/explore/search',
  // 收藏频道
  favChannels: 'j/explore/fav_channel',
  // 根据频道获取歌曲信息
  songs: 'j/mine/playlist',
  // 红心歌曲
  redheart: '/j/v2/redheart/songs',
  // 用户信息
  userInfo: 'j/v2/user_info',
  // 歌词
  lyric: 'j/v2/lyric'
};

for (var api in Apis) {
  Apis[api] = HOST_URL + Apis[api];
}

exports.default = Apis;