import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button ,Toast,TabBar} from 'antd-mobile';
import * as Shop from '../services/shop';
import styles from "./styles/Mine.less";
import MyTabBar from "../components/TabBar";
import * as fetch from '../services/shop';
import {APIHost,loggedIn} from "../utils/fetch";
import { template } from 'handlebars';
import m from '../assets/images/mb.png';
import m03 from '../assets/images/m03.png';
import icon1 from '../assets/images/m0.png';
import icon2 from '../assets/images/m1.png';
import icon3 from '../assets/images/m2.png';
import icon4 from '../assets/images/m3.png';
import icon5 from '../assets/images/cz.png';

import copy from 'copy-to-clipboard';




var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Mine extends Component {
    
    state={
        selectedTabBar:'mines' ,
        data:'',
        status:'',
        num:""
    }
    async componentDidMount(){
        Shop.huiyuan().then((result=>{
            const data=result.data;
            this.setState({data:data})
        }))
    }
    copyCode=(url)=>{
        copy(url);
        Toast.success("复制成功!如未成功请手动复制!",3);
    }
    yao(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Yaoqing'))
    }
    chongzhi(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Chongzhi'))
    }
   
    tan(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Ytixian'))
    }
    inputUsername(value){
        if(value!==""&&this.state.num!==""){
            this.setState({num:value});
          }else{
            this.setState({num:value});
          }
    }
    render(){ 
        const {history}=this.props;
        const {data}=this.state;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                        // input::-webkit-input-placeholder {
                        //     color:#5DD075;
                        //     font-size:.28rem;
                        // } 
                        // .am-input-control{
                        //     border-bottom: 2px solid #5DD075;
                        // }
                        // .am-tab-bar-bar .am-tab-bar-tab{
                        //     display: flex;
                        //     flex-direction: row;
                        // }
                    `}
                </style>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                <div className={styles.top}>
                    <img src={m} />
                    <div className={styles.user}>
                        <dl>
                            <dt>
                                <img src={APIHost+data.us_head_image} />
                            </dt>
                            <dd>
                                <div className={styles.ddtop}>
                                    <span className={styles.name}>{data.us_nickname}</span>
                                    <span className={styles.fensi}>粉丝 {data.zhitui_count}</span>
                                </div>
                                <div className={styles.ddbot}>
                                    <span className={styles.name} >邀请码</span>
                                    <span className={styles.name} style={{paddingLeft:'0.2rem'}}>{data.us_id}</span>
                                    <span className={styles.dengji} onClick={()=>this.copyCode(data.us_id)}>复制</span>
                                </div>
                            </dd>
                        </dl>
                        <div className={styles.shezhi} onClick={()=>history.push('/Shezhi')}>
                            <img src={m03} />
                        </div>
                    </div>  
                    <div className={styles.tbot}>
                        <dl className={styles.dl}>
                            <dt className={styles.dt}>
                                <p className={styles.ptop}><span>收益</span><span>￥{data.us_jiangji}</span></p>
                            </dt>
                            <dd className={styles.dd} onClick={()=>this.tan()} >
                                立即提现
                            </dd>
                        </dl>
                        <div className={styles.shouyi}>
                            <div>
                                 <p className={styles.num}>￥ {data.us_cash}</p>
                                 <p className={styles.money}>余额</p>
                            </div>
                            <div>
                                 <p className={styles.num}>￥{data.today}</p>
                                 <p className={styles.money}>今日收益</p>
                            </div>
                        </div>
                        <div className={styles.xia}>
                            <p>上月收益 <span>￥{data.month}</span></p>
                        </div>
                        <div className={styles.box}>
                            <dl onClick={()=>history.push('/Earnings')}>
                                <dt>
                                   <img src={icon1} />
                                </dt>
                                <dd>收益</dd>
                            </dl>
                            <dl onClick={()=>history.push('/Order')}>
                                <dt>
                                   <img src={icon2} />
                                </dt>
                                <dd>订单</dd>
                            </dl>
                            <dl onClick={()=>history.push('/Fans')}>
                                <dt>
                                   <img src={icon3} />
                                </dt>
                                <dd>粉丝</dd>
                            </dl>
                            <dl onClick={()=>this.yao()}>
                                <dt>
                                   <img src={icon4} />
                                </dt>
                                <dd>邀请</dd>
                            </dl>
                            <dl onClick={()=>this.chongzhi()}>
                                <dt>
                                   <img src={icon5} />
                                </dt>
                                <dd>充值</dd>
                            </dl>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </div> 
                </div>
                
            </div>
        )
    }
}