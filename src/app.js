import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import './assets/less/css.less'
import './assets/less/loading.less'
import './assets/less/sidebar.less'

import App from './pages/App'

import Index from './pages/index'
import All from './pages/all'


import Err from './pages/404'

const MOUNT_NODE = document.getElementById('container')
ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="all" component={All}/>
        <Route path="*" component={Err}/>
      </Route>
    </Router>
), MOUNT_NODE)


       
/*
  <IndexRoute path="url" component={Url}/>
  当前路由树如下    
  ├ /                             // 动态／URL导航
  ├ /index                        // 首页
  ├
  ├ 
*/
