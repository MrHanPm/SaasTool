import React, { Component } from 'react'
import Tab from './tab'
import handleChange from '../utils/handleChange'
import { Tool, Alert } from '../utils/tool'
import JQX from './Form/JQX'
import ZKX from './Form/ZK'
import SYX from './Form/ZK'
import ZRX from './Form/ZRX'
import OPXR from './Form/OP'

export default class TruckMsg extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
        LPAY: 0, // 裸车价格

        JQXrandom: '',  // 交强险随机数
        JQXVAL: {
          Lval: 0,
          Lname: '营业',
          Rval: 1850,
          Rname: '2吨以下'
        },  // 交强险
        CarShip: 120, // 车船使用税
        UpSign: 1000, // 上牌费用
        JQZKrandom: '',  // 交强险随机数
        JQZKVAL: {
          Lval: 1,
          Lname: '无折扣'
        }, // 交强险折扣

        DSFXrandom: '',  // 第三方责任随机数
        DSFXVAL: {
          Lval: 3,
          Lname: '20万'
        }, // 第三方责任

        
        BLPSrandom: '', // 玻璃险折随机数
        BLPSVAL: {
          Lval: 1,
          Lname: '进口'
        }, // 玻璃单独破碎险
        PEOPAY: 100, // 车上人员险
        SYXZKrandom:'', // 商业险折随机数
        SYXZKVAL: {
          Lval: 1,
          Lname: '无折扣'
        }, // 商业险折折扣

        BYCOUNT: 0, // 必要花费总和
        GZS: 0, // 购置税
        CLSSX: 0, // 车辆损失险
        QCQD: 0,  // 全车抢盗险
        ZRSS: 0,  // 自然损失险
        NOTY: 0,  // 不计免赔险
        WGZR: 0,  // 无故责任险
        SYCOUNT: 0, // 商业险总金额
        BCOM: 0,  //  保险总金额
        CARCOM: 0,  // 购车总金额
        DUTYVAL: '', // 第三方责任险
        BLPSX: 0,  // 玻璃破碎险


        // 第三方责任险
        DutyF:{
          '2吨以下':[755,1092,1235,1332,1491,1775,2312],
          '2-5吨':[1014,1466,1671,1817,2052,2463,3208],
          '5-10吨':[1277,1819,2066,2235,2513,3004,3912],
          '10吨以上':[1646,2319,2622,2827,3166,3770,4908]
        },
        DutyT:{
          '2吨以下':[1072,1672,1968,2167,2551,3198,4177],
          '2-5吨':[1726,2691,3167,3486,4105,5145,6719],
          '5-10吨':[1981,3089,3635,4002,4711,5906,7714],
          '10吨以上':[2715,4233,4980,5485,6457,8094,9724]
        },
        // 车辆损失  基础保费+裸车价格*费率
        ClssF:{
          '2吨以下':[246,0.0095],
          '2-5吨':[318,0.0122],
          '5-10吨':[348,0.0134],
          '10吨以上':[229,0.0162]
        },
        ClssT:{
          '2吨以下':[835,0.0193],
          '2-5吨':[1179,0.0237],
          '5-10吨':[1321,0.0236],
          '10吨以上':[2097,0.0252]
        },
        CarShipData:{
          '2吨以下': 120,
          '2-5吨': 300,
          '5-10吨': 600,
          '10吨以上': 600
        },
        isBtn: true

    }
    this.handleChange = handleChange.bind(this)
    this.ACJQX = this.ACJQX.bind(this)
    this.ACJQZK = this.ACJQZK.bind(this)
    this.SYXZK = this.SYXZK.bind(this)
    this.DSFX = this.DSFX.bind(this)
    this.BLPS = this.BLPS.bind(this)

    this.Reckon = this.Reckon.bind(this)
    this.CheckBox = this.CheckBox.bind(this)
  }
  componentWillMount () {
      // let INDEXS = JSON.parse(Tool.localItem('INDEXACC')) || ''
      // if(INDEXS.LPAY === 0 || INDEXS.LPAY > 0){
      //   this.state = INDEXS
      // }
  }
  componentDidMount() {
    window.addEventListener("resize",() => {
      let { isBtn } = this.state
        this.setState({isBtn: !isBtn})
    })
  }
  ACJQX(){ this.setState({JQXrandom: Math.random() }) }
  ACJQZK(){ this.setState({JQZKrandom: Math.random() }) }
  SYXZK(){ this.setState({SYXZKrandom: Math.random() }) }
  DSFX(){ this.setState({DSFXrandom: Math.random() }) }
  BLPS(){ this.setState({BLPSrandom: Math.random() }) }

  // componentWillReceiveProps(nextProps) {}
  componentWillUnmount () {
    // Tool.localItem('INDEXACC', JSON.stringify(this.state))
    window.removeEventListener("resize",null)
  }

  CheckBox (e) {
    let { SYCOUNT, NOTY, WGZR, BYCOUNT, LPAY } = this.state
    let COUM = 0,BCOM = 0,CARCOM = 0
    LPAY = parseFloat(LPAY)
        // NOTY  // 不计免赔险
        // WGZR  // 无故责任险
    if(e.target.checked) {
      if(e.target.id == 's1'){
        this.refs.NOTY.disabled = false
        this.refs.WGZR.disabled = false
      }
      COUM = Math.round(SYCOUNT + parseInt(e.target.value))
    } else {
      if(e.target.id == 's1'){
        COUM = Math.round(SYCOUNT - parseInt(e.target.value))
        if(this.refs.NOTY.checked){
          this.refs.NOTY.checked = false
          this.refs.NOTY.disabled = true
          COUM = Math.round(COUM - NOTY)
        }
        if(this.refs.WGZR.checked){
          this.refs.WGZR.checked = false
          this.refs.WGZR.disabled = true
          COUM = Math.round(COUM - WGZR)
        }
      } else {
        COUM = Math.round(SYCOUNT - parseInt(e.target.value))
      }
    }
    BCOM = Math.round(BYCOUNT + COUM)
    CARCOM = Math.round(BYCOUNT + COUM + LPAY)
    this.setState({
      SYCOUNT: COUM,
      BCOM: BCOM,
      CARCOM: CARCOM
    })
  }
  changeLv (val) {
    this.setState({
      CarShip: this.state.CarShipData[val.Rname]
    })
  }
  BlpsAC () {
    // 计算玻璃单独破碎险  裸车价格*费率
    let {BLPSVAL, JQXVAL, LPAY} = this.state
    if(JQXVAL.Lname == '营业'){
      if(BLPSVAL.Lname == '国产'){
        return Math.round(LPAY * 0.0013)
      }
      if(BLPSVAL.Lname == '进口'){
        return Math.round(LPAY * 0.0018)
      }
    }
    if(JQXVAL.Lname == '非营业'){
      if(BLPSVAL.Lname == '国产'){
        return Math.round(LPAY * 0.0011)
      }
      if(BLPSVAL.Lname == '进口'){
        return Math.round(LPAY * 0.0016)
      }
    }
  }

  ClssxAC () {
    // 计算车辆损失险 基础保费+裸车价格*费率
    let {JQXVAL, LPAY, ClssF, ClssT} = this.state
    if(JQXVAL.Lname == '营业'){
      return Math.round(LPAY * ClssT[JQXVAL.Rname][1] + ClssT[JQXVAL.Rname][0] )
    }
    if(JQXVAL.Lname == '非营业'){
      return Math.round(LPAY * ClssF[JQXVAL.Rname][1] + ClssF[JQXVAL.Rname][0] )
    }
  }
  Reckon () {
    // 计算按钮点击
    if (this.state.LPAY === 0) {
      Alert.to('请输入裸车价格')
      return
    } else {
      let {PEOPAY,UpSign,CarShip, JQXVAL, LPAY, JQZKVAL, SYXZKVAL, DSFXVAL, BLPSVAL} = this.state
      let BYCOUNT, // 必要花费总和
              GZS, // 购置税
              CLSSX, // 车辆损失险
              QCQD,  // 全车抢盗险
              ZRSS,  // 自然损失险
              NOTY,  // 不计免赔险
              WGZR,  // 无故责任险
              SYCOUNT = 0, // 商业险总金额
              BCOM,  //  保险总金额
              CARCOM,  // 购车总金额
              DUTYVAL = [], // 第三方责任险
              BLPSX  // 玻璃破碎险

      LPAY = parseFloat(LPAY)
      CarShip = parseFloat(CarShip) // 车船使用税
      UpSign = parseFloat(UpSign) // 上牌费用
      PEOPAY = parseFloat(PEOPAY) // 车上人员险

      if(JQXVAL.Lname == '营业'){
        DUTYVAL = this.state.DutyT[JQXVAL.Rname]
      }
      if(JQXVAL.Lname == '非营业'){
        DUTYVAL = this.state.DutyF[JQXVAL.Rname]
      }

      GZS = Math.round(LPAY/1.17 * 0.1)
      BYCOUNT = Math.round((GZS + JQXVAL.Rval + CarShip + UpSign) * JQZKVAL.Lval )
      BLPSX = this.BlpsAC()
      CLSSX = this.ClssxAC()
      QCQD = Math.round(LPAY * 0.005 + 130)
      ZRSS = Math.round(LPAY * 0.0015)
      NOTY = Math.round((DUTYVAL[DSFXVAL.Lval] + CLSSX) * 0.2)
      WGZR = Math.round(DUTYVAL[DSFXVAL.Lval] * 0.2)

      if(this.refs.DXFZRXS.checked){
        SYCOUNT = Math.round(SYCOUNT + DUTYVAL[DSFXVAL.Lval])
      }
      if(this.refs.CLSSX.checked){
        SYCOUNT = Math.round(SYCOUNT + CLSSX)
      }
      if(this.refs.QCQD.checked){
        SYCOUNT = Math.round(SYCOUNT + QCQD)
      }
      if(this.refs.BLPSX.checked){
        SYCOUNT = Math.round(SYCOUNT + BLPSX)
      }
      if(this.refs.ZRSS.checked){
        SYCOUNT = Math.round(SYCOUNT + ZRSS)
      }
      if(this.refs.NOTY.checked){
        SYCOUNT = Math.round(SYCOUNT + NOTY)
      }
      if(this.refs.WGZR.checked){
        SYCOUNT = Math.round(SYCOUNT + WGZR)
      }
      if(this.refs.PEOPAY.checked){
        SYCOUNT = Math.round(SYCOUNT + PEOPAY)
      }
      SYCOUNT =  parseFloat(SYCOUNT * SYXZKVAL.Lval)
      BCOM = Math.round(BYCOUNT + SYCOUNT)
      CARCOM = Math.round(BYCOUNT + SYCOUNT + LPAY)

      this.setState({
        BYCOUNT: BYCOUNT, // 必要花费总和
        GZS: GZS, // 购置税
        CLSSX: CLSSX, // 车辆损失险
        QCQD: QCQD,  // 全车抢盗险
        ZRSS: ZRSS,  // 自然损失险
        NOTY: NOTY,  // 不计免赔险
        WGZR: WGZR,  // 无故责任险
        SYCOUNT: SYCOUNT, // 商业险总金额
        BCOM: BCOM,  //  保险总金额
        CARCOM: CARCOM,  // 购车总金额
        DUTYVAL: DUTYVAL, // 第三方责任险
        BLPSX: BLPSX  // 玻璃破碎险
      })
    }
  }
// let BYCOUNT, // 必要花费总和
    //         GZS, // 购置税
    //         CLSSX, // 车辆损失险
    //         QCQD,  // 全车抢盗险
    //         ZRSS,  // 自然损失险
    //         NOTY,  // 不计免赔险
    //         WGZR,  // 无故责任险
    //         SYCOUNT, // 商业险总金额
    //         BCOM,  //  保险总金额
    //         CARCOM  // 购车总金额
    // let {PEOPAY,UpSign,CarShip, JQXVAL, LPAY, JQZKVAL, SYXZKVAL, DSFXVAL, BLPSVAL} = this.state

    // let DUTYVAL = [] // 第三方责任险
    // if(JQXVAL.Lname == '营业'){
    //   DUTYVAL = this.state.DutyT[JQXVAL.Rname]
    // }
    // if(JQXVAL.Lname == '非营业'){
    //   DUTYVAL = this.state.DutyF[JQXVAL.Rname]
    // }
    // GZS = parseInt(LPAY/1.17 * 0.1)
    // BYCOUNT = parseInt((GZS + JQXVAL.Rval + CarShip + UpSign) * JQZKVAL.Lval )
    // CLSSX = this.ClssxAC()
    // QCQD = parseInt((LPAY + 130) * 0.005)
    // ZRSS = parseInt(LPAY * 0.015)
    // NOTY = parseInt((DUTYVAL[DSFXVAL.Lval] + CLSSX) * 0.2)
    // WGZR = parseInt(DUTYVAL[DSFXVAL.Lval] * 0.2)
    // SYCOUNT = parseInt(DUTYVAL[DSFXVAL.Lval] + CLSSX + QCQD + this.BlpsAC() + ZRSS + NOTY + WGZR + PEOPAY) * SYXZKVAL.Lval

    // BCOM = parseInt(BYCOUNT + SYCOUNT)
    // CARCOM = parseInt(BYCOUNT + SYCOUNT + LPAY)
  render () {
    let {PEOPAY,UpSign,CarShip, JQXVAL, LPAY, JQZKVAL, SYXZKVAL, DSFXVAL, BLPSVAL,isBtn,
            BYCOUNT, // 必要花费总和
            GZS, // 购置税
            CLSSX, // 车辆损失险
            QCQD,  // 全车抢盗险
            ZRSS,  // 自然损失险
            NOTY,  // 不计免赔险
            WGZR,  // 无故责任险
            SYCOUNT, // 商业险总金额
            BCOM,  //  保险总金额
            CARCOM,  // 购车总金额
            DUTYVAL, // 第三方责任险
            BLPSX  // 玻璃破碎险
    } = this.state

    let DXFZRXS = DUTYVAL[DSFXVAL.Lval] || 0
    return (
    <div style={{height: '100%'}}>
      <Tab />
    <div className="boxPb">
      
      <div className="weui-cells" style={{marginTop: 0}}>
          <div className="weui-cell">
              <div className="weui-cell__bd">裸车价格</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" placeholder="请输入裸车价格" style={{width: '80%',textAlign: 'right'}} name="LPAY" value={LPAY > 0 ? LPAY : ''} onChange={this.handleChange} />
                    <span style={{color: '#333',paddingLeft: '4px'}}>元</span>
                  </span>
              </div>
          </div>
      </div>

      <div className="weui-cells">
          <div className="weui-cell">
              <div className="weui-cell__bd" style={{fontSize: '13px', color: '#888'}}>必要花费／单位(元)</div>
              <div className="weui-cell__ft">
                  <span className="sml" style={{color:'#F43530'}}>小计：{BYCOUNT}元</span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">购置税</div>
              <div className="weui-cell__ft">
                  <span className="sml">{GZS}</span>
              </div>
          </div>
          <div className="weui-cell weui-cell_access" onClick={this.ACJQX}>
              <div className="weui-cell__bd">交强险</div>
              <div className="weui-cell__ft">
                  <span className="sml">{JQXVAL.Lname == '营业' ? '运营' : '非运营'} {JQXVAL.Rname} {JQXVAL.Rval}</span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">车船使用税</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" placeholder="请输入" style={{textAlign: 'right'}} name="CarShip" value={CarShip} onChange={this.handleChange} />
                  </span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">上牌费用</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" placeholder="请输入" style={{textAlign: 'right'}} name="UpSign" value={UpSign} onChange={this.handleChange} />
                  </span>
              </div>
          </div>
          <div className="weui-cell weui-cell_access" onClick={this.ACJQZK}>
              <div className="weui-cell__bd">交强险折扣</div>
              <div className="weui-cell__ft">
                  <span className="sml">{JQZKVAL.Lname}</span>
              </div>
          </div>
      </div>


      <div className="weui-cells weui-cells_checkbox">
        <div className="weui-cell">
            <div className="weui-cell__bd" style={{fontSize: '13px', color: '#888'}}>商业保险／单位(元)</div>
            <div className="weui-cell__ft">
                <span className="sml" style={{color:'#F43530'}}>小计：{SYCOUNT}元</span>
            </div>
        </div>

        <div className="weui-cell weui-check__label weui-cell_access">
            <label className="weui-cell__hd" For="s1">
                <input type="checkbox" className="weui-check" id="s1" ref="DXFZRXS" value={DXFZRXS} defaultChecked="true" onChange={this.CheckBox}/>
                <i className="weui-icon-checked"></i>
            </label>
            <div className="weui-cell__bd" onClick={this.DSFX}>第三方责任险</div>
            <div className="weui-cell__ft" onClick={this.DSFX}>
                <span className="sml">赔付{DSFXVAL.Lname} {DXFZRXS}</span>
            </div>
        </div>

        <label className="weui-cell weui-check__label" For="s2">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} className="weui-check" id="s2" value={CLSSX} ref="CLSSX" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">车辆损失险</div>
            <div className="weui-cell__ft">
                <span className="sml">{CLSSX}</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s3">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s3" value={QCQD} ref="QCQD" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">全车抢盗险</div>
            <div className="weui-cell__ft">
                <span className="sml">{QCQD}</span>
            </div>
        </label>

        <div className="weui-cell weui-check__label weui-cell_access">
            <label className="weui-cell__hd" For="s4">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s4" value={BLPSX} ref="BLPSX" />
                <i className="weui-icon-checked"></i>
            </label>
            <div className="weui-cell__bd" onClick={this.BLPS}>玻璃破碎险</div>
            <div className="weui-cell__ft" onClick={this.BLPS}>
                <span className="sml">{BLPSVAL.Lname}玻璃 {BLPSX}</span>
            </div>
        </div>

        <label className="weui-cell weui-check__label" For="s5">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s5" value={ZRSS} ref="ZRSS" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">自然损失险</div>
            <div className="weui-cell__ft">
                <span className="sml">{ZRSS}</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s6">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s6" ref="NOTY" value={NOTY} />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">不计免赔特约险</div>
            <div className="weui-cell__ft">
                <span className="sml">{NOTY}</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s7">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s7" ref="WGZR" value={WGZR} />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">无故责任险</div>
            <div className="weui-cell__ft">
                <span className="sml">{WGZR}</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s8">
            <div className="weui-cell__hd">
                <input type="checkbox" defaultChecked="true" onChange={this.CheckBox} name="checkbox1" className="weui-check" id="s8" value={PEOPAY} ref="PEOPAY"/>
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">车上人员责任险</div>
            <div className="weui-cell__ft" style={{flex: 1}}>
                <span>
                <input className="weui-input" type="number" placeholder="请输入" style={{textAlign: 'right'}} name="PEOPAY" value={PEOPAY} onChange={this.handleChange} />
                </span>
            </div>
        </label>

        <div className="weui-cell weui-cell_access" onClick={this.SYXZK}>
            <div className="weui-cell__hd">
                <i style={{display:'inline-block',margin:'0 .2em',width:'23px',height:'23px'}}> </i>
            </div>
            <div className="weui-cell__bd">商业险折扣</div>
            <div className="weui-cell__ft">
                <span className="sml">{SYXZKVAL.Lname}</span>
            </div>
        </div>
      </div>
      <div style={{height: '20px'}}> </div>
    </div>

      <div className="footBox" style={{display: isBtn ? '' : 'none'}}>
        <div className="footBtn" onClick={this.Reckon}>计算</div>
        <div className="footCon">
          <div className="footNub"><em>购车总金额</em><i>{CARCOM}元</i></div>
          <div className="footMsg">
            <div className="footMsgItem fMIt">
              <em>裸车金额</em>
              <i>{LPAY > 0 ? LPAY : 0}元</i>
            </div>
            <div className="footMsgItem">
              <em>保险总金额</em>
              <i>{BCOM}元</i>
            </div>
          </div>
        </div>
      </div>
      <JQX Datas={this.state.JQXrandom}
           onChange={(val) => this.setState({JQXVAL: val,JQXrandom:''},this.changeLv(val))}
           onClose={() => this.setState({JQXrandom:''})} />
      <ZKX Datas={this.state.JQZKrandom}
           onChange={(val) => this.setState({JQZKVAL: val,JQZKrandom:''})}
           onClose={() => this.setState({JQZKrandom:''})} />
      <SYX Datas={this.state.SYXZKrandom}
           onChange={(val) => this.setState({SYXZKVAL: val,SYXZKrandom:''})}
           onClose={() => this.setState({SYXZKrandom:''})} />
      <ZRX Datas={this.state.DSFXrandom}
           onChange={(val) => this.setState({DSFXVAL: val,DSFXrandom:''})}
           onClose={() => this.setState({DSFXrandom:''})} />
      <OPXR Datas={this.state.BLPSrandom}
           onChange={(val) => this.setState({BLPSVAL: val,BLPSrandom:''})}
           onClose={() => this.setState({BLPSrandom:''})} />
    </div>
    )
  }
}


