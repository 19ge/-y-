import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import InfiniteScroll from 'react-infinite-scroller';
import styles from "./styles/Reward.less";
@connect(state => ({ shop: state.shop }))

export default class Reward extends Component {
    
  //加载更多的方法,写法固定,只需替换变量名
  loadFunc(e){
    const {dispatch,shop}=this.props;
    let page=shop.pagination.current_page*1+1;
    dispatch({
      type:"shop/shangjin",     //方法
      payload:{       //参数
        is_hot:true,
        size:12,
        type:1,
        page
      }
    })
}
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            titleName:"速聘赏金",
            rightContent:"",
           
        }
        
        const {history,dispatch,shopData,shop}=this.props;
        const sdata=shop.monlist;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        console.log(sdata,"iiiiiiiiiiiiiiiiiii")
        return(
            <div className={styles.App}>
                 {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                <div className={styles.content}>
                {
                    sdata?sdata.map((item,index)=>{
                        return(
                            <div key={index} className={styles.contbox}>
                                <div className={styles.boxtop}>
                                    <dl>
                                        <dt>{item.wal_note}</dt>
                                        <dd>{item.wal_add_time}</dd>
                                    </dl>
                                </div>
                                <div className={styles.boxbottom}>{item.wal_num}</div>
                            </div>
                        )
                    }):''    
                }
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}