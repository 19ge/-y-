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
export default class Xgmima extends Component {
    state={
        modal2: false,
        val:"获取",
        phone:'',
        code:'',
        loginpsw:'',
        ploginpsw:'',
        codeflag:0,
       
    }
     //验证码
     inputCode(val){
        this.setState({
            code:val
        })
    }
    //手机号
    inputPhone(val){
        this.setState({
            phone:val
        })
    }
   
    inputPwd(val){
        this.setState({
            loginpsw:val
        })
    }
    inputUserpwd(val){
        this.setState({
            ploginpsw:val
        })
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const us_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;    
        if(us_tel.test(this.state.phone)){
            let fortime=60;
            const _this=this;
            const value =await Shop.getCode({us_tel:tel,type:"reg"});
            if(value.code===1){
                this.setState({
                    codeflag:1,
                })
                if(_this.state.codeflag){
                let secon=setInterval(function(){
                    _this.setState({
                    val:`${fortime--}s`
                    })
                    if(_this.state.codeflag===0||fortime<=-1){
                    clearInterval(secon);
                    _this.setState({
                        val:"再次获取",
                        codeflag:0
                    })
                    }
                },1000)
                }
            }else{
                Toast.offline(value.msg,1);
            }
        }else{
          Toast.offline("请输入11位手机号",1);
          return;
        }
      }
    surexg(){
        let tel=this.state.phone;
        let code=this.state.code;
        let loginpwd=this.state.loginpsw;
        let ploginpsw=this.state.ploginpsw;
        let data={
           'us_tel':tel,
           'code':code,
           'us_pwd':loginpwd,
           'us_pwd2':ploginpsw,
           'type':1
        }
        if(tel===""){
            Toast.offline("请填写手机号", 2);
            return;
        }
        if(code===""){
            Toast.offline("请输入验证码", 2);
            return;
        }
        if(loginpwd===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(ploginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(ploginpsw!==loginpwd){
            Toast.offline("两次密码不一致", 2);
            return;
        }
        Shop.xgmm(data).then((result)=>{
           if(result.code==1){
               Toast.success(result.msg,2,()=>{
                   const {dispatch}=this.props;
                   dispatch(routerRedux.push('/Login'))
               })
           }else{
               Toast.offline(result.msg,2)
           }
       })
    }
  
    render(){
        const {history}=this.props;
        const {val}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"修改登录密码",
            rightContent:"",
        }
        return(
            <div className={styles.App}>
            <style>
            {`
          
          .am-list-item.am-input-item{
            padding-left: 0.9rem;
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
            width: 1.1rem;
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
                        type="number"
                        placeholder="请输入您的手机号"
                        clear
                        maxLength="11"
                        onChange={this.inputPhone.bind(this)}                       
                        >手机号</InputItem>
                    <InputItem
                        type="number"
                        placeholder="输入手机验证码"
                        clear
                        maxLength="6"
                        extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.inputCode.bind(this)}
                        >验证码</InputItem>
                    <InputItem
                    type="password"
                    placeholder="请输入新密码"
                    clear
                    maxLength="16"
                    onChange={this.inputPwd.bind(this)}                      
                    >新密码</InputItem>
                    
                    <InputItem
                        type="password"
                        placeholder="请再次输入新密码"
                        clear
                        maxLength="16"
                        ref='password'
                        onChange={this.inputUserpwd.bind(this)}
                        >确认密码</InputItem>

                    <Button onClick={()=>this.surexg()}>确定修改</Button>
                        
                
            </div>
        )
    }
}