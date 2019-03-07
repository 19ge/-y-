//引入所需请求
import * as shop from '../services/shop';
import {tokenLogin} from '../services/user';
import {userLogin,getClassify,getGoods,getShopList,getCarousel,getAddr,getOrder,mine,selectcity,factory,ruzhi,shangjin,news,newsxq,Storedelivery,tixianrecord,tansrecord} from '../services/shop';
import {  Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
var queryString = require('querystring');
export default {

  //空间对象名称，很重要！
  namespace: 'shop',
  //state 对象，大部分数据存储的位置
  state: {
    userInfo:{}, //用户详情信息
    areaInfo:[],//选择城市
    factoryInfo:[],//工厂详情
    infoList:[],//工厂信息
    tixianList:[],//提现记录
    transList:[],//转账记录
    injob:{},//入职
    ruzhilist:[], //入职记录
    monlist:[],//雅虎赏金
    newlist:[],//新闻公告
    newxqlist:[],//新闻详情
    Userin:[],//用户基本信息
    mineList:[], //用户信息
    storeInfo:[],//门店输送

    offinfo:[],//线下门店
    teamInfo:[],//我的团队
    supinInfo:[],//速聘经理
    yahuInfo:[],//雅虎经理
    classifyList:[],
    tixainInfo:[],//提现
    goodsList:[],
    shopList:[],
    packInfo:[],//领取礼包
    xieyiInfo:[],//协议
    ypackInfo:[] ,//已领取礼包
    zclist:[],//注册协议
    
    // 分页信息，与php对接写法可固定为此写法,部分数据可能不会用到
    pagination:{
      current_page:0,
      last_page:1,
      per_page:0,
      total:0,
      hasMore:false
    }
  },

  //加载组件前执行的请求
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //  if(location.pathname === '/'){
        //   dispatch({
        //     type: 'area',
        //     payload:""
        //   })
        //   dispatch({
        //     type: 'factory',
        //     payload:{is_hot: 1, page: 1}
        //   })
        // }
       
        // else if(location.pathname === '/Details'){
        //   if(location.search!=""){
        //     const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
        //     dispatch({
        //       type: 'factorydetail',
        //       payload:parse
        //     })
        //   }else{
        //     dispatch({
        //       type: 'factorydetail',
        //       payload:{}
        //     })
        //   }              
        // }

        if(location.pathname === '/Notice'){
          //新闻公告
          dispatch({
            type:'news',   
            payload:{page: 1,size:12}
          })
        }else if(location.pathname === '/Noticedetails'){
          //新闻详情
          if(location.search!=""){
            const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
            dispatch({
              type: 'newsxq',
              payload:parse
            })
          }else{
            dispatch({
              type: 'newsxq',
              payload:{}
            })
          }             
        }
       
        else if(location.pathname === '/Myteam'){
          //我的团队
          dispatch({
            type: 'team',
            payload:""
          })
        }else if(location.pathname === '/Gong'){
           
          //工种选择
          dispatch({
            type: 'area',
            payload:""
          })
          if(location.search!=""){
            const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
            dispatch({
              type: 'factory',
              payload:{gong:parse.id,page:1}
            })
          }else{
            dispatch({
              type: 'factory',
              payload:{}
            })
          } 
        }
      
        else if(location.pathname === '/Teamlist'){
          //雅虎经理
          dispatch({
            type: 'yahu',
            payload:""
          })
        }
        else if(location.pathname === '/Tixianrecord'){
          //提现记录
          dispatch({
            type: 'tixianjl',
            payload:{page: 1,size:12}
          })
        }
        else if(location.pathname === '/Transrecord'){
          //转账记录
          dispatch({
            type: 'transjl',
            payload:{page: 1,size:12}
          })
        }else if(location.pathname === '/Zcxy'){
          //转账记录
          dispatch({
            type: 'zcxy',
            payload:{}
          })
        }
      })
    }
  },
  
  //远程请求信息
  effects: {
    // 用户信息
    *getmineList({ payload }, {call, put}) {
      const data = yield call(mine);
      // console.log(data,'@@@@')
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload:{mineList: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *mine({ payload }, {call, put}) {
      const data = yield call(shop.PersonalInfo,payload);
      console.log(data,'@@@@111')
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload:{userInfo: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *area({ payload }, {call, put}) {
      const data = yield call(shop.selectcity,payload);
    
      if (data.code==1) {
    
        yield put({
          type: 'getUser',
          payload:{areaInfo: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },

    //入职记录
    *inrecord({ payload}, {call, put ,select}) {
      let List = yield select(state => state.shop.ruzhilist);
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {ruzhilist:List}
        })
      }
      // 发送请求
      const data = yield call(ruzhi,payload);
      if (data.code==1) {
        let {current_page,last_page,per_page,total}=data.data;
        let ruzhilist=List.concat(data.data.data);
        yield put({
          type: 'updateList',
          payload: {
            ruzhilist,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    },
    //雅虎赏金
    *shangjin({ payload}, {call, put ,select}) {
      let List = yield select(state => state.shop.monlist);
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {monlist:List}
        })
      }
      // 发送请求
      const data = yield call(shangjin,payload);
      if (data.code==1) {
        let {current_page,last_page,per_page,total}=data.data;
        let monlist=List.concat(data.data.data);
        yield put({
          type: 'updateList',
          payload: {
            monlist,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    },
       //新闻公告
       *news({ payload}, {call, put ,select}) {
        let List = yield select(state => state.shop.newlist);
        if(!payload||payload.page==1){
          List=[];
          yield put({
            type: 'getUser',
            payload: {newlist:List}
          })
        }
        // 发送请求
        const data = yield call(news,payload);
        if (data.code==1) {
          let {current_page,last_page,per_page,total}=data.data;
          let newlist=List.concat(data.data.data);
          yield put({
            type: 'updateList',
            payload: {
              newlist,
              pagination:{current_page,last_page,per_page,total}
            }
          })
        }
      },
      //公告详情
      *newsxq({ payload }, {call, put}) {
        const data = yield call(shop.newsxq,payload);

        if (data.code==1) {
    
          yield put({
            type: 'getUser',
            payload:{newxqlist: data.data} 
          })
        }else{
          Toast.fail(data.msg, 2);
        }
      },
       //注册协议
       *zcxy({ payload }, {call, put}) {
        const data = yield call(shop.zcxy,payload);  
        if (data.code==1) {
          yield put({
            type: 'getUser',
            payload:{zclist: data.data} 
          })
        }else{
          Toast.fail(data.msg, 2);
        }
      },
      //线下门店
      *off({ payload }, {call, put}) {
        const data = yield call(shop.offline,payload);
        if (data.code==1) {
          yield put({
            type: 'getUser',
            payload:{offinfo: data.data} 
          })
        }else{
          Toast.fail(data.msg, 2);
        }
      },
      //门店站长室
    *store({ payload}, {call, put ,select}) {
      let List = yield select(state => state.shop.storeInfo);
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {storeInfo:List}
        })
      }
      // 发送请求
      const data = yield call(Storedelivery,payload);
      if (data.code==1) {
        let {current_page,last_page,per_page,total}=data.data;
        let storeInfo=List.concat(data.data.data);
        yield put({
          type: 'updateList',
          payload: {
            storeInfo,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    },

    *xieyi({ payload }, {call, put}) {
      const data = yield call(shop.xieyi,payload);
      console.log(data,'@@@@111')
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload:{xieyiInfo: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
  
 //工厂列表
 *factory({ payload}, {call, put ,select}) {

  let List = yield select(state => state.shop.infoList);
  
  if(!payload||payload.page==1){
    List=[];
    yield put({
      type: 'getUser',
      payload: {infoList:List}
    })
  }
  // 发送请求
  const data = yield call(factory,payload);
  if (data.code==1) {

    let {current_page,last_page,per_page,total}=data.data;
   
    let infoList=List.concat(data.data.data);
 
    yield put({
      type: 'updateList',
      payload: {
        infoList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},
  //我的团队
  *team({ payload }, {call, put}) {
    const data = yield call(shop.team,payload);
    console.log(data,'@@@@111')
    if (data.code==1) {
      yield put({
        type: 'getUser',
        payload:{teamInfo: data.data} 
      })
    }else{
      Toast.fail(data.msg, 2);
    }
  },
  //转账记录
  *transjl({ payload}, {call, put ,select}) {

    let List = yield select(state => state.shop.transList);
    
    if(!payload||payload.page==1){
      List=[];
      yield put({
        type: 'getUser',
        payload: {transList:List}
      })
    }
    // 发送请求
    const data = yield call(tansrecord,payload);
    if (data.code==1) {
  
      let {current_page,last_page,per_page,total}=data.data;
     
      let transList=List.concat(data.data.data);
   
      yield put({
        type: 'updateList',
        payload: {
          transList,
          pagination:{current_page,last_page,per_page,total}
        }
      })
    }
  },



    // 获取商城商品列表列表和详情
    *getShopList({ payload}, {call, put ,select}) {
      // 获取上面state的元数据,写法固定
      let List = yield select(state => state.shop.shopList);
      // 如果是首次进入页面或其他原因,原始列表设为空,写法固定
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {shopList:List,shopDetail:{}}
        })
      }
      // 发送请求
      const data = yield call(getShopList,payload?payload:{});
      // 新的分页信息,参数名为thinkphp分页自带,和php对接可直接使用.
      let {current_page,last_page,per_page,total}=data.data;
      if (data.code==1) {
        // 新数据和老数据拼接,从而达成无缝翻页的效果
        let shopList=List.concat(data.data.data);

        // 调用下面的更新方法,写法固定
        yield put({
          type: 'updateList',
          payload: {
            shopList,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    }
    
    
  },

  //reducer 改变数据的唯一途径   Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {

    // 基本使用
    getUser(state, action) {
      return { ...state, ...action.payload };
    },

    // 更新列表，通用
    updateList(state,action){
      const {pagination} = action.payload;
      // 判断当前页面是否是最后一页,从而判断是否还有更多,以控制页面是否继续加载,
      if(pagination.current_page<pagination.last_page){
        action.payload.pagination.hasMore=true
      }else{
        action.payload.pagination.hasMore=false
      }
      return {...state,...action.payload}
    },


    
  }
  
};
