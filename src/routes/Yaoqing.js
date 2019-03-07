import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, WhiteSpace, WingBlank ,Modal,Toast} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';
import * as Shop from '../services/shop';
import styles from "./styles/Yaoqing.less";
import MyTabBar from "../components/TabBar";
import * as fetch from '../services/shop';
import {APIHost,loggedIn} from "../utils/fetch";
import { template } from 'handlebars';
import m02 from '../assets/images/ccc.png';
import m03 from '../assets/images/fh.png';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Yaoqing extends Component {
    
    state={
        selectedTabBar:'mines' ,
        data:'',
        host:''
    }
    async componentDidMount(){
        const result=await Shop.yaocode();
        var host = window.location.host;
        const data=result.data;
        // console.log(data,'data5')
        this.setState({data:data.invitation,host:host})
    }
   
    render(){ 
        const {history}=this.props;
        const {data,host}=this.state;
        console.log(data,555);
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                  
                   
                    `}
                </style>
                <div className={styles.content}>
                    <div className={styles.bgimg}>
                        <img src={m02} />
                    </div>
                   
                    <img src={m03} className={styles.back} onClick={()=>history.go(-1)} />
                    <div className={styles.ma}>
                        <img className={styles.mama} src={"http://qr.liantu.com/api.php?text=http://"+host+"/Res?vip="+data} />
                    </div>
                </div>
                
            </div>
        )
    }
}