import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank,List,InputItem} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import Goods from '../components/Goods';
import styles from "./styles/Zhifu.less";
import v07 from '../assets/images/back.png';
import Shopcar from './Shopcar';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Zhifu extends Component {  
    state = {
       pwd:""

    }
    inputUsername(value){
        if(value!==""&&this.state.pwd!==""){
            this.setState({pwd:value});
          }else{
            this.setState({pwd:value});
          }
    }
    sZhifu(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        let us_zfpwd=this.state.pwd;
        let data={
            "us_zfpwd":us_zfpwd,
            "id":parse.id,
        }
        fetch.spay(data).then((result=>{
            if(result.code==1){
                Toast.success(result.msg,2,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Order'))
                })
            }else{
                Toast.offline(result.msg,2)
            }
        }))
    }
    back(){
        const {history}=this.props;
        history.go(-1)
    }
   
    
    

    render(){
        
    
        const {history,dispatch,shop}=this.props;
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    .am-list-item .am-input-label{
                        font-size: 0.3rem;
                    }
                    .am-list-item.am-input-item,.am-list-item.am-input-item{
                        padding-left: 0rem;
                    }
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2.3rem;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/>  */}
                <img src={v07} className={styles.img} onClick={()=>this.back()} />
                <div className={styles.cc}></div>
                <div className={styles.sss} >
                    <div className={styles.boxtitle}>
                        <h5>支付</h5>
                    </div>
                    <div className={styles.content}>
                        <InputItem
                            type="password"
                            placeholder="交易密码"
                            clear
                            // maxLength="11"
                            ref='username'
                            onChange={this.inputUsername.bind(this)}
                            >请输入交易密码</InputItem>
                        <div>
                            <button className={styles.button} onClick={()=>this.sZhifu()}>确认支付</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}