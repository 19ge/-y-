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
@connect(state => ({ shop: state.shop }))
export default class Taddress extends Component {
    state={
        disabled:true,
        name:"",
        tel:"",
        address:"",
        pickerValue:[],
       
    }
    async componentDidMount(){
        
    }
    getSel() {
        const value = this.state.pickerValue?this.state.pickerValue:"";
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
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
        
        let name=this.state.name;
        let tel=this.state.tel;
        let address=this.state.address;
        let data={
            "us_name":name,
            "us_tel":tel,
            "us_detailed":address,
            // "area" : "",
            //   "city" : "郴州",
            //   "isDefault" : true,
            //   "province" : "湖南",
            "addr_code" : this.state.pickerValue,    //城市的编号
        }
        const cityData = this.state.pickerValue;
        
        // const cdata=cityData.join();
        // console.log(cdata.length,'cityDataaaaaa')
        // console.log(cityData,'cityData')
        if(this.state.name==''){
            Toast.offline("请输入收货人!",1);
            return;
        }
        if(this.state.tel==''){
            Toast.offline("请输入联系电话!",1);
            return;
        }
        if(this.state.tel.length!=11){
            Toast.offline("联系电话不正确!",1);
            return;
          }
        if(this.state.address==''){
            Toast.offline("请输入详细地址!",1);
            return;
        }
        if(this.state.pickerValue.length<2||this.state.pickerValue.length>3){
            Toast.offline("所在地区不正确!",1);
            return;
        }
        if(cityData.length==2){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data.province = cityArr[0];
            data.city = cityArr[1];
        }else if(cityData.length==3){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data.province = cityArr[0];
            data.city = cityArr[1];
            data.area = cityArr[2];
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
    render(){
        const {history,dispatch,shopData}=this.props;
        const {disabled,headimg,data}=this.state;
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
        const Item = List.Item;
        const Brief = Item.Brief;           
        return(
            <div className={styles.App}>
            <style>
            {`
         
                .am-list-item .am-input-control input{
                    border:2px solid rgba(202, 202, 202, 1);
                    border-radius:10px;
                    // width:5.2rem;
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
                    // padding-bottom: 0.3rem;
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
                        onChange={this.inputUsername.bind(this)}
                        >姓名</InputItem>
                    <InputItem
                        clear
                        onChange={this.inputel.bind(this)}
                        maxLength='11'
                        type='number'
                        >联系电话</InputItem>
                        <List>
                            <Picker
                                visible={this.state.visible}
                                data={cityData.globalData}
                                value={this.state.pickerValue}
                                onChange={v => this.setState({ pickerValue: v })}
                                onOk={() => this.setState({ visible: false })}
                                onDismiss={() => this.setState({ visible: false })}
                                >
                                <List.Item ref="cityInfo" extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
                                    所在地区
                                </List.Item>
                            </Picker>
                        </List>
                        <InputItem
                        clear
                        onChange={this.inputaddress.bind(this)}
                        >详细地址</InputItem>
                </List>
                <button className={styles.button} onClick={()=>this.service()}>保存</button>
            </div>
        )
    }
}