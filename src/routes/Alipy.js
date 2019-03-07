import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Xgmima.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
// import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/zz.jpg';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { Checkbox, Modal,InputItem ,List,ActionSheet ,Button, Toast } from 'antd-mobile';
@connect(state => ({ shop: state.shop }))
export default class Alipy extends Component {
    state={
        modal2: false,
        val:"获取",
        account:'',
        name:'',
        loginpsw:""
    }
    inputapi(val){
        this.setState({
            account:val
        })
    }
    inputname(val){
        this.setState({
            name:val
        })
    }
    inputPwd(val){
        this.setState({
            loginpsw:val
        })
    }
    
    //退出登录
    btntui(){
        const {dispatch}=this.props;
        loginOut();
        
        dispatch(routerRedux.push('/Login'))
    }
    btngai(){
        const dispatch=this.props;
        let account=this.state.account;
        let loginpsw=this.state.loginpsw;
        let name=this.state.name;
        if(account==''){
            Toast.offline('请输入支付宝账号',1)
        }
        if(name==''){
            Toast.offline('请输入支付宝姓名',1)
        }
        if(loginpsw==''){
            Toast.offline('请输入交易密码',1)
        }
         let data={
             "alipay":account,
             "alipay_name":name,
             "us_zfpwd":loginpsw,
             "type":2
         }
        Shop.uploadImg(data).then((result=>{
        if(result.code==1){
            Toast.success(result.msg,2,()=>{

            })
        }else{
            Toast.offline(result.msg,2)
        }
        }))
    }

    render(){
        const {history}=this.props;
        const {val}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"支付宝绑定",
            rightContent:"",
        }
        return(
            <div className={styles.App}>
            <style>
            {`
                .am-list-item.am-input-item{
                    background-color: transparent;
                    margin-top: 0.4rem;
                }
                .am-list-item .am-input-label{
                    color: #2A2A2A;
                    font-size: 0.26rem;
                }
                .am-list-item .am-input-control{
                    font-size: 0.26rem;
                }
                .am-list-item .am-input-control input{
                    border-bottom: 2px solid #C2C2C2;
                    height: 0.88rem;
                    padding-top: 0.3rem;
                    padding-left: 0.3rem;
                }
                .am-list-item .am-input-label.am-input-label-5{
                    width: 1.3rem;
                    padding-top: 0.3rem;
                    text-align: right;
                    margin-right: 0.3rem;
                }
                .am-button{
                    width: 4.91rem;
                    height:0.9rem;
                    background: #5DD075;
                    color: #fff;
                
                }
                .am-button span{
                    opacity: 0.9;
                }
                html:not([data-scale]) .am-button {
                    position: absolute;
                    bottom: 0.9rem;
                    border: none;
                    left: 1.29rem;
                }
                .am-list-item .am-input-extra{
                    color: #5DD075;
                    font-size: 0.26rem;
                    margin-top: 0.3rem;
                }
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                    <InputItem
                        // type="number"
                        placeholder="请输入支付宝账号"
                        clear
                        // maxLength="11"
                        onChange={this.inputapi.bind(this)}                       
                        >支付宝账号</InputItem>
                    <InputItem
                    // type="number"
                    placeholder="请输入支付宝姓名"
                    clear
                    // maxLength="11"
                    onChange={this.inputname.bind(this)}                       
                    >支付宝姓名</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入交易密码"
                        clear
                        maxLength="16"
                        onChange={this.inputPwd.bind(this)}                      
                        >交易密码</InputItem>

                    <Button onClick={()=>this.btngai()}>确定修改</Button>
                        
                
            </div>
        )
    }
}