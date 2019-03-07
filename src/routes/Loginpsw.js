import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { Button, WhiteSpace, WingBlank,Toast} from 'antd-mobile';
import * as Shop from '../services/shop';
import { List, InputItem } from 'antd-mobile';
import styles from "./styles/Loginpsw.less";
import gift06 from '../assets/images/foun.png';
import { __await } from 'tslib';
@connect(state => ({ shopData: state.shop }))

export default class Loginpsw extends Component {
    state={
        codeflag:0,
        opwd:"",    //旧密码
        npwd:"",    //新密码
        cnpwd:"",   //确认新密码
    }
    inputOpwd(val){
        this.setState({
            opwd:val
        })
    }
    inputPwd(val){
        this.setState({
            npwd:val
        })
    }
    inputPass(val){
        this.setState({
            cnpwd:val
        })
    }
    async btnsub(){
        const {dispatch}=this.props;
        let opwd=this.state.opwd;
        let npwd=this.state.npwd;
        let cnpwd=this.state.cnpwd;

        if(opwd===""){
            Toast.offline("请输入旧密码", 2);
            return;
        }
        if(npwd===""){
            Toast.offline("请输入新密码", 2);
            return;
        }
        if(cnpwd===""){
            Toast.offline("确认新密码", 2);
            return;
        }
        if(npwd!==cnpwd){
            Toast.offline("两次输入密码不一致", 1);
            return;
        }
        let data = {
            "old_pwd": opwd,
            "us_pwd":npwd,
        }
        Toast.loading("正在修改", 0);
        const result=await Shop.modifyPwd(data);
        Toast.hide();
        if(result.code===1){
            //  if(   result.token){
            //      console.log(result.token)
            //      store.set("token",result.token)
            //  }
                // register(name,phone,code,loginpsw,idcard);
                Toast.success('修改成功 !!!', 1,await function(){
                    // return false;
                    dispatch(routerRedux.push('/Personal'))
                });
                
            }else{
                Toast.fail(result.msg, 2);
            }
        

    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            // leftFunc(){
            //     alert('提示', '你点击了左侧???', [
            //         { text: 'Cancel', onPress: () => console.log('cancel') },
            //         { text: 'Ok', onPress: () => console.log('ok') },
            //     ])
            // },
            titleName:"修改登录密码",
            rightContent:"",
            // rightFunc(){
            //     alert('提示', '你点击了右侧???', [
            //         { text: 'Cancel', onPress: () => console.log('cancel') },
            //         { text: 'Ok', onPress: () => console.log('ok') },
            //     ])
            // }
        }
        const {history,dispatch,shopData}=this.props;
        // const { type } = this.state;
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2.3rem;
                        font-size:0.3rem;
                    }
                    html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line{
                         border-bottom: 1PX solid #ddd; 

                    }
                    .input{
                        height:0.88rem;
                        line-height:0.88rem;
                    }
                    .input input{
                        height:100%;
                        width:70%;
                        border:0;
                        padding-left:0.3rem;
                    }
                    ::-webkit-input-placeholder{
                    font-size: 0.3rem;
                    color:#999999;
                    }
                    .input label{
                        font-size:0.3rem;
                        padding-left:0.3rem;
                        width: 30%;
                        display: inline-block;
                    }
                    .input input{
                        width:40%;
                    }
                    .input .getyzm{
                        width:30%;
                        color:#0766E0;
                        font-size:0.26rem;
                        padding-left:0.6rem
                    }
                    .am-button-primary{
                        font-size: 0.3rem;
                        background: #0766E0;
                        width:4.36rem;;
                        height:0.8rem;
                        line-height:0.8rem;
                        margin:auto;
                        border-radius:0.4rem;
                        margin-top:0.42rem;
                    }  
                    a:hover{
                        text-decoration: none;
                    }  
                    .am-list-item.am-input-item{
                        height: 1rem;
                        border-bottom: .01rem solid #C7C7C7;
                        {/* padding-left: .1rem; */}
                    } 
                    .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#666666;
                            font-size:.3rem;
                            text-align:left;
                        }
                        .am-button-primary{
                            background-color:#0187FC;
                        }  
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.conbox}>
                    <InputItem
                        type="password"
                        placeholder="输入旧登录密码"
                        clear
                        maxLength="16"
                        onChange={this.inputOpwd.bind(this)}                  
                        >旧登录密码</InputItem>
                        <InputItem
                        type="password"
                        placeholder="设置新登录密码"
                        clear
                        maxLength="16"
                        onChange={this.inputPwd.bind(this)}  
                      
                        >新登录密码</InputItem>
                        <InputItem
                        type="password"
                        placeholder="确认登录密码"
                        clear
                        maxLength="16"
                        onChange={this.inputPass.bind(this)}                  
                        >确认登录密码</InputItem>
                </div>
                <div className={styles.btn}>
                    <Button type="primary" onClick={()=>this.btnsub()}>确认提交</Button>   
                </div>

            </div>
        )
    }
}