import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history,app }) {
  // 首页
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/IndexPage'),
  });
    //  y-选择身份
    const Choosesf = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Choosesf'),
    });
    //  y-邀请
    const Yaoqing = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Yaoqing'),
    });
    //支付
    const Zhifu = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Zhifu'),
    });
      //  y-修改密码
    const Modifypwd = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Modifypwd'),
    });
    //  y-分类
    const Fenlei = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Fenlei'),
    });
      //  y-购物车
      const Shopcar = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Shopcar'),
      });
  //y-详情页
  const Details = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Details'),
  });

  // 我的团队-提现
  const Tixian = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Tixian'),
  });
  
  // 我的团队-提现记录
  const Tixianrecord = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Tixianrecord'),
  });
   // 我的团队-通知公告
   const Notice = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Notice'),
  });
  // 我的团队-通知公告-公告详情
  const Noticedetails = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Noticedetails'),
  });
  
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Login'),
  });
  // 忘记密码
  const Forgetpsw = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Forgetpsw'),
  });
  // 立即注册
  const Res = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Res'),
  });
  
       //y-我的
       const Mine = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Mine'),
      });
       //y-我的-设置
       const Shezhi = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Shezhi'),
      });
      //y-我的-设置-修改昵称
      const Xgnc = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Xgnc'),
      });
      //y-我的-设置-修改登录密码
      const Xgmima = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Xgmima'),
      });
      //y-我的-设置-修改交易密码
      const Jiaoyipwd = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Jiaoyipwd'),
      });
      //y-我的-设置-支付宝绑定
      const Alipy = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Alipy'),
      });
      //y-我的-设置-微信绑定
      const Wechat = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Wechat'),
      });
      //y-我的-订单
      const Order = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Order'),
      });
      //y-我的-收益
      const Earnings = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Earnings'),
      });
      //y-我的-粉丝
      const Fans = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Fans'),
      });
      //y-日用品
      const Daypro = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Daypro'),
      });
      //y-摄像头
      const Carmera = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Carmera'),
      });
      //y-支付订单
      const Payorder = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Payorder'),
      });
      //y-选择地址
      const Chooseaddress = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Chooseaddress'),
      });
      //y-添加地址
      const Taddress = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Taddress'),
      });
       //y-编辑地址
       const Editaddress = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Editaddress'),
      });
      //y提现
      const Ytixian = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Ytixian'),
      });
      //y充值
      const Chongzhi = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Chongzhi'),
      });
      
      
      //y-公共商品列表
      // const Goods = dynamic({
      //   app,
      //   models: () => [
      //     import('./models/shop'),
      //   ],
      //   component: () => import('./routes/Goods'),
      // });


  
  
  return (
    <Router history={history}>
      <Switch>
        
        <Route path="/" exact component={IndexPage} />
        <Route path="/Choosesf" exact component={Choosesf} />
        <Route path="/Modifypwd" exact component={Modifypwd} />
        <Route path="/Fenlei" exact component={Fenlei} />
        <Route path="/Shopcar" exact component={Shopcar} />
        <Route path="/Mine" exact component={Mine} />  
        <Route path="/Shezhi" exact component={Shezhi} /> 
        <Route path="/Xgnc" exact component={Xgnc} /> 
        <Route path="/Xgmima" exact component={Xgmima} />  
        <Route path="/Alipy" exact component={Alipy} />
        <Route path="/Wechat" exact component={Wechat} />
        <Route path="/Jiaoyipwd" exact component={Jiaoyipwd} />
        <Route path="/Order" exact component={Order} />
        <Route path="/Earnings" exact component={Earnings} />
        <Route path="/Fans" exact component={Fans} />
        <Route path="/Daypro" exact component={Daypro} />
        <Route path="/Carmera" exact component={Carmera} />
        <Route path="/Payorder" exact component={Payorder} />
        <Route path="/Chooseaddress" exact component={Chooseaddress} />
        <Route path="/Taddress" exact component={Taddress} />
        <Route path="/Yaoqing" exact component={Yaoqing} />
        <Route path="/Editaddress" exact component={Editaddress} />
        <Route path="/Details" exact component={Details} />
      
        <Route path="/Tixian" exact component={Tixian} />
        
        <Route path="/Tixianrecord" exact component={Tixianrecord} />
        <Route path="/Notice" exact component={Notice} />
        <Route path="/Noticedetails" exact component={Noticedetails} />
       
        <Route path="/Login" exact component={Login} />
        <Route path="/Forgetpsw" exact component={Forgetpsw} />
        <Route path="/Res" exact component={Res} />
        <Route path="/Zhifu" exact component={Zhifu} />
        <Route path="/Ytixian" exact component={Ytixian} />
        <Route path="/Chongzhi" exact component={Chongzhi} />



        
        
      </Switch>
    </Router>
  );
}

export default RouterConfig;
