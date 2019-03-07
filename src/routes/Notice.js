import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { List } from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import styles from "./styles/Notice.less";
import found01 from '../assets/images/foun.png';
@connect(state => ({ shop: state.shop }))

export default class Notice extends Component {

     //加载更多的方法,写法固定,只需替换变量名
     loadFunc(e){
        const {dispatch,shop}=this.props;
        let page=shop.pagination.current_page*1+1;
        dispatch({
        type:"shop/news",     //方法
        payload:{       //参数
            size:12,
            page
        }
        })
    }
    //通知公告-公告详情
    btndet(id){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Noticedetails?id='+id));
    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"通知公告",
            rightContent:"",
        }
        const {history,dispatch,shop}=this.props;
        const newdata=shop.newlist;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const Item = List.Item;
        const Brief = Item.Brief;
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    .am-list-item .am-list-line .am-list-content{
                        font-size:0.35rem;
                    }
                    .am-list-item .am-list-line .am-list-brief{
                        color:#9E9E9E;
                        font-size:0.28rem;

                    }
                    .am-list-item .am-list-line .am-list-arrow{
                        width:0.21rem;
                        height:0.37rem;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.conbox}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={(e)=>this.loadFunc(e)}
                        hasMore={hasMore}
                        threshold={100}
                        loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                        ...</div>}
                        >
                        <List  className="my-list">
                            {
                                newdata?newdata.map((item,index)=>{
                                    return(
                                        <Item key={index} arrow="horizontal" multipleLine onClick={() =>this.btndet(item.id) }>
                                        {item.me_title}<Brief>{item.me_add_time}</Brief>
                                        </Item>
                                    )
                                }):''
                                
                            }
                                                    
                        </List>
                    </InfiniteScroll>

                </div>
            </div>
        )
    }
}