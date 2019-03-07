import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/IndexPage.less";
import "video-react/dist/video-react.css"; // import css
// 引入ANTD组件
import { Button, Toast, WhiteSpace, WingBlank, Card, Modal, Carousel } from 'antd-mobile';
import { SearchBar, Tabs } from 'antd-mobile';
import { Player } from 'video-react';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
import Goods from "../components/Goods";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 商品列表组件
import GoodItem from '../components/GooodItem';
// 无限滚动组件
import InfiniteScroll from 'react-infinite-scroller';
// 临时商品图
import good01 from '../assets/images/g01.png';
import icon1 from '../assets/images/kf.png';
import icon2 from '../assets/images/search.png';
import icon9 from '../assets/images/s10.png';
import icon10 from '../assets/images/tiao.png';
import icon11 from '../assets/images/xx.png';
import icon12 from '../assets/images/tui.png';
import { userInfo } from 'os';
var queryString = require('querystring');
// 设置alert,非必要,可直接使用Modal.alert,效果相同
// const alert = Modal.alert;
// 把model 传入props
@connect(state => ({ shop: state.shop }))
export default class IndexPage extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shop",
            data:'',
            ptu:""
           
        };
    }
    async componentDidMount(){
        const result=await Shop.shouy();
        this.setState({data:result.data,ptu:result.data.hots})

    }
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e) {
        const { dispatch, shop } = this.props;
        console.log("当前的页数====", shop.pagination.current_page);
        const { value, selectedValue, gong, prod_name } = this.state
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
            type:"shop/factory",     //方法
            payload:{       //参数
              prod_area: selectedValue,
              page,
              prod_name: prod_name,
              ishot:'1'
            }
          })
    }

    async changeData(id,name) {
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Daypro?id='+ id));
    }
    async searchFunc(v) {
        var evt = window.event || v; 
        if(evt.keyCode == 13){
            
            const d=v.target.value;
            this.setState({d:d})
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Carmera?value='+d))
        }else{

        }    
    }
    details(id){
        const {dispatch,history}=this.props;
        if(loggedIn&&loggedIn().username){  
            dispatch(routerRedux.push('/Details?id='+id))
        }else{
                const alert = Modal.alert;
                const alertInstance = alert(' ', '请您先登录', [
                    { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                    { text: '确认', onPress: () => history.push('/login') },
                    ]);
        }
        
    }
    render() {
        const { history, dispatch, shop,location } = this.props;
        const {data,ptu}=this.state;
        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div>
                {/* 样式 */}
                <style>
                    {`
                        .slider,.slider-list,.slider-slide,.slider-frame{
                            height:3.5rem !important;
                            width:100% !important;
                        }
                        .am-wingblank.am-wingblank-lg{
                            margin:0;
                        }
                        .am-wingblank,slider,.slider-frame{
                            height:0.81rem !important;
                        }
                        .am-wingblank{
                            height:3.5rem !important;
                        }
                        .pp .slider-frame{
                            height:100% !important;
                        }

                        
                    `}
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps} />
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.top}>
                        <img className={styles.search} src={icon2} />
                        <input placeholder='请输入您想要的商品' onKeyDown={(v)=>this.searchFunc(v)}/>
                        {/* <img className={styles.tel} src={icon1} /> */}
                    </div>
                    <div className={styles.bgimg}>
                        <WingBlank>
                            {
                                data.lunbotu?<Carousel
                                autoplay={true}
                                infinite
                                className='pp'
                                >
                                { data.lunbotu?data.lunbotu.map((item,index) => (
                                    <div
                                    key={index}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                    <img
                                        src={APIHost+item.lb_image}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top',height:'3.5rem' }}
                                    />
                                    </div>
                                )):""
                                }
                                </Carousel>:""
                            }
                                
                            </WingBlank>
                    </div>
                   
                    <div className={styles.list}> 
                        {
                            data.cate?data.cate.map((item,index)=>{

                                return(
                                    <dl key={index} onClick={() => { this.changeData(item.id) }}>
                                        <dt>
                                            <img src={APIHost+item.fl_image} alt="" />
                                        </dt>
                                        <dd>
                                            {item.fl_name}
                                        </dd>
                                    </dl>
                                )

                            }):''
                        }  
                    <div style={{ clear: "both" }}></div>
                    </div>
                    <div className={styles.title}>
                        <dl>
                            <dt>
                                <img src={icon9} />
                            </dt>
                            <dd>
                               <WingBlank>
                                   {
                                       data.news?
                                    <Carousel className="my-carousel"
                                    vertical
                                    dots={false}
                                    dragging={false}
                                    swiping={false}
                                    autoplay
                                    infinite
                                    speed={100}
                                    autoplayInterval={3000}
                                    resetAutoplay={false}
                                    >
                                    {
                                        data.news?data.news.map((item,index)=>{
                                            return(
                                                <div key={index} className="v-item">{item.message}</div>
                                            )
                                            
                                        }):""
                                       
                                    }
                                    </Carousel>
                                    :''
                                   }
                               
                                </WingBlank>
                            </dd>
                        </dl>
                    </div>
                    <div className={styles.product}>
                        <img className={styles.shi} src={icon10} />
                        <img className={styles.xin} src={icon11} />
                        <img className={styles.tiao} src={icon12} />
                        <img className={styles.shi} src={icon10} />
                    </div>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={(e) => this.loadFunc(e)}
                        hasMore={hasMore}
                        threshold={100}
                        loader={<div className="loader" style={{ fontSize: ".28rem", lineHeight: ".86rem", textAlign: "center", marginBottom: ".3rem" }} key={0}>加载中
                        ...</div>}
                    > 
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
                        {/* <Goods /> */}
                    </InfiniteScroll>
                    {/*商品列表 自动刷新*/}
                    {/*无限滚动插件NPM地址,https://www.npmjs.com/package/react-infinite-scroller*/}
                </div>
            </div>
        )
    }
}
