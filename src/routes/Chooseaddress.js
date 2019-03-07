import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank,Checkbox,Stepper} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import Goods from '../components/Goods';
import styles from "./styles/Chooseaddress.less";
import icon10 from '../assets/images/shan.png';
import icon01 from '../assets/images/bian.png';
import v04 from '../assets/images/g03.png';
import v07 from '../assets/images/huo.png';
import c1 from '../assets/images/c1.png';
import c2 from '../assets/images/c2.png';
import Shopcar from './Shopcar';
// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Chooseaddress extends Component {  
    state = {
        data:"",
        state:1,
        checked:"",
        id:''
    } 
    async componentDidMount(){
        const result=await fetch.caddress();
        const data=result.data;
        // console.log(data,'data')
        data?data.map((item,index)=>{
            item.check;
            // console.log(item,'item999')
            if(item.type==1){
                item.check==true
                var c=document.getElementById('p');
                // console.log(c,'ccccc')
            }else{
                item.check==false
            }
        }):""
        this.setState({data:data});
    }
    async delete(id){
        const {data}=this.state;
        const result=await fetch.deladdress({id:id});
        if(result.code==1){
            Toast.success(result.msg,2,()=>{
                data?data.map((itm,index)=>{
                    if(itm.id==id){
                        data.splice(index,1)
                    }
                }):""
                this.setState({data:data})
            })
        }else{
            Toast.offline(result.msg,2)
        }
        // this.setState({data:result.data})
    }
    //设为默认
    async setDefault(e,item,id){
        let isDefault=e.target.checked;
        let sql={id:item.id,isDefault};
        let value=await fetch.maddress(sql);
        if(value.code==1){
            Toast.success(value.msg,1);
            const mm=await fetch.caddress();
            const mdata=mm.data;
            mdata?mdata.map((ite,ind)=>{
                console.log(ite,'ite')
                if(ite.id==id){
                    ite.check=isDefault;
                }else{
                    
                }
                
            }):""
            this.setState({data:mdata});
        }else{
            Toast.fail(value.msg,1);
        }
    }
    tiao(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Editaddress?id='+id))
    }
    render(){
        const {history,dispatch,shop}=this.props;
        const {data}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"选择地址",
            rightContent:"",
            rightFunc(){
            }
        }
        console.log(localStorage.getItem('index'))
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    .am-checkbox.am-checkbox-checked .am-checkbox-inner{
                        border-color: #5DD075;
                        background: #5DD075;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/> 
                <div style={{paddingBottom:"1.3rem"}}>
                {
                    this.state.data?this.state.data.map((item,index)=>{
                        const id=item.id
                        return(
                            <div className={styles.address}>
                                <div className={styles.left}>
                                <Checkbox 
                                // checked={(parseInt(localStorage.getItem('index')))===index?true:false}
                                checked={item.type==1?true:false}
                                // checked={this.state.id===item.id}
                                onChange={e=>this.setDefault(e,item,id)}  
                                defaultChecked={true}
                                className={styles.editL}>
                                </Checkbox>
                                </div>
                                <dl>
                                    <dt>
                                        <div className={styles.sperson}>
                                            <span>收货人{item.id}</span>
                                            <span className={styles.aname}>{item.us_name}</span>
                                            <span className={styles.atel}>{item.us_tel}</span>
                                        </div>
                                        <p>{item.us_detailed}</p>
                                    </dt>
                                    <dd>
                                    <img src={icon10} onClick={()=>this.delete(item.id)} />
                                    <img src={icon01}  style={{marginLeft:'0.59rem'}} onClick={()=>this.tiao(id) }/>
                                    </dd>
                                    <div style={{clear:'both'}}></div>
                                </dl>
                                <div style={{clear:'both'}}></div>
                            </div>
                         )

                    }):""
                }
                </div> 
                <button className={styles.button} onClick={()=>history.push('/Taddress')}>添加新地址</button>
            </div>
        )
    }
}