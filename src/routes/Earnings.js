import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Earnings.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Modal ,Table ,WhiteSpace, Toast} from 'antd-mobile';
// import icon01 from '../assets/images/cm.png';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/good02.png';
import v04 from '../assets/images/xxx.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Earnings extends Component {
        state = {
            val: 0,
            check:1,
            status:'',
            data:"",
           
        }
        
        async componentDidMount(){
            const result=await Shop.shouyi({type:1});
            if(result.code==0){
                Toast.offline(result.msg,2,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Mine'))
                })
            }
            this.setState({data:result.data});
        }

    async getGoodsListOfClass(item,index){
        const {data}=this.state;
        Shop.shouyi({type:item.type}).then((result)=>{
            this.setState({data:result.data})
        })
    }
    render(){
        const {status,page,check,data}=this.state;
        const {history,dispatch,shop}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"收益明细",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabs = [
            { title: '团队收益',type:1 },
            { title: '分红收益',type:2},
        ];
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        return(
            <div className={styles.App}>
            <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:#5DD075;
                    }
                    
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-button{
                        width: 1.53rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        color:#A1A1A0;
                        font-size: 0.24rem;
                        border:1px solid rgba(191,191,191,1)
                        border-radius:0.06rem;
                    }
                    .am-tabs-default-bar-underline{
                        border: 0.03rem #5DD075 solid ; 
                    }
                    .am-modal-transparent{
                        width:7.02rem;
                        height:7.55rem;
                    }
                    `}
                </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div className={styles.tabbar}>
                    <div style={{ height: 'auto' }}>
                    
                    <Tabs tabs={tabs}
                        initialPage={'t1'}   
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div>
                            <div className={styles.box}>
                                <div className={styles.name}>当前团队总收益：<span>{data.yeji}</span></div>
                            </div>
                            <table  border="1" color='#A7A8AA'>
                                <thead>
                                    <td>账号</td>
                                    <td>产生时间</td>
                                    <td>收益</td>
                                </thead>
                                {
                                    data.detail?data.detail.map((item,index)=>{
                                        return(
                                            <tr>
                                                <td>{item.us_tel}</td>
                                                <td>{item.add_time}</td>
                                                <td  className={styles.sy}>{item.num}</td>
                                            </tr>
                                        )

                                    }):""
                                }
                            </table>
                        </div>
                    </Tabs>
                    </div>
                </div>
               
            </div>
        )
    }
}