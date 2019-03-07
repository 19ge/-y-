/*
 * @Author: 杜梦 
 * @Date: 2018-07-03 10:50:15 
 * @Last Modified by: 杜梦
 * @Last Modified time: 2018-07-03 11:03:32
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/goodItem.less";
import {APIHost} from '../utils/fetch';
const GoodItem = ({
    goodData = [{
        id:0,
        image:{},
        title:'ssass',
        price:'100'
    },  
    ],
    tapItem=()=>{return;}
}) => {
    return (
        <div className={styles.goodList}>
            {goodData.map((i, index) => {
                return (
                    <div key={index} className={styles.itemBox}>
                        <div className={styles.itemBody} onClick={()=>tapItem(i.id)}>
                            <div className={styles.imgbox}>
                                <img src={i.image} alt=""/>
                            </div>
                            <div className={styles.infoBox}>
                                <p className={styles.name}>{i.title}</p>
                                <p className={styles.price}>{i.price} GKC</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
GoodItem.propTypes = {
    tapItem: PropTypes.func,
}
export default GoodItem