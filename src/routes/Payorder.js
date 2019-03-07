import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank,List,Stepper} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import Goods from '../components/Goods';
import styles from "./styles/Payorder.less";
import icon2  from '../assets/images/zb.png';
import icon9 from '../assets/images/bb.png';
import icon10 from '../assets/images/z02.png';
import icon01 from '../assets/images/c1.png';
import v04 from '../assets/images/g03.png';
import v07 from '../assets/images/huo.png';
import Shopcar from './Shopcar';



// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Payorder extends Component {  
    state = {
        datas:"",
        AttrA:0,
        AttrA2:4,
        Data:"",
        status:0,
        

      } 
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const u=parse.id;
        
        const data={
            "pd_id":parse.pd_id,
            "type":parse.type,
            "color":parse.color,
            "pd_num":parse.pd_num,
        }
        // const datas={
        //     "arr":parse.id
        // }
        if(u){ 
            var t= u.split(",");
            const result2=await fetch.tshop({arr:t});   
            this.setState({
                datas:result2.data.info,
                Data:result2.data,
            })          
        }else{
            const result=await fetch.buy(data);
            this.setState({
                datas:result.data.info,
                Data:result.data,
            })
        }

        // if(Data.addr_id){
        //     this.
        // }
      
       
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
    onClose = key => () => {
        this.setState({
          [key]: false,
        });
    }
    chgAttr=(e,i)=>{
        console.log('当前选择',e)
        this.setState({
            AttrA:e,
        })  
    }
    chgAttr2=(e,i)=>{
        console.log('当前选择',e)
        this.setState({
            AttrA2:e,
        })  
    }
    pay(d){
        const {Data,datas}=this.state;
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const u=parse.id;
        if(Data.addr_id){
            if(u){
                var t= u.split(",");
                let d={
                    "arr":t,
                    "addr_id":Data.addr_id
                }
                fetch.carpay(d).then((result=>{
                    const id=result.data;
                    if(result.code==1){
                        Toast.success(result.msg,2,()=>{
                            const {dispatch}=this.props;
                            dispatch(routerRedux.push('/Zhifu?id='+id))
                        })
                    }else{
                        Toast.offline(result.msg,2)
                    }
                }))
            }else{
                datas?datas.map((item,index)=>{
                    const pd_id=item.id;
                    const pd_type=item.ca_type;
                    const pd_num=item.pd_number;
                    const dataa={
                        "pd_id":pd_id,
                        "addr_id":Data.addr_id,
                        "pd_type":pd_type,
                        "pd_num":pd_num
                    };
                    
                    fetch.pay(dataa).then((result=>{
                        const id=result.data;
                        if(result.code==1){
                            Toast.success(result.msg,2,()=>{
                                const {dispatch}=this.props;
                                dispatch(routerRedux.push('/Zhifu?id='+id))
         
        
                            })
                        }else{
                            Toast.offline(result.msg,2)
                        }
                    }))
                }):""
            }
        }else{
            Toast.offline("请添加地址",2)
        }
          
    }
    //处理富文本
    htmlspecialchars_decode(str, APIHost){
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
        return str;
    }
    

    render(){
    
        const {history,dispatch,shop}=this.props;
        
        const {datas,Data}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"支付订单",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/> 
                
                    <div style={{display:Data.addr_id?'block':'none'}} className={styles.address} onClick={()=>history.push('/Chooseaddress')}>
                        <div className={styles.left}>
                            <img src={icon2} />
                        </div>
                        <dl>
                            <dt>
                                <div className={styles.sperson}>
                                    <span>收货人</span>
                                    <span className={styles.aname}>{Data.addr_receiver}</span>
                                    <span className={styles.atel}>{Data.addr_tel}</span>
                                </div>
                                <p>{Data.address}</p>
                            </dt>
                            <dd>
                                <img src={icon9} />
                            </dd>
                        </dl>
                        <div style={{clear:'both'}}></div>
                    </div>
                    <div style={{display:Data.addr_id?'none':'block'}} className={styles.contentop} onClick={()=>history.push('/Chooseaddress')}>
                        + 添加地址
                    </div>
 
                <div className={styles.contenmid}>
                {
                    datas?datas.map((item,index)=>{
                        const d=item.id
                        return(
                            <div className={styles.dian}>
                            <div style={{display:'flex'}}>
                                <h5>{item.shop_name}</h5>
                                
                            </div>
                            
                            <div style={{display:'flex'}}>
                                <dl>
                                    <dt>
                                        <img src={APIHost+item.pd_pic} />
                                    </dt>
                                    <dd>
                                        <h3>{item.pd_name}</h3>
                                        <p>{item.pd_describe}</p>
                                        <div className={styles.guige}>
                                            <span>类型:{item.type}</span>
                                            <span style={{marginLeft:"0.3rem"}}>规格：{item.color}</span>
                                        </div>  
                                        <div className={styles.jiage}>
                                            <span className={styles.price}>￥{item.type_sum}</span>
                                            <span className={styles.num}> x{item.pd_number}</span>
                                        </div>
                                    </dd>
                                    
                                    <div style={{clear:'both'}}></div>
                                </dl>
                            </div>
                            {/* <div className='steper'>
                                <span>数量</span>
                                <List.Item
                                    style={{touchAction:'none'}}
                                    wrap
                                    extra={
                                        <Stepper
                                        style={{ width: '100%', minWidth: '100px' }}
                                        showNumber
                                        max={100}
                                        min={1}
                                        // value={item.cart_num}
                                        // onChange={(value)=>{this.onChange2(value,index,item,sid)}}
                                        />}
                                    >
                                </List.Item>
                            </div> */}
                            <div className={styles.way}>
                                <span>配送方式</span>
                                <span style={{color:'#999999',float:'right'}}>商家自配送</span>
                                <div style={{clear:'both'}}></div>
                            </div>  
                        </div>
                        )

                    }):""
                }
                    
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>
                            <img src={v07} />
                        </dt>
                        <dd className={styles.dd}>热门商品</dd>
                    </dl>
                    <Goods />                                                                                              
                </div>
                <div className={styles.btnbot}>
                    <p>
                        支付金额：<span>￥{Data.total}</span>
                    </p>
                    <button className={styles.anniu} onClick={()=>this.pay()}>支付</button>
                </div>
                
            </div>
        )
    }
}