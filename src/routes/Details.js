import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank,List,Stepper} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import Goods from '../components/Goods';
import styles from "./styles/Details.less";
import icon1  from '../assets/images/p1.png';
import icon2  from '../assets/images/z01.png';
import icon9 from '../assets/images/p9.png';
import icon10 from '../assets/images/z02.png';
import v07 from '../assets/images/huo.png';
import v08 from '../assets/images/dp.png';
import v09 from '../assets/images/gw.png';
import good01 from '../assets/images/g01.png';
// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Details extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            modal2:false,
            DATA:'',
            imgHeight: 7.5+"rem",
            data:'',
            imgdata:'',
            pdata:"",
            colordata:'',
            typedata:'',
            color:"",
            type:'',
            val:'',
            AttrA:'',
            AttrA2:'',
            datass:'',
            checked:1
            
        };
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.details({id:parse.id});
       
        this.setState({data:result.data,imgdata:result.data.list.pd_image,pdata:result.data.list})
    };
    // modal2= key => (e) => {
    //     e.preventDefault(); // 修复 Android 上点击穿透
    //     this.setState({
    //       [key]: true,
    //     });
    // }
   
    showModal = key => (e) => {
        const {pdata}=this.state;
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });

        Shop.fenlgm({pd_id:pdata.id}).then((guige)=>{
            this.setState({datass:guige.data,colordata:guige.data.color,typedata:guige.data.type,AttrA2:guige.data.color[0].color,AttrA:guige.data.type[0].type})
        })
      }
      //加入购物车
    onClose = key => () => {
        this.setState({
          [key]: false,
        });
        
    }
    chgAttr=(e,i)=>{
        const {pdata,datass}=this.state;
        console.log('当前选择',e)
        this.setState({
            AttrA:e,
            type:i.type

        }) 
        Shop.fenlgm({pd_id:pdata.id,type:i.type}).then((guige)=>{
            this.setState({datass:guige.data})
        })

    }
    chgAttr2=(e,i)=>{
        console.log('当前选择',e)
        const {pdata,datass}=this.state;

       
        Shop.fenlgm({pd_id:pdata.id,color:i.color}).then((guige)=>{
            this.setState({datass:guige.data})            
        }) 
        this.setState({
            AttrA2:e,
            color:i.color,
        }) 
    }
    
    onChange2(val){
        this.setState({val:val})
        // console.log(val,66666666666666)
        // var t=cccc()
     
    }
    btnorder(){
        const {pdata,color,type,val,colordata,typedata}=this.state;
        const {dispatch}=this.props;
        const t=type?type:typedata[0].type;
        
        const pd_num=val?val:1;
        const c=color?color:colordata[0].color;
        let d={
            "pd_id":pdata.id,
            "type":t,
            "color":c,
            "pd_num":pd_num
        }
        Shop.buy(d).then((result=>{
            if(result.code==1){
                Toast.success(result.msg,2,()=>{
                    dispatch(routerRedux.push('/Payorder?pd_id='+pdata.id+'&type='+t+'&pd_num='+pd_num+'&color='+c))
                })
            }else{
                Toast.offline(result.msg,2)
            }

        }))
        
       
    }
    //加入购物车
    btnorder2(){
        const {pdata,color,type,val,colordata,typedata}=this.state;

        Shop.addshop({pd_id:pdata.id,color:color?color:colordata[0].color,type:type?type:typedata[0].type,pd_num:val?val:1}).then((result)=>{
            if(result.code==1){
                Toast.success(result.msg,2)
            }else{
                Toast.offline(result.msg,2)
                
            }
            
        });
        // const {dispatch}=this.props;
        // dispatch(routerRedux.push('/Shopcar'))
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
        const {data,imgdata,pdata,colordata,typedata,datass,checked}=this.state;
        console.log(data.list,'datalist')
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"商品详情",
            rightContent:"",
            rightFunc(){
            }
        }
        const displayblock={
            display:'block'
        }
        const displaynone={
            display:'none'
        }
        
        let value=pdata.pd_details?pdata.pd_details:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    * { touch-action: pan-y; }
                    .am-wingblank.am-wingblank-lg{
                        margin:0;
                    }
                    .popup-list dl{
                        display: flex;
                        padding:0.24rem;

                    }
                    .popup-list dt{
                        width: 1.89rem;
                        height: 1.89rem;
                    }
                    .popup-list dt>img{
                        width: 100%;
                        height: 100%;
                    }
                    .popup-list dd{
                        margin-left:0.28rem;
                        text-align: left;
                    }
                    .popup-list dd>h5{
                        width: 3.52rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #000000;
                        font-size: 0.26rem;
                        margin-bottom: 0.3rem;
                       
                    }
                    .popup-list dd>p{
                        width: 4.84rem;
                        height: 0.6rem;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        color: #999999;
                        font-size: 0.2rem;
                        margin-top: 0.19rem;
                        margin-bottom: 0.19rem;
                    }
                    .am-modal{
                        height:auto;
                    }
                    .xiab{
                        height: 0.4rem;
                    }
                    .left{
                        float: left;
                    }
                    .left span{
                           color: #5DD075;
                           font-size: 0.36rem;
                           padding-right: 0.36rem;
                    }
                    .left s{
                        color: #999999;
                        font-size: 0.24rem;
                    }
                    .right{
                        float: right;
                       
                        .fenge{
                         padding-left: 0.18rem;
                         padding-right: 0.18rem;
                        }
                    }
                    .right span{
                        color: #999999;
                        font-size: 0.18rem;
                    }
                    .fenge{
                        padding-left: 0.18rem;
                        padding-right: 0.18rem;
                    }
                    .leixing{
                        height:0.73rem;
                        line-height:0.73rem;
                        
                    }
                    .leixing h5{
                        font-size:0.26rem;
                        color:#070707;
                    }
                    .am-modal-content{
                        text-align: left;
                    }
                    .box{
                        padding-left: 0.25rem;
                    }
                    .am-list popup-list,.am-list-body{
                        height: 100%;
                    }
                    .btn{
                        width:1.61rem;
                        height:0.7rem;
                        background:#ffffff;;
                        border-radius:0.1rem;
                        border: 0;
                        color: #070707;
                        font-size:0.26rem;
                        border:1px solid rgba(93, 208, 117, 1);
                        margin-right: 0.19rem;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis:71%;
                    }
                    .am-stepper-input{
                        width: 1.6rem;
                        height: 0.7rem;
                        background:rgba(247,223,63,0);
                        border:1px solid rgba(93, 208, 117, 1);
                        border-radius:0.1rem;
                    }
                    .am-stepper-input-wrap{
                        height: 0.7rem;
                    }
                    .am-stepper-handler{
                        background:rgba(93,208,117,1);
                    }
                    svg:not(:root){
                        color:white;
                        font-weight: bold;
                    }
                    .steper .am-list-item{
                        width:4rem;
                        margin-left: 1.3rem;
                        margin-top: 0.3rem;
                    }
                    
                    .am-list-item .am-list-line{
                        display: inline;
                        padding-right:0
                    }
                    .am-list-item{
                        padding-left:0;
                    }
                    .steper{
                        height: 1.6rem;
                        display: flex;
                        line-height: 1.6rem;
                        padding-left:0.24rem;
                    }
                    .am-button-primary{
                        background-color: #5DD075;
                        border:0;
                    }
                    .am-list-item .am-list-line .am-list-content{
                        padding-bottom: 0;
                    }
                    .slider,.slider-list,.slider-slide,.slider-frame{
                        height:7.5rem !important;
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
                    .am-button{
                        width:30%;
                    }
                    
                    `}
                </style>
                 {/*头部导航栏*/}
                 <MyNavBar {...navBarProps}/> 
                <div className={styles.contentop} >
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            infinite
                            className='pp'
                            >
                            { imgdata?imgdata.map((item,index) => (
                                <div
                                key={index}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                <img
                                    src={APIHost+item}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top',height:'7.5rem' }}
                                />
                                </div>
                            )):""
                            }
                        </Carousel>
                    </WingBlank>
                </div>
                <div className={styles.contenmid}>
                    <dl className={styles.cdl}>
                        <dt className={styles.cdt}>
                            <h5>
                            {pdata.pd_name}
                            </h5>
                            <span>{pdata.shop_name}</span>
                            <div style={{clear:'both'}}></div>
                        </dt>
                        <dd className={styles.cdd}>
                            <p>{pdata.pd_describe}</p>

                            <div className={styles.xiab}>
                                <div className={styles.left}>
                                    <span>￥{pdata.pd_price}</span>
                                    <s>￥{pdata.pd_reg}</s>
                                </div>
                                <div className={styles.right}>
                                    <span>已售{pdata.pd_sale}</span>
                                    <span className={styles.fenge}>|</span>
                                    <span>库存{pdata.pd_stock}</span>
                                </div>
                                
                            </div>
                        </dd>
                    </dl>
                    <div className={styles.more}>
                        <span>更多详情</span>
                        {/* <span className={styles.add}>+</span> */}
                    </div>
                    <div className='maomao'
                       dangerouslySetInnerHTML={{
                        __html: html
                        }}
                     >
                    </div>
                    <div className={styles.dl}>
                            <div className={styles.dt}>
                                <img src={v07} />
                            </div>
                            <div className={styles.dd}>热门商品</div>
                    </div>
                    <Goods />                                                                                              
                </div>
               
                <div className={styles.dibu}>
                    {/* <dl>
                        <dt>
                            <img src={v08} />
                        </dt>
                        <dd>
                        进入店铺
                        </dd>
                    </dl> */}
                    <dl style={{marginLeft:'0.5rem'}}>
                        <dt>
                            <img src={v09} />
                        </dt>
                        <dd onClick={this.showModal('modal2')}>
                        放入购物车
                        </dd>
                    </dl>
                    <button className={styles.anniu} onClick={this.showModal('modal2')}>购买</button>
                </div>
                <div style={{marginBottom:"0.3rem"}}></div>
                    <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                        >
                        <List className="popup-list">
                            {
                                <div className={styles.tank}>
                                    <dl>
                                        <dt>
                                            <img src={APIHost+datass.pd_image} />
                                        </dt>
                                        <dd>
                                            <h5>{pdata.pd_name}</h5>
                                            <p>{pdata.pd_describe}
                                            </p>
                                            <div className='xiab'>
                                                <div className='left'>
                                                    <span>￥{datass.type_sum}</span>
                                                    <s>￥{datass.type_reg}</s>
                                                </div>
                                                <div className='right'>
                                                    <span>已售{pdata.pd_sale}</span>
                                                    <span className='fenge'>|</span>
                                                    <span>库存{pdata.pd_stock}</span>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl>
                                    <div className='box'>
                                        <div className='leixing'>
                                            <h5>类型</h5>  
                                        </div>
                                        {
                                            typedata?typedata.map((i,index)=>{
                                                return(
                                                    <button key={index} className='btn' style={{background:this.state.AttrA===i.type?'#5DD075':'',color:this.state.AttrA===i.type?'#ffffff':'' }} onClick={()=>this.chgAttr(i.type,i)}>{i.type}</button>
                                                )  
                                            }):''
                                        }  
                                    </div>
                                    <div className='box'>
                                        <div className='leixing'>
                                            <h5>规格</h5>  
                                        </div>
                                        {
                                            colordata?colordata.map((i,index)=>{
                                                return(
                                                    <button key={index} className='btn' style={{background:this.state.AttrA2===i.color?'#5DD075':'',color:this.state.AttrA2===i.color?'#ffffff':'' }} onClick={()=>this.chgAttr2(i.color,i)}>{i.color}</button>
                                                )  
                                            }):''
                                        }  
                                    </div>
                                    <div className='steper'>
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
                                                defaultValue={1}
                                                // value={item.cart_num}
                                                onChange={(value)=>{this.onChange2(value)}}
                                                />}
                                            >
                                        </List.Item>
                                    </div>
                                    
                                </div>
                            }
                            <List.Item>
                                <div style={{display:'flex',justifyContent:'space-around',marginBottom:'0.3rem'}}>
                                   
                                    <Button type="primary" onClick={()=>this.btnorder2()}>加入购物车</Button>
                                    <Button type="primary" onClick={()=>this.btnorder()}>购买</Button>
                                </div>
                            

                            </List.Item>
                        </List>
                    </Modal>
                
            </div>
        )
    }
}