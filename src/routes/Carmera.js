import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Carmera.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import Goods from '../components/Goods';
import * as Shop from '../services/shop';
import { Tabs, Button,Modal,Toast,List ,WhiteSpace} from 'antd-mobile';
// import icon01 from '../assets/images/cm.png';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/good02.png';
import good01 from '../assets/images/g01.png';
import v04 from '../assets/images/xxx.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Carmera extends Component {
        state = {
            val: 0,
            check:1,
            status:'',
            data:""
        }
        async componentDidMount(){
            const {location} = this.props;
            const parse=queryString.parse(location.search.replace("?",""));
            const result=await Shop.fens({pd_name:parse.value?parse.value:'',pd_cate:parse.id?parse.id:""})
            if(result.code==0){
                Toast.offline(result.msg,2)
            }
            const data=result.data;
            this.setState({data:data})   
        } 
        async onChanges(v) {
            const {location} = this.props;
            const parse=queryString.parse(location.search.replace("?",""));
            const {pid,data}=this.state;
            const number = v.target.value
            console.log(number,'number')
            const result=await Shop.fens({orderby:number,pd_cate:parse.id?parse.id:"",pd_name:parse.value?parse.value:''});   
            this.setState({data:result.data})
            
        }
        details(id){
            const {location} = this.props;
            const parse=queryString.parse(location.search.replace("?",""));
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Details?id='+id))
            
        }
    render(){
        const {data}=this.state;
        console.log(data,'data')
        const {history,dispatch,shop}=this.props;
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
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"",
            rightContent:"",
           
        }
       
      
        return(
            <div className={styles.App}>
                <style>
                    {`
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div>
                    <select className={styles.xiala} onChange={(v) => this.onChanges(v)} >
                        {
                            optio?optio.map((item,index)=>{
                                return(
                                    <option key={index} value={item.id}>{item.name}</option>
                                )

                            }):''
                        }
                    </select>
                    <div className={styles.moshi} >
                        <div className={styles.box}>
                            {
                                data?data.map((item,index)=>{
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
                        {/* <Goods />              */}
                </div>
            </div>
        )
    }
}