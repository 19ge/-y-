import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Ytixian.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import { List, InputItem, WhiteSpace,Button ,Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import z01 from '../assets/images/bg.png';
import z02 from '../assets/images/fh.png';
import z03 from '../assets/images/tlogo.png';
import z04 from '../assets/images/c1.png';
import z05 from '../assets/images/c2.png';
import v04 from '../assets/images/xxx.png';

import { clear } from 'size-sensor';
@connect(state => ({ shop: state.shop }))

export default class Chongzhi extends Component {
    state={
        check:1,
        selectedTab:'0',
        list:'',
        data:''
    }

    componentDidMount(){
        Shop.crecord().then((result)=>{
            const list=result.data.list;
            const data=result.data;
            this.setState({
                list:list,
                data:data
            })
        })
    }
    
    
    tan(){
        this.setState({
            check:0
        }) 
    }
    czhi(){
        let num=this.refs.num.value;
        let selectedTab=this.state.selectedTab;
        if(num==''){
            Toast.offline('请输入充值金额',2);
            return;
        }
        let data={
            "tx_sum":num,
            "tx_fangshi":selectedTab,
        }
        Shop.chongz(data).then((result)=>{
            const {dispatch}=this.props;
            if(result.code==0){
                Toast.offline(result.msg,2)
            }else if(result.code==1){
                Toast.success(result.msg,2,()=>{
                    // dispatch(routerRedux.push('/Ytixian'))
                    const url=result.data;
                    window.location=url;
                })
            }else if(result.code==2){
                Toast.offline(result.msg,2,()=>{
                    dispatch(routerRedux.push('/Shezhi'))
                })
            }
        })
    }
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    render(){  
        
        const {check,list,data}=this.state;
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
       
        const {history,dispatch,shop}=this.props;
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                        input::-webkit-input-placeholder {
                            color:#5DD075;
                            font-size:.28rem;
                        } 
                        .am-input-control{
                            border-bottom: 2px solid #5DD075;
                        }
                        .am-tab-bar-bar .am-tab-bar-tab{
                            display: flex;
                            flex-direction: row;
                        }
                        .zz{
                            padding-left: 0.2rem;
                            font-size: 0.28rem;
                            margin-top: -0.1rem;
                        }
                        html:not([data-scale]) .am-tab-bar-bar::before{
                            height:0;
                        }
                    `}
                </style>
                <div className={styles.top}>
                    <img className={styles.bgimg} src={z01} />
                    <div className={styles.nav}>
                       <img src={z02} onClick={()=>history.go(-1)} />
                       <p>充值</p>
                    </div>
                    <dl>
                        <dt>余额</dt>
                        <dd>{data.us_cash}</dd>
                    </dl>
                </div>
                <div className={styles.middle} onClick={()=>this.tan()}>
                充值
                </div>
                <div className={styles.btitle}>
                    <img src={z03} />
                    <span>充值记录</span>
                </div>
                {
                    list?list.map((item,index)=>{
                        return(
                            <div className={styles.body}>
                                <div className={styles.btop}>
                                    <p className={styles.topname}>充值</p>
                                    <p className={styles.time}>{item.tx_time}</p>
                                </div>
                                <div style={{clear:"both"}}></div>
                                <div className={styles.bottom}>
                                    <p className={styles.bname}>{item.tx_sum}</p>
                                    <p className={styles.btime}>{item.note}</p>
                                </div>
                                <div style={{clear:"both"}}></div>   
                            </div>
                        )
                    }):""
                }              
                <div className={styles.cc} style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div className={styles.sss} style={check===1?displaynone:displayblock}>
                    <div className={styles.boxtitle}>
                        <h5>充值</h5>
                        <img src={v04} onClick={()=>this.quxiao()} />
                    </div>
                    <div className={styles.content}>
                        {/* <div className={styles.cbox}>
                            <p className={styles.pname}>当前可充值金额</p>
                            <p className={styles.pcontent}>{data.us_cash}</p>
                        </div> */}
                        <div style={{clear:'both'}}></div>
                        <div className={styles.input}>
                            <label>充值金额</label>
                            <input type='number' placeholder="请输入充值金额" ref='num' />
                            <div style={{clear:'both'}}></div>
                        </div>
                        {/* 单选框 */}
                        <div className={styles.account}>
                            <label>充值方式</label>
                            <TabBar
                            unselectedTintColor="#949494"
                            tintColor="#5DD075"
                            barTintColor="white"
                            hidden={this.state.hidden}
                            >

                                <TabBar.Item
                                    title={
                                        <div className='zz'>支付宝</div>
                                    }
                                    key="Life"
                                    icon={
                                        <img src={z04} style={{
                                            width: '0.35rem',
                                            height: '0.35rem', 
                                        
                                        }}
                                    />
                                    }
                                    selectedIcon={
                                        <img src={z05} style={{
                                            width: '0.35rem',
                                            height: '0.35rem',         
                                        }}
                                    />
                                    }
                                    selected={this.state.selectedTab === '0'}
                                    onPress={() => {
                                    this.setState({
                                        selectedTab: '0',
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
                                    title={
                                        <div className='zz'>微信</div>

                                    }
                                    key="Koubei"
                                
                                    selected={this.state.selectedTab === '1'}
                                    onPress={() => {
                                    this.setState({
                                        selectedTab: '1',
                                    });
                                    }}
                                    data-seed="logId1"
                                >
                                </TabBar.Item>
                            </TabBar>
                        </div>
                       
                        <div>
                            <button className={styles.button} onClick={()=>this.czhi()}>充值</button>
                        </div>
                        
                    </div>
                </div>        
            </div>
        )
    }
}