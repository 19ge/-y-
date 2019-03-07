import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Fans.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Modal ,Table ,WhiteSpace, Toast} from 'antd-mobile';
// import icon01 from '../assets/images/cm.png';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/zz.jpg';
import v04 from '../assets/images/xxx.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Fans extends Component {
        state = {
            val: 0,
            check:1,
            status:'',
            data:''
        }
        async componentDidMount(){
            const result=await Shop.fans();
            if(result.code==1){
                Toast.success(result.msg,2)
            }else{
                Toast.offline(result.msg,2,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Mine'))
                })
            }
           
            this.setState({data:result.data});
           
        }
    // componentWillMount(){
    //     const {dispatch,location}=this.props;
    //     const parse=queryString.parse(location.search.replace('?',''));
    //     console.log(parse.index,"var queryString = require('querystring');")
    //     this.setState({number:parseFloat(parse.index)});
    // }
    
    //加载更多的方法,写法固定,只需替换变量名
    // loadFunc(e){
    //     const {dispatch,shop}=this.props;
    //     // let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
    //     let page = shop.pagination.current_page * 1 + 1;
    //     dispatch({
    //     type:"shop/dingdan",     //方法
    //     payload:{       //参数
    //         is_hot:true,
    //         page
    //     }
    //     })
    // }
    // details(item){
    //     const{dispatch}=this.props;
    //     dispatch(routerRedux.push('/Orderinfo?id='+item))
    // }

    async getGoodsListOfClass(item,index){     
    }
    
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    tan(){
        this.setState({
            check:0
        }) 
    }
    render(){
        const {status,page,check,data}=this.state;
        // const comeon=this.state.number;
        const {history,dispatch,shop}=this.props;
        
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"粉丝",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
            <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:#5DD075;
                    }
                    
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-button{
                        width: 1.53rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        color:#A1A1A0;
                        font-size: 0.24rem;
                        border:1px solid rgba(191,191,191,1)
                        border-radius:0.06rem;
                    }
                    .am-tabs-default-bar-underline{
                        border: 0.03rem #5DD075 solid ; 
                    }
                    .am-modal-transparent{
                        width:7.02rem;
                        height:7.55rem;
                    }
                    `}
                </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div className={styles.top}>
                    <p>我的推荐人：<span>{data.us_nickname}</span></p>
                    <p className={styles.tuand}>我的直推团队：<span className={styles.number}>{data.zhitui_count}</span>人</p>
                </div>
                <div className={styles.bottom}>
                    {
                        data.zhitui?data.zhitui.map((item,index)=>{
                            return(
                                <dl>
                                    <dt>
                                        <img src={APIHost+item.us_head_image} />
                                    </dt>
                                    <dd>
                                        <p>{item.us_id}</p>
                                        <p>{item.us_nickname}</p>
                                        <label>注册时间：{item.us_creattime}</label>
                                    </dd>
                                </dl>
                            )

                        }):""
                    }
                    
                </div>
               
            </div>
        )
    }
}