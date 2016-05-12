export const HOST_URL = 'http://douban.fm/'

let Apis = {
  //验证码id
  captcha_id : 'j/new_captcha',
  //验证码图片
  captcha_pic : 'misc/captcha',
  //登录
  login : 'j/login',
  //热门兆赫
  hot_channels : 'j/explore/hot_channels',
  //上升最快兆赫
  up_trending_channels : 'j/explore/up_trending_channels',
  //根据流派获取频道
  genre_channels : 'j/explore/genre',
  //查询频道详细信息
  channel_detail : 'j/explore/channel_detail',
  //搜索频道
  search : 'j/explore/search',
  //收藏频道
  fav_channel : 'j/explore/fav_channel',
  //取消收藏频道
  unfav_channel : 'j/explore/unfav_channel',
  //我收藏的频道
  fav_channels : 'j/fav_channels',
  //是否已收藏频道
  is_fav_channel : 'j/explore/is_fav_channel',
  //根据频道获取歌曲信息
  songs : 'j/mine/playlist',
  //下一首
  skip : 'j/mine/playlist',
  //加红心
  star : 'j/mine/playlist',
  //取消红心
  unstar : 'j/mine/playlist',
  //不再播放
  never_play_again : 'j/mine/playlist'
}

for(let api in Apis) {
  Apis[api] = HOST_URL + Apis[api]
}

export default Apis
