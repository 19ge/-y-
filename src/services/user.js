/*
 * @Author: 杜梦 
 * @Date: 2018-07-02 17:42:44 
 * @Last Modified by: 杜梦
 * @Last Modified time: 2018-07-03 10:46:05
 */

//  本页请求



import * as fetchs from '../utils/fetch';


// 获取平台配置信息
export function getConfig(){
  return fetchs.read_Token(fetchs.APIHost+"/web",fetchs.getAuth("/web")).then(response => response.json())
  .then(json => { return json});
}



// 用户获取个人信息
export function tokenLogin(){
  return fetchs.read_Token(fetchs.APIHost+"/userInfo",fetchs.getAuth("/userInfo")).then(response => response.json())
  .then(json => { return json});
}

// 修改个人信息
export function chgInfo(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/put",fetchs.getAuth("/user/put"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 获取公告列表
export function getNotice(){
  return fetchs.read_Token(fetchs.APIHost+"/notice/lists",fetchs.getAuth("/notice/lists")).then(response => response.json())
  .then(json => { return json});
}



// 提交留言
export function submitMsg(params){
  return fetchs.creat_Token(fetchs.APIHost+"/msg/add",fetchs.getAuth("/msg/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 获取留言列表
export function getMsg(params){
  if(!params.page){
    params={page:1}
  }
  return fetchs.read_Token(fetchs.APIHost+"/msg/list?page="+params.page,fetchs.getAuth("/msg/list")).then(response => response.json())
  .then(json => { return json});
}

// 获取团队列表
export function getTeam(params){
 
  if(!params.page){
    params.page=1
  }
  if(!params.type){
    params.type=0
  }
  if(params.type==0){
    return fetchs.read_Token(fetchs.APIHost+"/user/team?page="+params.page,fetchs.getAuth("/user/team")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/user/ref?page="+params.page,fetchs.getAuth("/user/ref")).then(response => response.json())
    .then(json => { return json});
  }
  
  
}


// 获取地址列表
export function getAddr(){
  return fetchs.read_Token(fetchs.APIHost+"/addr/list",fetchs.getAuth("/addr/list")).then(response => response.json())
  .then(json => { return json});
}


// 添加和修改地址
export function submitAddr(params){
  return fetchs.creat_Token(fetchs.APIHost+"/addr/add",fetchs.getAuth("/addr/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}










// 卖出
export function sell(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/sell",fetchs.getAuth("/user/sell"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

// 获取折线图数据
export function getChart(){
  return fetchs.read_Token(fetchs.APIHost+"/deal/home",fetchs.getAuth("/deal/home")).then(response => response.json())
  .then(json => { return json});
}


// 获取交易大厅列表
export function getTrading(params){
  if(!params.page){
    params.page=1
  }
  if(!params.search){
    return fetchs.read_Token(fetchs.APIHost+"/deal/list?page="+params.page,fetchs.getAuth("/deal/list")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/deal/list?page="+params.page+"&search="+params.search,fetchs.getAuth("/deal/list")).then(response => response.json())
    .then(json => { return json});
  }
}



// 交易大厅交易
export function tranding(params){
  return fetchs.creat_Token(fetchs.APIHost+"/deal",fetchs.getAuth("/deal"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// GKC交易记录
export function trandingOrder(params){
  if(!params.page){
    params.page=1
  }
  if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/buy/list?id="+params.id,fetchs.getAuth("/buy/list")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/buy/list?page="+params.page,fetchs.getAuth("/buy/list")).then(response => response.json())
    .then(json => { return json});
  }
}



// 更新订单信息
export function updateTrandOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/deal/chgStatus",fetchs.getAuth("/deal/chgStatus"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}





// 获取我的收益
export function getProfit(params){
  return fetchs.read_Token(fetchs.APIHost+"/user/award?page="+params.page,fetchs.getAuth("/user/award")).then(response => response.json())
  .then(json => { return json});
}


