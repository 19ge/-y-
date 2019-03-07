import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Pay.less";
import MyNavBar from "../components/MyNavBar";
import { List, InputItem, WhiteSpace,Button,Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import z01 from '../assets/images/z01.png';
import z02 from '../assets/images/z02.png';
import z03 from '../assets/images/z03.png';
import z04 from '../assets/images/z04.png';
import z05 from '../assets/images/z05.png';
var queryString = require('querystring');
@connect(state => ({ shopData: state.shop }))

export default class Pay extends Component {
    
        state = {
            money:'',
            pwd:'',
            selectedTab: '2',
            hidden: false,
            fullScreen: false,
            openid:'',
            wxConfig:{},
            showModal: false,
            // ling_lei:'',
            check:1,
            datas:''
        };
    async componentDidMount() {
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        console.log(parse,'parse')
        var relevance=parse.id;
        const code=parse.code;
        var aas =localStorage.getItem('openid');  //把openid 存本地
        aas = eval('(' + aas + ')');
        // const state=parse.state;
        if(code&&!aas){
            relevance=parse.state;
            Shop.openid({code}).then((result)=>{   
                localStorage.setItem('openid', JSON.stringify(result.openid));
                aas=result.openid
            })
        }else{
            if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 && !aas){
                window.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb20718414ac499a5&redirect_uri=http%3a%2f%2fwww.yahoosp.cn%2fPay&response_type=code&scope=snsapi_base&state="+relevance+"#wechat_redirect";
            }
        }
        this.setState({openid:aas});
        const result=await Shop.mine();
        this.setState({
            us_id:result.data.id,
        })
        this.setState({
            relevance:relevance
        })
    }
    
    async btnzf(){ 
        const {selectedTab,us_id,relevance,openid}=this.state;
        var Dataaa={
            type:1,
            num:100,
            us_id:us_id,
            relevance:this.state.relevance,
            openid
        }
        if(selectedTab==2){
            //支付宝
            const alipay=await Shop.alipay(Dataaa);
            if(alipay.code==0){
                Toast.offline(alipay.msg,2)
            }else{
                Toast.success(alipay.msg,2);
                window.location=alipay.data
            }
           
            // console.log(alipay,'alipay')
           
        }else{
            //微信支付
            if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){
                 
                
            const result=await Shop.wechat(Dataaa);
            //判断是在微信内部打开,还是浏览器里打开
            if(result.code===0){
                Toast.offline(result.msg, 2);
            }else{
                window.WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        appId:result.data.appId,     //公众号名称，由商户传入     
                        // "timeStamp":wxConfig.timeStamp,         //时间戳，自1970年以来的秒数     
                        // "nonceStr":wxConfig.nonceStr, //随机串     
                        // "package":wxConfig.package,     
                        // "signType":wxConfig.signType,         //微信签名方式：     
                        // "paySign":wxConfig.paySign //微信签名 
                        timeStamp:  result.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr:  result.data.nonceStr, // 支付签名随机串，不长于 32 位
                        package:  result.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: result.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign:  result.data.paySign, // 支付签名
                        success: function (result) {
                            alert("支付成功===="+result);
                        // 支付成功后的回调函数
                        },
                        error:function (err){
                            alert("支付失败====",result);
                        }
                    },
                    function(res){    
                        // _this.setState({
                        //   disabled:false
                        // })
                        // if(res.err_msg == "get_brand_wcpay_request:ok"){  
                        //   Toast.success("支付成功,3秒后跳转!",3,()=>{
                        //     dispatch(routerRedux.push("/myorder"))
                        //   })
                        // }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
                        //   alert('提示', '您取消了支付', [
                        //     { text: '取消'},
                        //     { text: '确定'},
                        //   ])
                        // }else{  
                        //   alert('提示', '支付失败', [
                        //     { text: '取消'},
                        //     { text: '确定'},
                        //   ])
                        // }     
                    }
                );
                // this.run=function(){
                //     wx.ready(function(){
                //         // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                //         wx.chooseWXPay({
                //             timestamp:  result.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                //             nonceStr:  result.data.nonceStr, // 支付签名随机串，不长于 32 位
                //             package:  result.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                //             signType: result.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //             paySign:  result.data.paySign, // 支付签名
                //             success: function (res) {
                //                 alert("支付成功===="+res);
                //             // 支付成功后的回调函数
                //             },
                //             error:function (err){
                //                 alert("支付失败====",res);
                //             }
                            
                //         });
                //     })
                // }
             
                // window.location=result.data;
            }
            }else{
                Shop.sres(Dataaa).then((result)=>{
                    // console.log(result,'pppppppppppppp')
                
                    const oid=result.data.orderid;
                        this.setState({datas:result.data});
                        //隔2秒请求一次接口
                        this.timerID = setInterval(
                            () => Shop.szhifu({orderid:oid}).then((result2)=>{
                                if(result2.data.wec_status==1){
                                    Toast.success('支付成功',2)
                                    const {dispatch}=this.props;
                                    dispatch(routerRedux.push('/Personal'))
                                }
                            }),
                            2000
                        );
                })
                this.setState({
                    check:0
                })
               
                

                
            }
            
            // window.location='http://als.jugekeji.cn/index/wechat/bb'
           

        }
      }
    
    handleClick = () => {
    this.inputRef.focus();
    }
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    render(){
       
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            
            titleName:"押金支付",
            rightContent:"",
            rightFunc(){
                
            }
        }
        const {history,dispatch,shopData}=this.props;
        const {check,datas}=this.state;
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    input[type = "radio"] {
                    　　display: none;
                    }
                    {/* label{
                        background-image:url("z05.png");
                        background-repeat:no-repeat;
                        background-position:left top;
                        padding-left:15px;
                    } */}
                    .rightContent{
                        font-weight:normal;
                    }
                    .am-list-item.am-input-item{
                        height:1rem;
                        {/* border-bottom: 1px solid #999999; */}
                    }
                    .am-list-item .am-input-label,.am-list-item .am-input-control{
                        font-size: 0.26rem;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab{
                        display:flex;
                        flex-direction: row;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab-title{
                        margin-left:0.23rem;
                    }
                    .am-list-body{
                        margin-top: 0.21rem;
                    }
                    .am-tab-bar{
                        top:0.4rem;
                        position: relative;
                        height: 1rem;
                    }
                    .am-button{
                        margin-top:0.65rem;
                        background:rgba(1,135,252,1);
                        font-size: 0.34rem;
                        {/* text-decoration: none; */}
                        
                    }
                    a:hover{
                        text-decoration-line: none;
                    }
                    .am-list-item .am-input-clear-active{
                        background-color: rgba(1,135,252,1);
                    }
                    #check02{
                        width:0.3rem;
                        height:0.3rem;
                        position: relative;
                        top: 0.09rem;
                    }
                    .radio_box input:checked+label:after {
                        content: '';
                        width: 9px;
                        height: 9px;
                        position: absolute;
                        top: 3px;
                        left: 3px;
                        background: #ef4949;
                        border-radius: 50%;
                    }
                    .cc{
                        width: 100%;
                        height: 100%;
                        background-color: #000000;
                        opacity: 0.6;
                        position: fixed;
                        top: 0;
                        z-index: 500;
                    }
                    .content{
                        position: fixed;
                        width: 70%;
                        margin: auto;
                        height: 6rem;
                        background: white;
                        top: 18%;
                        left: 50%;
                        transform: translate(-50%);
                        border-radius: 0.25rem;
                        z-index: 1000;
                        text-align: center; 
                    }
                    .content h2{
                        padding-top: 0.3rem;
                        font-size: 0.4rem;
                        font-weight: bold;
                    }
                    .way img{
                        width:4.6rem;
                        height:4.6rem;
                        // margin-top: 0.3rem;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                { this.state.showModal?
                    "":""
                }
                <MyNavBar {...navBarProps}/>
                <List>
                    <InputItem          
                        clear
                        // placeholder="100"
                        value='100'
                        type="number"
               
                    >支付金额</InputItem>
                
                </List>
                <div className={styles.account}>
                    <h5>支付方式</h5>
                
                    
                    {/* 单选框 */}
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >

                        <TabBar.Item
                            title={
                                <img src={z01} style={{width:"0.6rem",height:"0.6rem"}}></img>
                            }
                            key="Life"
                            icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem', 
                                
                                }}
                            />
                            }
                            selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            selected={this.state.selectedTab === '2'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '2',
                            });
                            }}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                        }
                        selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            title={<img src={z02} style={{width:"0.6rem",height:"0.6rem"}}></img>}
                            key="Koubei"
                        
                            selected={this.state.selectedTab === '3'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '3',
                            });
                            }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                    </TabBar>
                    <Button type="primary" onClick={()=>this.btnzf()}>确认支付</Button><WhiteSpace />
                </div>       
         
                <div className='cc' style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div className='content' style={check===1?displaynone:displayblock}>
                    <h2>扫码支付</h2>
                    <div className="way">
                        <img className={styles.mama} src={"http://qr.liantu.com/api.php?text="+datas.url} />
                    </div>
                </div>
            </div>
        )
    }
}