import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Shopcar.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import Goods from "../components/Goods";

import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import {Stepper ,List  ,Toast} from 'antd-mobile';
import icon01 from '../assets/images/c1.png';
import icon02 from '../assets/images/c2.png';
import v05 from '../assets/images/bian.png';
import v06 from '../assets/images/shan.png';
import v07 from '../assets/images/huo.png';
import v08 from '../assets/images/kong.png';


@connect(state => ({ shop: state.shop }))
export default class Shopcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shoping",
            state:1,
            tt:'',
            data:'',
            mdata:[],   
        }   
    }
    async componentDidMount(){
        const result=await Shop.shopcar();
        var ab = 0;
        const mdata=result.data.cart;
        // console.log(mdata,'mdata')
        // mdata?mdata.map((item,index)=>{
            
        //     item.detail.map((tt,index)=>{
        //         tt.selected=false;
        //     });
        // }):''
        this.setState({data:result.data,mdata:mdata,price:ab})
        
    }
   
    //编辑
    changestate(){
        this.setState({
            state:0
        })
    }   
    //确定
    queding(){
        this.setState({
            state:1
        })
    } 
    onChange2(val,id,item){
        item.pd_number=val; 
        var allData=this.state.mdata;
        var price = 0;
        allData?allData.map((item,index)=>{
            item.detail.map((itm,index)=>{
                    if(id==itm.id){
                        itm.pd_number=val
                    }
                    price += itm.pd_number*itm.ca_price; 
            })
        }):''
        this.setState({mdata:allData,price:price})
        Shop.shopcnum({cart_id:id,pd_num:val}).then((result2)=>{
            
        })

    }
    //选中未选中
    selectRadio(item,index){
        console.log(item,'itemmmmm123')
        const  {mdata}=this.state;  
        const list = this.state.mdata;
        list.map((ii,index)=>{
            console.log(index,'123456')
            ii[index]=item; 
            console.log(ii[index],'ii[index]')
            this.setState({list:list});
        });
        item.selected=!item.selected;
        this.setState({mdata:list});
        console.log(mdata,'mdata')   
    }
    //删除
    btndel(id){
        const  {mdata}=this.state;
        Shop.deletecar({cart_id:id}).then((result)=>{
            if(result.code==1){
                Toast.success(result.msg,2,()=>{
                    mdata?mdata.map((item,index)=>{
                        item.detail.map((itm,index)=>{
                            if(itm.id==id){
                                item.detail.splice(index,1)
                            }
                        })
                        if(item.detail==0){
                            mdata.splice(index,2);
                            
                        }
                    }):""
                   
                    this.setState({mdata:mdata});
                  
                })
                
               
            }
        });
    }
    //结算
    async total(){
        const {mdata}=this.state;

        var allArrid=[];
        mdata?mdata.map((item,index)=>{
            item.detail.map((tt,index)=>{     
                if(tt.selected){
                    allArrid.push(tt.id);
                    this.setState({
                        mdata:mdata,
                    })
                    console.log(allArrid,'123456789')
                    
                }
            });
        }):''
        const result=await Shop.tshop({arr:allArrid});
        if(result.code==1){
            Toast.success(result.msg,2,()=>{
                const {dispatch}=this.props;
                dispatch(routerRedux.push('/Payorder?id='+allArrid))
            })
        }else{
            Toast.offline(result.msg,2)
        }    
        this.setState({mdata:mdata})
    }
    render(){
        const {history,dispatch}=this.props;
        const {state,mdata,Datas}=this.state;
        var allMoney = 0;
        var c=0;
        mdata?mdata.map((item)=>{
            item.detail.map((o,index)=>{
                if(o.selected){      //选中
                    allMoney= allMoney+o.pd_number*o.ca_price*1;
                    c=allMoney.toFixed(2)   //保留两位小数
                  }
            })
           
        }):''
        
        const navBarProps = {
            leftVisible:false,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"购物车",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
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
                  
                    .am-list-item{
                        padding-left:0
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis:71%;
                    }
                    .am-stepper-input{
                        width: 1.18rem;
                        height: 0.56rem;
                        background:rgba(247,223,63,0);
                        border:1px solid rgba(93, 208, 117, 1);
                        border-radius:0.1rem;
                    }
                    .am-stepper-handler{
                        background:rgba(93,208,117,1);
                    }
                    svg:not(:root){
                        color:white;
                        font-weight: bold;
                    }
                    .am-list-item{
                        width:2.81rem;
                    }
                    .am-list-item .am-list-line{
                        display: inline;
                        padding-right:0
                    }
                    `}
                </style>
              
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                <div className={styles.content}>
                    {
                        mdata.length!==0?mdata.map((item,index)=>{
                            // const cid=item.id
                            return(
                                <div className={styles.dian}>
                                    <div style={{display:'flex'}}>
                                        <h5>{item.shop_name}</h5>
                                        <div className={styles.button} style={state===1?displaynone:displayblock} onClick={()=>this.queding()}>
                                            <p>确定</p>  
                                        </div>
                                    </div>
                                    {
                                        item.detail?item.detail.map((itm,index)=>{
                                            // console.log(itm,'itmmmm')
                                            var idd=itm.id
                                            return(
                                                  
                                                    <div style={{display:'flex',marginBottom:'0.3rem'}}>
                                                        <div style={{display:'flex',marginBottom:'0.3rem'}}>
                                                          
                                                            <div style={state===0?displaynone:displayblock} className={styles.img}>
                                                                <img className={styles.shan} src={v06}  onClick={()=>this.btndel(idd)}/>
                                                                <img className={styles.bian} src={v05} onClick={()=>this.changestate()} />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={styles.left}>
                                                            <img src={!itm.selected?icon01:icon02} onClick={()=>{this.selectRadio(itm,index)}}/>
                                                        </div>
                                                        <dl>
                                                            <dt>
                                                                <img src={APIHost+itm.pd_pic} />
                                                            </dt>
                                                            <dd style={state===0?displaynone:displayblock}>
                                                                <h3>{itm.pd_name}</h3>
                                                                <p>{itm.pd_content}</p>
                                                                <div className={styles.guige}>
                                                                    <span>类型:{itm.type}</span>
                                                                    <span style={{paddingLeft:'0.3rem'}}>规格：{itm.ca_type}ml</span>
                                                                </div>  
                                                                <div className={styles.jiage}>
                                                                    <span className={styles.price}>￥{itm.ca_price}</span>
                                                                    <span className={styles.num}> x{itm.pd_number}</span>
                                                                </div>
                                                            </dd>
                                                            <dd style={state===1?displaynone:displayblock}>
                                                                <h3>{itm.pd_name}</h3>
                                                                <div className={styles.lei}>
                                                                    <p>{itm.type}{itm.ca_type}ml</p>
                                                                </div>
                                                                <List.Item
                                                                    style={{touchAction:'none'}}
                                                                    wrap
                                                                    extra={
                                                                        <Stepper
                                                                        style={{ width: '100%', minWidth: '100px' }}
                                                                        showNumber
                                                                        max={100}
                                                                        min={1}
                                                                        // defaultValue={1}
                                                                        value={itm.pd_number}
                                                                        onChange={(value)=>{this.onChange2(value,itm.id,item)}}
                                                                        />}
                                                                    >
                                                                </List.Item>
                                                            </dd>
                                                            <div style={{clear:'both'}}></div>
                                                        </dl> 
                                                    </div>
                                            )
                                        }):'' 
                                    }
                                </div>
                            )
                        }):
                        <div style={{width:"100%",textAlign:"center"}}>
                            <img src={v08} style={{width:"60%"}} />
                            <p style={{fontSize:"0.3rem",color:"#cbcbcb"}}>您还没有添加商品哦。。。。。。</p>
                        </div>
                    }
                    
                    <div className={styles.produ}>
                        <dl className={styles.dl}>
                            <dt className={styles.dt}>
                                <img src={v07} />
                            </dt>
                            <dd className={styles.dd}>热门商品</dd>
                        </dl>
                        <Goods />
                    </div>
                </div>
                <div className={styles.jiesuan}>
                    <div>
                        <span className={styles.jine}>结算金额：</span>
                        <span className={styles.qian}>￥{c}</span>
                    </div>
                    <div className={styles.btn} onClick={()=>this.total()}>
                        结算
                    </div>
                     
                </div>
            </div>
        )
    }
}