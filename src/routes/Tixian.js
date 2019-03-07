import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Tixian.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import { List, InputItem, WhiteSpace,Button ,Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import z01 from '../assets/images/z01.png';
import z02 from '../assets/images/z02.png';
import z03 from '../assets/images/z03.png';
import z04 from '../assets/images/z04.png';
import z05 from '../assets/images/z05.png';
@connect(state => ({ shop: state.shop }))

export default class Tixian extends Component {
    state={
        num:"",
        safepwd:"",
        selectedTab: '2',
        hidden: false,
        fullScreen: false,
    }
    inputTx(value){
        if(value!==""&&this.state.num!==""){
            this.setState({num:value});
        }else{
            this.setState({num:value});
        }
    }
    inputpwd(value){
        if(value!==""&&this.state.safepwd!==""){
            this.setState({safepwd:value});
        }else{
            this.setState({safepwd:value});
        }
    }
    async btnTx(){
        const {dispatch}=this.props;
        let num=this.state.num;
        let safepwd=this.state.safepwd;

        let d=this.state.selectedTab;
        const result=await Shop.tixian({tx_num:num,us_safe_pwd:safepwd,tx_type:d});
        if(num===''){
            Toast.offline(result.msg, 2);
            return;
        }
        if(num<0){
            Toast.offline("提现金额不能为负", 2);
            return;
        }
        if(result.code==0){
            Toast.offline(result.msg, 2);
        }
        if(result.code==1){
            Toast.success(result.msg, 2);
        }
       
      }
      
    render(){  
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"提现",
            rightContent:"提现记录",
            rightFunc(){
		        dispatch(routerRedux.push('/Tixianrecord'));
            }
        }
        const {history,dispatch,shop}=this.props;
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    .rightContent{
                        font-weight:normal;
                    }
                    .am-list-item.am-input-item{
                        height:1rem;
                        {/* border-bottom: 1px solid #999999; */}
                    }
                    .am-list-item .am-input-label,.am-list-item .am-input-control{
                        font-size: 0.26rem;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab{
                        display:flex;
                        flex-direction: row;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab-title{
                        margin-left:0.23rem;
                    }
                    .am-list-body{
                        margin-top: 0.21rem;
                    }
                    .am-tab-bar{
                        top:0.4rem;
                        position: relative;
                        height: 1rem;
                    }
                    .am-button{
                        margin-top:0.65rem;
                        background:rgba(1,135,252,1);
                        font-size: 0.34rem;
                        {/* text-decoration: none; */}
                        
                    }
                    a:hover{
                        text-decoration-line: none;
                    }
                    .am-list-item .am-input-clear-active{
                        background-color: rgba(1,135,252,1);
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <List>
                    <InputItem
                       
                        clear
                        placeholder="请输入提现金额"
                        ref='num'
                        onChange={this.inputTx.bind(this)}
                    >提现金额</InputItem>
                    <InputItem
                       
                        clear
                        placeholder="请输入交易密码"
                        ref='safepwd'
                        onChange={this.inputpwd.bind(this)}
                    >交易密码</InputItem>
                </List>
                <div className={styles.account}>
                    <h5>提现账户</h5>
                    {/* 单选框 */}
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    ref='type'
                    hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title={
                                <img src={z01} style={{width:"0.6rem",height:"0.6rem"}}></img>
                            }
                            key="Life"
                            icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem', 
                                
                                }}
                            />
                            }
                            selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            selected={this.state.selectedTab === '2'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '2',
                            });
                            }}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                        }
                        selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            title={<img src={z02} style={{width:"0.6rem",height:"0.6rem;"}}></img>}
                            key="Koubei"
                        
                            selected={this.state.selectedTab === '3'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '3',
                            });
                            }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                        }
                        selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            title={<img src={z03} style={{width:"0.6rem",height:"0.6rem;"}}></img>}
                            key="Friend"
                            selected={this.state.selectedTab === '1'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '1',
                            });
                            }}
                        >
                        </TabBar.Item>
                    </TabBar>
                    <Button type="primary" onClick={()=>this.btnTx()}>确认提现</Button><WhiteSpace />
                </div>                   
                    <div>
                    </div>            
            </div>
        )
    }
}