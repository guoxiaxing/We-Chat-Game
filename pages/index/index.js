//index.js
//获取应用实例
// 定义一个定时器
let timer;
//从srcs数组中随机选出一张图片
let num=0;
//定义一个变量来存储用户头像
let userimg = '';
Page({
  data: {
    //存储按钮状态(即定时器是否开启的状态，默认是开启的)
    btnState:true,
    winNum:0,
    imageAisrc:'',
    imageUserSrc:'',
    gameOfPlay:'',
    srcs:[
      '../images/bu.png',
      '../images/jiandao.png',
      '../images/shitou.png'
    ]
  },
  onLoad: function () {
    var that = this;
    /**  
     * 获取用户信息  
     */
    wx.getUserInfo({
      success: function (res) {
        // console.log(res);
        var avatarUrl = 'imageUserSrc';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
        userimg = res.userInfo.avatarUrl;
      }
    })  
     that.timerGo();
  },
  //点击显示用户出拳
  changeForChoose: function (e) {
    //定时器关闭时表示用户已经出过拳
    if(!this.data.btnState){
      return ;
    }
    //存储用户出拳结果，改变定时器状态
    this.setData({imageUserSrc: this.data.srcs[e.currentTarget.id],btnState:false})
    //停止定时器
    clearInterval(timer);
    // 存储电脑和用户出的值
    let user = this.data.imageUserSrc;
    let Ai = this.data.imageAiSrc;
    //记录用户赢得次数
    let score = this.data.winNum;
    // 定义一个初始字符串
    let str = '很遗憾，你输了';
    //结果比较
    if (user == '../images/bu.png' && Ai == '../images/shitou.png' ){
      str = '恭喜，你赢了';
      score++;
      wx.setStorageSync('winNum', score);
    }
    if (user == '../images/shitou.png' && Ai == '../images/jiandao.png'){
      str = '恭喜，你赢了';
      score++;
      wx.setStorageSync('winNum', score);
    }
    if (user == '../images/jiandao.png' && Ai == '../images/bu.png'){
      str = '恭喜，你赢了';
      score++;
      wx.setStorageSync('winNum',score);
    }
    //平局
    if (user == Ai){
      str = '哈哈，打平了';
    }
    //返回数据
    this.setData({
      winNum:score,
      gameOfPlay:str
      })
  },
  // 定义一个电脑动态出拳的函数
  timerGo:function(){
    timer = setInterval(this.move,100);
  },
  move:function(){
    //缓存一下this
    let thispages = this;
    if (num > 2) {
       num = 0;
    }
    thispages.setData({ imageAiSrc: thispages.data.srcs[num] });
    num++;
  },
  //点击按钮时再次启动,回到默认状态
  again:function(){
    //点击按钮时，先判断定时器是否已经启动
    if(this.data.btnState){
      return;
    }
    // 没有启动时则重启定时器
    this.timerGo();
    this.setData({
      btnState:true,
      imageUserSrc:userimg,
      gameOfPlay: ''
      });
  }
})
