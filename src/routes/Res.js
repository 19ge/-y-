import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {login} from '../utils/fetch';
import { Button, WhiteSpace, Toast,InputItem } from 'antd-mobile';
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Res.less";
import t03 from '../assets/images/fh.png';
import t01 from '../assets/images/l.png';
import t02 from '../assets/images/t.png';
import logo02 from '../assets/images/na.png';
import logo03 from '../assets/images/pa.png';
import t05 from '../assets/images/ss.png';
import t04 from '../assets/images/sss.png';
var queryString = require('querystring');

var store=  require('store')

@connect(state => ({ shopData: state.shop }))
export default class Res extends Component {
    state={
        username:"",
        password:"",
        val:"获取",
        tjcode:'' ,//邀请码
        phone:'', //手机号
        code:'' ,//验证码
        codeflag:0,
        passpsw:"",
    }
    
    btnpsw(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Forgetpsw'))
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
    //邀请码
    inputyp(val){
        this.setState({
            tjcode:val
        })
    }
    
    //密码
    inputPwd(val){
        this.setState({
            password:val
        })
    }
    //确认密码
    inputPass(val){
        this.setState({
            passpsw:val
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
                Toast.success(value.msg,2)

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
      //注册
      async register(){
         
        const {dispatch,register}=this.props;
        let tjcode=this.state.tjcode?this.state.tjcode:this.refs.res.state.placeholder;   //推荐码
        let phone=this.state.phone;  //手机号
        let code=this.state.code;    //验证码
        let loginpsw=this.state.password;   //登录密码
        let passpsw=this.state.passpsw;     //确认登录密码
        if(tjcode=='请输入推荐码'){
            tjcode=''
        }
        if(tjcode==""){
            Toast.offline("请填写推荐码", 2);
            return;
        }
        if(phone===""){
            Toast.offline("请输入11位手机号", 2);
            return;
        }
        if(code===""){
            Toast.offline("请输入验证码", 2);
            return;
        }
        if(loginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(loginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(loginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(passpsw===""){
            Toast.offline("请再次输入密码", 2);
            return;
        }
        if(passpsw!==loginpsw){
            Toast.offline("两次密码不一致", 2);
            return;
        }
        let data = {
            "invitation":tjcode,   //推荐码
            "us_tel":phone,    //手机号
            "code" :code,     //验证码
            "us_pwd" :loginpsw,   //登陆密码
            "us_pwd2" :passpsw,   //确认密码  
        }
        Toast.loading("正在注册", 0);
        console.log(data);
        const value =await Shop.register(data);
        Toast.hide();
        if(value.code===1){
      
            Toast.success('注册成功 !!!', 1,await function(){
                dispatch(routerRedux.push('/login'))
            });
            
        }else{
            Toast.fail(value.msg, 2);
        }
    }
    render(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 
        const {val}=this.state;
        const tcode=parse.vip?parse.vip:'';
        const { history, dispatch, shopData } = this.props;
        const navBarProps = {
            leftVisible: false,
            
            titleName: "登录",
            rightContent: "注册",
            rightFunc(){
                dispatch(routerRedux.push('/Zcxy'))
            }
          
        }
        
        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-navbar-right {
                            font-size: 0.34rem !important;
                            font-weight: bold;
                        }
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;
                        } 
                        .am-button-primary{
                            background:#5DD075;
                            font-size: 0.3rem;
                            width: 4.64rem;
                            margin: auto;
                        } 
                        a:hover{
                            text-decoration: none;
                        }
                        .am-list-item .am-input-label.am-input-label-5 {
                            width: 0.8rem;
                            height: 0.5rem;
                        }
                        .am-list-item img {
                            width: auto;
                            height: 100%;
                            vertical-align: middle;
                        }
                        .am-list-item.am-input-item {
                            height: 1rem;
                            border-bottom: .01rem solid #C7C7C7;
                            padding-left: .1rem;
                            margin-top: 0.3rem;
                        }
                        .am-list-item .am-input-clear-active{
                            background-color:#0187FC;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#7AA483;
                            font-size:.26rem;
                            text-align:left;
                        }
                        html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
                            background-color: #5DD075;
                            left: 0.53rem;
                        }
                        .am-list-item .am-input-extra{
                            font-size:0.26rem;
                            color:#5DD075
                        }
                                        
                    `}
                </style>
                <div className={styles.bgimg}>
                    <div className={styles.back} onClick={()=>history.go(-1)}>
                        <img src={t03} />
                    </div>
                    <dl>
                        <dt>
                            <img src={t01} />
                        </dt>
                        <dd>
                            <img src={t02} />
                        </dd>
                    </dl>
                    <div className={styles.input}>
                        <InputItem
                        type="number"
                        placeholder="请输入您的手机号"
                        clear
                        maxLength="11"
                        onChange={this.inputPhone.bind(this)}                       
                        ><img src={t05} /></InputItem>
                        <InputItem
                        type="text"
                        placeholder={tcode?tcode:"请输入推荐码"}
                        clear
                        ref='res'
                        maxLength="11"
                        onChange={this.inputyp.bind(this)}                       
                        ><img src={t05} /></InputItem>
                        <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        maxLength="16"
                        onChange={this.inputPwd.bind(this)}                      
                        ><img src={logo03} /></InputItem>
                      
                        <InputItem
                            type="password"
                            placeholder="确认密码"
                            clear
                            maxLength="16"
                            ref='password'
                            onChange={this.inputPass.bind(this)}
                            ><img src={logo03} alt=""/></InputItem>
                        <InputItem
                        type="number"
                        placeholder="输入手机验证码"
                        clear
                        maxLength="6"
                        extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.inputCode.bind(this)}
                        ><img src={t05} /></InputItem>     
                        <WhiteSpace /> 
                    </div>
                    <div style={{width:'100%',textAlign:'center',marginTop:'2rem'}}>
                        <Button type="primary" onClick={()=>this.register()}>注 册</Button>
                    </div>
                </div>
            </div>
        )
    }
}