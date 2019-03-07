import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Shezhi.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
// import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/zz.jpg';
import {loginOut, APIHost} from '../utils/fetch';
import { Checkbox, Modal,InputItem ,List,ActionSheet ,Button, Toast } from 'antd-mobile';
@connect(state => ({ shop: state.shop }))
export default class Shezhi extends Component {
    state={
        modal2: false,
        imgUrlc:'',
        data:''
       
    }
    async componentDidMount(){
        Shop.huiyuan().then((result)=>{
            this.setState({data:result.data})
        })
    }
    //退出登录
    btntui(){
        const {dispatch}=this.props;
        loginOut();
        
        dispatch(routerRedux.push('/Login'))
    }
      //修改头像
      getLocalImgc(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrlc: e.target.result,     
            })
            Shop.uploadImg({imgFile:this.state.imgUrlc,type:1}).then((result)=>{
                if(result.code===1){
                    Toast.success(result.msg,1,()=>{
                        this.setState({t3:result.data})
                    });
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result
        }.bind(this)
    }
  
    render(){
        console.log(this.state.imgUrlc,'imgUrlc')
        const {history,dispatch,shopData,imgUrlc}=this.props;
        const {data}=this.state;
        // console.log(data.us_head_image)
        const Item = List.Item;
        
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"设置",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
            <style>
            {`
            .my-list{
                margin-bottom:0.3rem;
               
            }
            .am-list-item .am-list-line .am-list-content{
                color:#343434;
                font-size:0.3rem;
            }
            .am-action-sheet{
                left: 0.25rem;
                bottom: 0.3rem;
                width: 7rem;
                background-color: transparent;
            }
            .am-action-sheet-button-list-item{
                background: #fff;
                border-radius:0.12rem;
            }
            .am-action-sheet-button-list .am-action-sheet-cancel-button-mask{
                background-color: transparent;
                height: 0.3rem;
            }
            .am-modal-popup-slide-up .am-list-item .am-list-line .am-list-content{
                text-align: center;
            }
            .am-modal-popup{
                width: 7rem;
                margin-left: 0.25rem;
                border-radius:0.12rem;
            }
            .am-button-primary{
                color: #7E8185;
                background-color: #fff;
            }
            .am-list-item .am-list-line .am-list-extra{
                color: #AEAEAE;
                font-size: 0.26rem;
            }
            .am-list-body{
                background-color: transparent;
            }
            .am-list-item{
                margin-bottom: 0.11rem;
            }
            .fengmianDiv{
                width: 1.24rem;
                height: 1.24rem;
                display: inline-block;
            }
            .fengmianDiv img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
            #imgURlb{
                display:none
            }
            .imgc{
                margin-top:0.33rem;

            }
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.touxiang}>
                    <label className="fengmianDiv">
                        <input id="imgURlb" name="from" ref="files" type="file" onChange={(e) => this.getLocalImgc(e)} accept="image/jpeg,image/x-png,image/gif" />
                        < img className="id_cardb" ref="cover" name="enter_imgsPath" src={this.state.imgUrlc?this.state.imgUrlc:APIHost+data.us_head_image} />
                       
                    </label>
                    <div className='imgc'>点击修改头像</div>
                </div>
                <List className="my-list">
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Xgnc')}>
                        昵称
                    </Item>
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Xgmima')}>
                    修改登录密码
                    </Item>
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Jiaoyipwd')}>
                    修改交易密码
                    </Item>
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Alipy')}>
                    支付宝
                    </Item>
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Wechat')} >
                    微信
                    </Item>
                    <Item extra="修改" arrow="horizontal" multipleLine onClick={()=>history.push('/Chooseaddress')} >
                    收货地址
                    </Item>
                </List>
                <div className={styles.button} onClick={()=>this.btntui()}>
                退出登录
                </div>
                
            </div>
        )
    }
}