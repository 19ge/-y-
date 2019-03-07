import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Goods.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import GoodItem from '../components/GooodItem';
import * as Shop from '../services/shop';
import { Tabs, Button,Modal ,List ,WhiteSpace} from 'antd-mobile';
// import icon01 from '../assets/images/cm.png';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/good02.png';
import good01 from '../assets/images/g01.png';
import v04 from '../assets/images/xxx.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Goods extends Component {
        state = {
            val: 0,
            check:1,
            status:'',
            ptu:''
        } 
        async componentDidMount(){
            const result=await Shop.gonglist();
            // const result=await Shop.gonglist();
            this.setState({ptu:result.data.host})
        } 
        details(id){
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Details?id='+id))
        }
    render(){
        const {ptu}=this.state;
        const {history}=this.props;
        return(
            <div className={styles.App}>
                <div className={styles.moshi} >
                    <div className={styles.box}>
                        {
                            ptu?ptu.map((item,index)=>{
                                return(
                                    <dl key={index} onClick={()=>this.details(item.id)}>
                                        <dt>
                                            <img src={APIHost+item.pd_image} />
                                        </dt>
                                        <dd>
                                            <h5>{item.pd_name}</h5>
                                            <p>{
                                                item.pd_describe
                                            }
                                            </p>
                                            <div className={styles.price}>
                                                <span className={styles.hrice}>￥{item.pd_price}</span>
                                                <s className={styles.lprice}>￥{item.pd_reg}</s>
                                                <span className={styles.lprice}>已售 {item.pd_sale}</span>
                                            </div>
                                        </dd>
                                    </dl>
                                )

                            }):''
                        }
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
                
            </div>
        )
    }
}