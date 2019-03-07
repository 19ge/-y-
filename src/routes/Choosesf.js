import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, List ,Toast} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import styles from "./styles/Choosesf.less";
import t01 from '../assets/images/l.png';
import t02 from '../assets/images/t.png';
import t03 from '../assets/images/lf.png';
import t04 from '../assets/images/t04.png';


@connect(state => ({ shop: state.shop }))


export default class Choosesf extends Component {
    render(){
        return(
            <div className={styles.App}>
                <div className={styles.bgimg}>
                    <dl>
                        <dt>
                            <img src={t01} />
                        </dt>
                        <dd>
                            <img src={t02} />
                        </dd>
                    </dl>
                    <div className={styles.leix}>请选择登录类型</div>
                    <div className={styles.tlogo}>
                        <dl style={{paddingLeft:'1.84rem'}}>
                            <dt>
                                <img src={t03} />
                            </dt>
                            <dd>团队会员</dd>
                        </dl>
                        <dl style={{paddingLeft:'1.95rem'}}>
                            <dt>
                                <img src={t04} />
                            </dt>
                            <dd>普通会员</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}