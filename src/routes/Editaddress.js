import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Taddress.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import arrayTreeFilter from 'array-tree-filter';
import { Tabs, Icon,InputItem ,List,Toast ,Button,Stepper, Range,Picker } from 'antd-mobile';
import { APIHost } from '../utils/fetch';
const cityData  = require('../../public/ssx');
var queryString = require('querystring');

@connect(state => ({ shop: state.shop }))
export default class Editaddress extends Component {
    state={
        disabled:true,
        name:"",
        tel:"",
        address:"",
        pickerValue:[],
        data:"",
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 
        const id=parse.id;
        const result=await Shop.xaddress({id:id});
        const acode=result.data.addr_code;
        
        this.setState({data:result.data,acode:acode})
    }
    
    inputUsername(value){
        if(value!==""&&this.state.name!==""){
            this.setState({name:value});
          }else{
            this.setState({name:value});
          }
    }
    inputel(value){
        if(value!==""&&this.state.tel!==""){
            this.setState({tel:value});
          }else{
            this.setState({tel:value});
          }
    }
    inputaddress(value){
        if(value!==""&&this.state.address!==""){
            this.setState({address:value});
          }else{
            this.setState({address:value});
          }
    }
    //保存
    service(){
        const {dispatch}=this.props;
        let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //昵称
        let tel=this.state.tel?this.state.tel:this.refs.tel.state.placeholder;
        let address=this.state.address?this.state.address:this.refs.address.state.placeholder;
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?","")); 
        const id=parse.id;
        let data={
            "us_name":name,
            "us_tel":tel,
            "us_detailed":address,
            "area" : "",
            "addr_code" :this.state.pickerValue.length==0?this.state.acode:this.state.pickerValue,    //城市的编号
            "id":id
        }
        var cityData = this.state.pickerValue.length==0?this.refs.xxx.props.extra:this.state.pickerValue;
        // console.log(cityData,'birthday')
        if(name==''){
            Toast.offline("请输入收货人!",1);
            return;
        }
        if(tel==''){
            Toast.offline("请输入联系电话!",1);
            return;
        }
        if(tel.length!=11){
            Toast.offline("联系电话不正确!",1);
            return;
          }
        if(address==''){
            Toast.offline("请输入详细地址!",1);
            return;
        }
        if(cityData.length<2||cityData.length>3){
            Toast.offline("所在地区不正确!",1);
            return;
        }
        if(cityData.length==2){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data.province = cityArr[0]?cityArr[0]:this.state.data.province;
            data.city = cityArr[1]?cityArr[1]:this.state.data.city;
        }else if(cityData.length==3){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data.province = cityArr[0]?cityArr[0]:this.state.data.province;
            data.city = cityArr[1]?cityArr[1]:this.state.data.city;
            data.area = cityArr[2]?cityArr[2]:this.state.data.area;
        }else{
            Toast.offline("所在地区不正确!",1);
            return;
        }
        Shop.caddress2(data).then((result=>{
            if(result.code==1){
                Toast.success('添加成功',2,function(){
                    dispatch(routerRedux.goBack())
                })
            }else{
                Toast.fail(result.msg,2);
            }
        }))
    }
    getSel() {
        const value = this.state.pickerValue;
        console.log(value,'val')
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    render(){
        const {history,dispatch}=this.props;
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
        const extra=[
            data.province,
            data.city,
            data.area
        ]      
        return(
            <div className={styles.App}>
            <style>
            {`
         
                .am-list-item .am-input-control input{
                    border:2px solid rgba(202, 202, 202, 1);
                    border-radius:10px;
                    height:0.66rem;
                    padding-left:0.2rem
                }
                .am-list-item .am-input-label.am-input-label-5{
                    width: 1.5rem;
                }
                .am-list-item .am-input-label{
                    color:#656565;
                    font-size:0.26rem;
                }
                .am-list-item.am-input-item{
                    height: 1.1rem;
                }
                .am-list{
                    background: #ffffff;
                }
                .am-list-item .am-list-line .am-list-content{
                    width: 1.5rem;
                    font-size: 0.26rem;
                    flex: initial;
                }
                .am-list-item .am-list-line .am-list-extra{
                    border: 2px solid rgba(202, 202, 202, 1);
                    border-radius: 10px;
                    height: 0.66rem;
                    padding-left: 0.2rem;
                    flex-basis: 78%;
                    margin-left: 0.1rem;
                    color: #5DD075;
                    font-size: 0.3rem;
                    padding-right: 0.2rem;
                    line-height: 1.3;
                }
                .am-picker-popup-item{
                    color: #5DD075;
                }
                
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>

                <List className="my-list">
                    <InputItem
                        clear
                        ref="name"
                        placeholder={data.us_name}
                        onChange={this.inputUsername.bind(this)}
                        >姓名</InputItem>
                    <InputItem
                        clear
                        onChange={this.inputel.bind(this)}
                        maxLength='11'
                        ref="tel"
                        type='number'
                        placeholder={data.us_tel}
                        >联系电话</InputItem>
                       
                        <List>
                            <Picker
                                visible={this.state.visible}
                                data={cityData.globalData}
                                placeholder='ddd'
                                value={this.state.pickerValue}
                                extra={extra}
                                onChange={v => this.setState({ pickerValue: v })}
                                onOk={() => this.setState({ visible: false })}
                                onDismiss={() => this.setState({ visible: false })}
                                ref='xxx'

                                >
                                <List.Item ref="cityInfo" extra={this.getSel()?this.getSel():extra} onClick={() => this.setState({ visible: true })}>
                                    所在地区
                                </List.Item>
                            </Picker>
                        </List>
                        <InputItem
                        clear
                        onChange={this.inputaddress.bind(this)}
                        placeholder={data.us_detailed}
                        ref="address"
                        >详细地址</InputItem>
                </List>
                <button className={styles.button} onClick={()=>this.service()}>保存</button>
            </div>
        )
    }
}