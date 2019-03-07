require('fetch-ie8');
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var store = require('store');
// export const APIHost ='http://admin.slmy10000.com';
// export const APIHost ='http://10.10.10.120:1000';
// export const APIHost ='http://192.168.1.144:8004';
export const APIHost ='http://47.92.88.214:8029';
// export const APIHost ='http://47.92.145.141:2808';
// export const APIHost ='http://admin.yahoosp.cn';

// export const APIHost ='http://als.jugekeji.cn';

var defaultParams = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};


/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {

  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {

  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

/************************************* token **********************************/
/**
 * HTTP GET
 * @param  {string} url
 * @param  {string} token
 * @return {Promise}
 */
export function read_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

export function creat_Token(url,token,body={}) {
  // defaultParams.headers.authToken = token;
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: body
  });
}

export function delete_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

export function update_Token(url,token,body={}) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: body
  });
}

//上传图片 不带token
export function uploadImg_Token(url,body) {
  return fetch(url, {
    method: 'post',
    body: body,
  });
}
//上传图片  带token
export function uploadbgImg_Token(url,token,body) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: body
  });
}


export function getAuth(url,username,password){
  var CryptoJs = require("crypto-js");
  if(!password&&!store.get("user")){return null}
  var iv = CryptoJs.enc.Latin1.parse('O2%=!ExPCuY6SKX(');
  var key = CryptoJs.enc.Latin1.parse(password? HmacMD5(password,password).toString() : store.get("user").password);
  var pass = AES.encrypt(url+":"+new Date().getTime(),key,{iv:iv,mode:CryptoJs.mode.CBC,padding:CryptoJs.pad.ZeroPadding}).toString();
  return (username? username : store.get("user").username)+":"+pass;
}

//登陆
export function login(username,password){
  store.set("user",{username:username,password:HmacMD5(password,password).toString()});
}

//登出
export function loginOut(){
  var user = store.get("user");
  store.remove("user");
}
//存ID
export function setId(id){
  store.set("id",{id:id});
}

export function loggedIn() {

  var user = store.get("user");
  
  if(!!user){
    return user
  }else{
    return false;
  }
}
// export function loggedIn() {
//   var user = store.get("user");
//   if(!!user){
//     return user
//   }else{
//     return false;
//   }
// }






