import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Daypro.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import {loggedIn, loginOut} from '../utils/fetch';

import Goods from '../components/Goods';
import * as Shop from '../services/shop';
import { Tabs, Button,Modal ,List ,WhiteSpace} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/tj.png';
import v08 from '../assets/images/kong.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Daypro extends Component {
        state = {
            val: 0,
            data:'',
            pid:'',
            product:[]
        }   
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.fenl({id:parse.id});
        const product=result.data.product;
        this.setState({
            data:result.data,
            product:product

        });
        console.log(product.length,'left: 50%;')

        
    }
    async getGoodsListOfClass(i,index){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
       
        const result=await Shop.fenl({pd_cate:i.id,id:parse.id}); 
        this.setState({
            data:result.data,
            pid:i.id
        });     
    }
      //select 选择框
    async onChanges(v) {
        const {pid,data}=this.state;
        const number = v.target.value
        console.log(number,'number')
        const result=await Shop.fenl({orderby:number,pd_cate:pid?pid:data.cate[0].id});   
        this.setState({data:result.data})
        
    }
    details(id){
        const {dispatch,history}=this.props;
        if(loggedIn() && loggedIn().username){
           
            dispatch(routerRedux.push('/Details?id='+id))
        }
        else{
            const alert = Modal.alert;
            const alertInstance = alert(' ', '请您先登录', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认', onPress: () => history.push('/login') },
            ]);
        }
        
    }
    render(){
        const {ptu,data,product}=this.state;
        const pro=product?product:''
        // console.log(pro.l,'pro')
        const {history,dispatch}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"",
            rightContent:"",
            rightFunc(){
            }
        }
        const optio=[
            {
                id:0,
                name:'请选择'
            },
            {
                id:1,
                name:'销量正序'
            },
            {
                id:2,
                name:'销量倒序'
            },
            {
                id:3,
                name:'价格正序'
            },
            {
                id:4,
                name:'价格倒序'
            },
            {
                id:5,
                name:'添加时间倒序'
            },
        ]
        let tabs = [];
        data.cate?data.cate.map(function(item){
            const id=item.id;

            item.title = item.fl_name;
            tabs.push(item);
        }):''

        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:#5DD075;
                    }
                    .am-tabs-default-bar-underline{
                        border: 0.03rem #5DD075 solid ; 
                    }
                    
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-tabs-tab-bar-wrap{
                        margin-bottom: 0.3rem;
                    }
                    .am-modal-body,.am-modal-button-group-h .am-modal-button{
                        color: #5DD075;
                    }
                    .dibu{
                        height:0.74rem;
                        line-height:0.74rem;
                        color:#9F9F9F;
                        font-size:0.24rem;
                        text-align:center;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div className={styles.tabbar}>
                    <Tabs tabs={tabs}
                        initialPage={'t1'}  
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >  
                        <div style={{ display: 'flex',flexDirection: 'column'  }}>
                            <select className={styles.xiala} onChange={(v) => this.onChanges(v)} >
                                {
                                    optio?optio.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )

                                    }):''
                                }
                            </select>
                            {/* <Goods /> */}
                            <div className={styles.moshi} >
                                <div className={styles.box}>
                                    {
                                        product.length!==0?product.map((item,index)=>{
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

                                        }):
                                        <div style={{width:"100%",textAlign:"center"}}>
                                        <img src={v08} style={{width:"60%"}} />
                                        <p style={{fontSize:"0.3rem",color:"#cbcbcb"}}>暂时还没有添加商品哦。。。。。。</p>
                                    </div>
                                    }
                            <div style={{clear:'both'}}></div>

                                </div>
                            </div>
                            <div className={styles.tuijian}>
                                <div className={styles.dl}>
                                    <div className={styles.dt}>
                                        <img src={v03} />
                                    </div>
                                    <div className={styles.dd}>热门推荐</div>
                                </div>
                                <div className={styles.ddl}>
                                    {
                                        data.host?data.host.map((item,index)=>{
                                            return(
                                                <dl key={index} >
                                                    <dt>
                                                        <img src={APIHost+item.pd_image} />
                                                    </dt>
                                                    <dd>
                                                        <h5>{item.pd_name}</h5>
                                                        <div className={styles.price}>
                                                            <span className={styles.hrice}>￥{item.pd_price}</span>
                                                            <s className={styles.lprice}>￥{item.pd_reg}</s>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            )

                                        }):""
                                    }
                                </div>
                                
                            </div>      
                        </div>          
                    </Tabs> 
                    <div className='dibu' >— 咩有更多商品了哦 —</div>  
                </div>
                
            </div>
        )
    }
}