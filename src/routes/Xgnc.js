import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Xgnc.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
// import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/zz.jpg';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { Checkbox, Modal,InputItem ,List,ActionSheet ,Button, Toast } from 'antd-mobile';
@connect(state => ({ shop: state.shop }))
export default class Xgnc extends Component {
    state={
        modal2: false,
        username:''
       
    }
    inputUsername(value){
        if(value!==""&&this.state.username!==""){
            this.setState({username:value});
          }else{
            this.setState({username:value});
          }
    }
    xiugai(){
      let name=this.state.username; 
      if(name===""){
        Toast.offline("请输入昵称", 2);
        return;
      }
      Shop.uploadImg({us_nickname:name,type:4}).then((result=>{
         if(result.code==1){
           Toast.success(result.msg,2)
         }
      }))
    }
  
    render(){
        const {history}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"修改昵称",
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
              }
              .am-list-item .am-input-label.am-input-label-5{
                width: 0.9rem;
                padding-top: 0.3rem;
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
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <InputItem
                placeholder="请输入昵称"
                clear
                maxLength="11"
                ref='username'
                onChange={this.inputUsername.bind(this)}
                >昵称</InputItem>
                <Button onClick={()=>this.xiugai()}>确定修改</Button>
                
            </div>
        )
    }
}