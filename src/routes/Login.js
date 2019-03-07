import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {login,loginOut} from '../utils/fetch';
import { Button, WhiteSpace, Toast,InputItem } from 'antd-mobile';
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Login.less";
import t03 from '../assets/images/fh.png';
import t01 from '../assets/images/l.png';
import t02 from '../assets/images/t.png';
import logo02 from '../assets/images/na.png';
import logo03 from '../assets/images/pa.png';

var store=  require('store')

@connect(state => ({ shopData: state.shop }))
export default class Login extends Component {
    state={
        tel:"",
        password:""
    }
    inputUsername(value){
        if(value!==""&&this.state.tel!==""){
            this.setState({tel:value});
          }else{
            this.setState({tel:value});
          }
    }
    inputUserpwd(value){
        if(value!==""&&this.state.password!==""){
            this.setState({password:value});
        }else{
            this.setState({password:value});
        }
    }
    async login(){
        const {dispatch}=this.props;
        let username=this.state.tel;
        let pwd=this.state.password;
        if(username===""){
            Toast.offline("请输入账号",2);
            return;
        }
        if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(username))){
            Toast.fail("手机号格式不正确!", 2);
            return;
        }
        if(pwd===""){
            Toast.offline("请输入密码",2);
            return;
        }
       
        Toast.loading("正在登录", 0);
        let data={
            'username':username,
            'password':pwd
        }
        const result=await Shop.userLogin(data);
        Toast.hide();
        if(result.code===1){
            login(username,pwd);
            var aas=[];
            // var datass={
            //     "username":username,
            //     "pwd":pwd
            // }
            // aas.push(data)
            // localStorage.setItem('key', JSON.stringify(aas));   
            Toast.success('登录成功!', 1,await function(){
                dispatch(routerRedux.push('/'))
            });
            
        }else{
            loginOut()
            Toast.fail(result.msg, 2);
        }   
    }
    render(){
        const { history, dispatch} = this.props;  
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
                        .am-list-item-middle{
                            margin-top:0.7rem;
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
                            placeholder="请输入手机号"
                            clear
                            maxLength="11"
                            ref='username'
                            onChange={this.inputUsername.bind(this)}
                            ><img src={logo02} alt=""/></InputItem>
                        <InputItem
                            type="password"
                            placeholder="请输入密码"
                            clear
                            ref='password'
                            onChange={this.inputUserpwd.bind(this)}
                            ><img src={logo03} alt=""/></InputItem>
                        <WhiteSpace /> 
                    </div>
                    <div style={{width:'100%',textAlign:'center'}}>
                        <Button type="primary" onClick={()=>this.login()}>登录</Button>
                    </div>
                    <div className={styles.box}>
                        <span onClick={()=>history.push('/Res')}>注册</span><span style={{paddingLeft:'0.53rem',paddingRight:'0.53rem'}}>|</span><span onClick={()=>history.push('/Modifypwd')}>忘记密码？</span>
                    </div>
                </div>
            </div>
        )
    }
}