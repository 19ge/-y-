import * as fetchs from '../utils/fetch';
//登录
export function userLogin(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/Login/index",fetchs.getAuth("/index/Login/index",params.username,params.password),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//注册
export async function  register(params) {
  return fetchs.create(fetchs.APIHost+"/index/Every/doRegister",params).then(response => response.json())
    .then(json => {return json});
}
//注册协议
export async function  zcxy(params) {
  return fetchs.create(fetchs.APIHost+"/index/total/ruzhu",params).then(response => response.json())
    .then(json => {return json});
}

// 外部获取验证码
export async function getCode(params) {
  return fetchs.create(fetchs.APIHost+"/index/Every/getCode",params).then(response => response.json())
    .then(json => {return json});
}
// 首页
export async function shouy(params) {
  return fetchs.create(fetchs.APIHost+"/index/Index/index",params).then(response => response.json())
    .then(json => {return json});
}
//公共商品列表
export async function gonglist(params) {
  return fetchs.create(fetchs.APIHost+"/index/Index/host",params).then(response => response.json())
    .then(json => {return json});
}
// 分类
export async function fenl(params) {
  return fetchs.create(fetchs.APIHost+"/index/Index/home_cate",params).then(response => response.json())
    .then(json => {return json});
}
// 分类-购买
export async function fenlgm(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/jiage",fetchs.getAuth("/index/User/jiage"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//支付
export async function pay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/add",fetchs.getAuth("/index/Order/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//确认支付
export async function spay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/payByBi",fetchs.getAuth("/index/Order/payByBi"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//我的订单
export async function morder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/index",fetchs.getAuth("/index/Order/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//我的订单
export async function dorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/detail",fetchs.getAuth("/index/Order/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}

//确认收货
export async function sureh(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/receive",fetchs.getAuth("/index/Order/receive"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车结算
export async function tshop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/buy",fetchs.getAuth("/index/Order/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车支付
export async function carpay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/order_add",fetchs.getAuth("/index/Order/order_add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// 商品详情-购买
export async function buy(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/toBuy",fetchs.getAuth("/index/Order/toBuy"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// 分类-购买
export async function fens(params) {
  return fetchs.create(fetchs.APIHost+"/index/Index/search",params).then(response => response.json())
    .then(json => {return json});
}
export async function sfen(params) {
  return fetchs.create(fetchs.APIHost+"/index/Index/cate",params).then(response => response.json())
    .then(json => {return json});
}
// 商品详情
// export async function details(params) {
//   return fetchs.create(fetchs.APIHost+"/index/Index/detail",params).then(response => response.json())
//     .then(json => {return json});
// }
export async function details(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/product_details",fetchs.getAuth("/index/User/product_details"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//提交个人信息
export async function addshop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Cart/add",fetchs.getAuth("/index/Cart/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//会员中心
export async function huiyuan(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/index",fetchs.getAuth("/index/User/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//忘记密码
export async function changePwd(params) {
  return fetchs.create(fetchs.APIHost+"/index/Every/forget",params).then(response => response.json())
    .then(json => {return json});
}
//购物车
export async function shopcar(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Cart/index",fetchs.getAuth("/index/Cart/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车-删除
export async function deletecar(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Cart/delete",fetchs.getAuth("/index/Cart/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车商品数量
export async function shopcnum(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Cart/addnum",fetchs.getAuth("/index/Cart/addnum"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// export async function shopcar(params) {
//   return fetchs.create(fetchs.APIHost+"/index/Cart/index",params).then(response => response.json())
//     .then(json => {return json});
// }
// 修改密码
export async function modifyPwd(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/pass",fetchs.getAuth("/index/user/pass"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的
export function mine(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/index",fetchs.getAuth("/index/user/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提交审核
export function subcheck(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/shen",fetchs.getAuth("/index/user/shen"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//粉丝
export function fans(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/myTeam",fetchs.getAuth("/index/User/myTeam"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//默认地址
export function maddress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/addrDefault",fetchs.getAuth("/index/User/addrDefault"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//删除地址
export function deladdress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/delAddr",fetchs.getAuth("/index/User/delAddr"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//选择地址
export function caddress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/myaddr",fetchs.getAuth("/index/User/myaddr"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//选择地址
export function caddress2(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/doEditAddr",fetchs.getAuth("/index/User/doEditAddr"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//修改地址
export function xaddress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/editAddr",fetchs.getAuth("/index/User/editAddr"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//收益
export function shouyi(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/reward",fetchs.getAuth("/index/User/reward"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//邀请码
export function yaocode(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/qrcode",fetchs.getAuth("/index/User/qrcode"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 上传图片-文件对象
export async function  uploadImgs(params) {
  // console.log(params,'-')
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/uploads",params).then(response => response.json()).then(json => {return json});
}
// 注册-上传身份证-base64
// export async function  uploadImg(params) {
//   console.log(params,'-')
//   return fetchs.create(fetchs.APIHost+"/index/User/edit",params).then(response => response.json()).then(json => {return json});
// }
//修改头像-base64
export async function uploadImg(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/edit",fetchs.getAuth("/index/User/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//修改登录密码
export async function xgmm(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/login_pass",fetchs.getAuth("/index/User/login_pass"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//二维码-背景图上传
export async function  bgpic(params) {
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/bgpic",params).then(response => response.json()).then(json => {return json});
}
// 个人信息
export async function PersonalInfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提交个人信息
export async function Agentuser(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/edit",fetchs.getAuth("/index/user/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//扫码支付
export async function szhifu(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/order",fetchs.getAuth("/index/wechat/order"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//扫码注册
export async function sres(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/scan",fetchs.getAuth("/index/wechat/scan"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// 首页 选择城市
export async function selectcity(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/area",fetchs.getAuth("/index/prod/area"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 我的团队
export async function team(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/team",fetchs.getAuth("/index/user/team"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//速聘经理
export async function supin(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/dir_sp",fetchs.getAuth("/index/user/dir_sp"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//雅虎经理
export async function yahu(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/dir_yh",fetchs.getAuth("/index/user/dir_yh"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//工厂
export async function factory(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/index",fetchs.getAuth("/index/prod/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//入职记录
export async function ruzhi(params) {
    return fetchs.creat_Token(fetchs.APIHost+"/index/user/ru",fetchs.getAuth("/index/user/ru"),JSON.stringify(params)).then(response => response.json())
    .then(json => { return json});
}
//雅虎赏金
export async function shangjin(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/wal",fetchs.getAuth("/index/profit/wal"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提现
export async function tixian(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/dotixian",fetchs.getAuth("/index/User/dotixian"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//转账
export async function trans(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/trans",fetchs.getAuth("/index/profit/trans"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//转账记录
export async function tansrecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/transfer",fetchs.getAuth("/index/profit/transfer"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//充值
export async function chongz(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Order/recharge",fetchs.getAuth("/index/Order/recharge"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//充值记录
export async function crecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/cz_record",fetchs.getAuth("/index/User/cz_record"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//提现记录
export async function tixianrecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/tx_record",fetchs.getAuth("/index/User/tx_record"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//押金支付 -微信
export async function wechat(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/index",fetchs.getAuth("/index/wechat/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//押金支付 -支付宝
export async function alipay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/alipay/index",fetchs.getAuth("/index/alipay/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//新闻公告
export async function news(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/news/index",fetchs.getAuth("/index/news/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//公告详情
export async function newsxq(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/news/xq",fetchs.getAuth("/index/news/xq"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 线下门店
export async function offline(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/qu",fetchs.getAuth("/index/user/qu"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//门店输送
export async function Storedelivery(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/mensong",fetchs.getAuth("/index/user/mensong"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}

//工厂详情
export async function factorydetail(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/prod/detail",fetchs.getAuth("/index/prod/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇
export async function yao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/yao",fetchs.getAuth("/index/red/yao"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//openid  接口
export async function openid(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/wechat/GetOpenid",fetchs.getAuth("/index/wechat/GetOpenid"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇次数
export async function chance(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/index",fetchs.getAuth("/index/red/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//摇一摇领取红红包
export async function honhbao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/red/ling",fetchs.getAuth("/index/red/ling"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 申请入职
export async function inJob(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/inJob",fetchs.getAuth("/index/user/inJob"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 添加商品
export function getAddr(params){
  return fetchs.creat_Token(fetchs.APIHost+"/addr/list",fetchs.getAuth("/addr/list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

// 添加商品
export function addGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/shop/add",fetchs.getAuth("/shop/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 领取商品协议
export async function xieyi(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/xieyi",fetchs.getAuth("/index/user/xieyi"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 领取礼包
export async function pack(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/inGift",fetchs.getAuth("/index/user/inGift"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 已领取商品
export async function yypack(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/gift",fetchs.getAuth("/index/user/gift"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 身份验证
export async function yan(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/card",fetchs.getAuth("/index/user/card"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 获取分类列表
export function getClassify(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/type",fetchs.getAuth("/shop/type")).then(response => response.json())
  .then(json => { return json});
}

// 获取我的商品列表
export function getGoods(params){
  if(!params.page){
    params={page:1}
  }
  return fetchs.read_Token(fetchs.APIHost+"/good/list?page="+params.page,fetchs.getAuth("/good/list")).then(response => response.json())
  .then(json => { return json});
}



// 删除商品
export function deteteGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/delete",fetchs.getAuth("/good/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}



// 获取轮播列表
export function getCarousel(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/roll",fetchs.getAuth("/shop/roll")).then(response => response.json())
  .then(json => { return json});
}

// 获取商城商品列表
export function getShopList(params){  
  if(!params.page){
    params.page=1
  }
  if(params.search){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&search="+params.search,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.type){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&type="+params.type,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.is_hot){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&is_hot="+params.is_hot,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?id="+params.id,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }
}





// 结算
export function createOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/buy",fetchs.getAuth("/good/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 商城交易记录
export function getOrder(params){
  if(!params.page){
    params.page=1
  }
  if(!params.type){
    params.type=0
  }
  if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?id="+params.id+"&type="+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?page="+params.page+'&type='+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }
}


// 获取列表 
export function get_shop_list(params){


  return fetchs.read(fetchs.APIHost+"/good/suc/?page="+params.page+"size="+params.size).then(response => response.json())
  .then(json => { return json});
}


// 确认完成订单
export function endOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/suc",fetchs.getAuth("/good/suc"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
