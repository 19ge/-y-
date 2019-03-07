import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Fenlei.less";
import * as Shop from '../services/shop';
import { Tabs, WhiteSpace,Stepper ,List,TextareaItem } from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import clear from "../assets/images/clear.png";
import icon2 from '../assets/images/search.png';
import MyTabBar from "../components/TabBar";
var queryString = require('querystring');

@connect(state => ({ shop: state.shop }))
export default class Fenlei extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          checked:1,
          selectedTabBar: "trading",
          ldata:"",
          rdata:'',
          id:'',
          place:0,
          AttrA2:''
        }
    }
    async componentDidMount(){
        const result=await Shop.sfen()
        const data=result.data;
        this.setState({ldata:result.data.cate,rdata:result.data.child,rdata2:result.data.child[0],AttrA2:result.data.cate[0].id})   
    }
    async getGoodsListOfClass(item,index){
            const aaa=await Shop.sfen({id:item.id});
            const list =aaa.data.child;
            this.setState({
                rdata:list,
            })
    }
    tiao(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Carmera?id='+id))
    }
    //输入框数据改变
    onChange=(e)=>{
        if(e.target.value.length<=0){
          this.setState({
            place:0
          })
        }else{
          this.setState({
            place:1
          })
        }
        this.setState({ value:e.target.value });
      }
     // 输入框清除
    clear = () => {
        this.setState({ value: '',place:0});
    };
    //搜索框
    async searchFunc(v) {
        var evt = window.event || v; 
        if(evt.keyCode == 13){
            // console.log(v.target.value,'ffffffffffffffff');
            const d=v.target.value;
            this.setState({d:d,value:v})
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Carmera?value='+d))
        }else{

        }
        
    }
    chgAttr2=(i)=>{
        Shop.sfen({id:i}).then((result)=>{
            const list =result.data.child;
            this.setState({
                rdata:list,
                AttrA2:i,
            })
        });
    }
      //商品详情
    render(){
        const {DATA,ldata,rdata,rdata2}=this.state;
        const {history,dispatch}=this.props;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        let tabs = [];
            console.log(ldata,'ldata')        
        ldata?ldata.map(function(item){
            // const id=item.id;
            // console.log(item.title,'item');
            item.title = item.fl_name;
            tabs.push(item);
        }):''
        // console.log(this.state.AttrA2,'this.state.AttrA2')
        return(
            <div className={styles.App}>
                <style>
                        {`
                        .am-tabs-default-bar-tab{
                            color:#827F7F;
                            border-bottom:1px solid #CDCDCD;
                        }
                        .am-tabs-tab-bar-wrap{
                            width:1.6rem;
                        }
                        .am-tabs-default-bar-left{
                            background-color:#F0F0F0 !important;
                        }
                        .am-tabs-default-bar-tab-active{
                            color:#FFFFFF;
                            background:#5DD075;
                        }
                        .am-stepper{
                            height: 0.5rem;
                            min-height: 0.5rem;
                        }
                      
                        .title{
                            color:#201F1F;
                            font-size:0.26rem;
                        }
                        .content{
                            width:3rem; 
                            color:#827F7F;
                            font-size:0.24rem;
                            padding-left:0.15rem;
                        }
                        .am-list-item,.am-list-item .am-list-line{
                            width:2rem;
                            display: inherit;
                        }
                        .am-stepper-handler{
                            width:0.39rem;
                            height: 0.39rem;
                            line-height: 0.39rem;
                            border-radius:50% !important;
                        }
                        .am-icon-xxs{
                            width: 0.2rem;
                            height: 0.3rem;  
                        }
                        .am-stepper-handler-down {
                            background:rgba(255,222,158,1);
                        }
                        .am-stepper-handler-up {
                            background:rgba(255,168,0,1);
                        }
                        .am-list-item{
                            min-height:auto;
                            position: relative;
                            top: 0.74rem;
                            float:right;
                        }
                        .am-stepper-input{
                            margin-top:-0.18rem;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            padding:0;
                        }
                        .am-icon-plus{
                            color:white;
                        }
                        .am-icon-minus{
                            color:#3C3C3C;
                        }
                        .am-stepper-handler-down-disabled, .am-stepper-handler-up-disabled{
                            opacity:0.1;
                        }
                        .bgimg{
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        .bgimg img{
                            width:7.5rem;
                        }
                        .am-whitespace.am-whitespace-md{
                            height:0;
                        }
                        .am-tabs-vertical .am-tabs-content-wrap{
                            margin-left:0.11rem;
                            background:#fff;
                        }
                        .am-tabs-vertical .am-tabs-pane-wrap{
                            background:#fff;

                        }
                        .am-tabs-default-bar-left{
                            background:#fff !important;
                        }
                        .am-tabs-default-bar-underline{
                            border: 0;
                        }
                        .leftbtn{
                            width:20%;
                            text-align:center;
                        }
                        .leftbtn p{
                            height:1rem;
                            line-height:1rem;
                        }
                        .leftbtn span{
                            display: inline-block;
                            width: 1.17rem;
                            height: 0.45rem;
                            margin: auto;
                            line-height: 0.45rem;
                            border-radius: 0.2rem;
                            margin:auto;
                        }
                        .rcontent{
                            width: 80%;
                        }
                        .data{
                            font-size:0.4rem;
                            color:#999;
                            position: relative;
                            top: 4.3rem;
                            left: 1.3rem;
                        }
                        `}
                    </style>
                    {/*底部标签栏*/}
                <MyTabBar {...tabBarProps} />
                <div className={styles.top}>
                    <div className={styles.searchclear}  onClick={()=>this.clear()} style={{display:this.state.place===1?"block":"none"}}>
                        <img src={clear} alt=""/>
                    </div>
                    <img className={styles.search} src={icon2} />
                    <input placeholder='请输入您想要的商品' onChange={(e)=>this.onChange(e)}  onKeyDown={(v)=>this.searchFunc(v)} value={this.state.place===0?"":this.state.value}/>
                </div>
                <div className={styles.middle} >
                    <div className='leftbtn'>
                        {
                            ldata?ldata.map((item,index)=>{
                                return(
                                    <p><span style={{background:this.state.AttrA2===item.id?'#5DD075':'',color:this.state.AttrA2==item.id?'#ffffff':'' }} onClick={()=>this.chgAttr2(item.id)}>{item.fl_name}</span></p>
                                )
                            }):""
                        }
                    </div>
                            <div className={styles.product}>
                                {
                                    rdata.length!==0?rdata.map((item,index)=>{
                                        return(
                                            <dl onClick={()=>this.tiao(item.id)}>
                                                <dt>
                                                    <img src={APIHost+item.fl_image} />
                                                </dt>
                                                <dd>{item.fl_name}</dd>
                                            </dl>
                                        )
                                        
                                    }):<div className='data'>没有数据哦。。。</div>
                                }
                                <div style={{clear:"both"}}></div>
                            </div>
                        </div>
                        </div>
        )
    }
}