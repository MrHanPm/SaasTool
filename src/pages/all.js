import React, { Component } from 'react'
import Tab from './tab'
import { Tool, Alert } from '../utils/tool'

export default class TruckMsg extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
        isData:false
    }

  }
  componentWillMount () {
   
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }
  render () {
    return (
    <div style={{height: '100%'}}>
      <Tab />
    <div className="boxPb">
      
        <div className="weui-cells" style={{marginTop: 0}}>
          <div className="weui-cell">
              <div className="weui-cell__bd">裸车价格</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" pattern="[0-9]*" placeholder="输入裸车价格" style={{width: '80%',textAlign: 'right'}} name="LPAY" />
                    <span style={{color: '#333',paddingLeft: '4px'}}>元</span>
                  </span>
              </div>
          </div>
        </div>

        <div className="weui-cells">
          <div className="weui-cell">
              <div className="weui-cell__bd">首付比例</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" pattern="[0-9]*" placeholder="自定义" style={{width: '80%',textAlign: 'right'}} name="LPAY" />
                    <span style={{color: '#333',paddingLeft: '4px'}}>%</span>
                  </span>
              </div>
          </div>
          <div className="fors-cell">
            <div data-val="30" className="selects">30%</div>
            <div data-val="40">40%</div>
            <div data-val="50">50%</div>
            <div data-val="60">60%</div>
          </div>

            <div className="weui-cell">
                <div className="weui-cell__bd">贷款期限</div>
            </div>
            <div className="weui_full">
                <div data-val="1" className="selects">1年</div>
                <div data-val="2">2年</div>
                <div data-val="3">3年</div>
                <div data-val="4">4年</div>
                <div data-val="5">5年</div>
            </div>

          <div className="weui-cell">
              <div className="weui-cell__bd">贷款年利率</div>
              <div className="weui-cell__ft">
                  <span className="sml">6.4%</span>
              </div>
          </div>
      </div>

      <div className="weui-cells">
          <div className="weui-cell">
              <div className="weui-cell__bd" style={{fontSize: '13px', color: '#888'}}>必要花费／单位(元)</div>
              <div className="weui-cell__ft">
                  <span className="sml" style={{color:'#F43530'}}>小计：199元</span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">购置税</div>
              <div className="weui-cell__ft">
                  <span className="sml">100</span>
              </div>
          </div>
          <div className="weui-cell weui-cell_access">
              <div className="weui-cell__bd">交强险</div>
              <div className="weui-cell__ft">
                  <span className="sml">运营 2吨</span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">车船使用税</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入" style={{textAlign: 'right'}} name="LPAY" />
                  </span>
              </div>
          </div>
          <div className="weui-cell">
              <div className="weui-cell__bd">上牌费用</div>
              <div className="weui-cell__ft" style={{flex: 1}}>
                  <span>
                  <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入" style={{textAlign: 'right'}} name="LPAY" />
                  </span>
              </div>
          </div>
          <div className="weui-cell weui-cell_access">
              <div className="weui-cell__bd">交强险折扣</div>
              <div className="weui-cell__ft">
                  <span className="sml">6.0折</span>
              </div>
          </div>
      </div>


      <div className="weui-cells weui-cells_checkbox">
        <div className="weui-cell">
            <div className="weui-cell__bd" style={{fontSize: '13px', color: '#888'}}>商业保险／单位(元)</div>
            <div className="weui-cell__ft">
                <span className="sml" style={{color:'#F43530'}}>小计：199元</span>
            </div>
        </div>

        <div className="weui-cell weui-check__label weui-cell_access">
            <label className="weui-cell__hd" For="s1">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s1" />
                <i className="weui-icon-checked"></i>
            </label>
            <div className="weui-cell__bd">第三方责任险</div>
            <div className="weui-cell__ft">
                <span className="sml">运营 2吨</span>
            </div>
        </div>

        <label className="weui-cell weui-check__label" For="s2">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s2" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">车辆损失险</div>
            <div className="weui-cell__ft">
                <span className="sml">455</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s3">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s3" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">全车抢盗险</div>
            <div className="weui-cell__ft">
                <span className="sml">455</span>
            </div>
        </label>

        <div className="weui-cell weui-check__label weui-cell_access">
            <label className="weui-cell__hd" For="s4">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s4" />
                <i className="weui-icon-checked"></i>
            </label>
            <div className="weui-cell__bd">玻璃单独破碎险</div>
            <div className="weui-cell__ft">
                <span className="sml">运营 2吨</span>
            </div>
        </div>

        <label className="weui-cell weui-check__label" For="s5">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s5" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">自然损失险</div>
            <div className="weui-cell__ft">
                <span className="sml">455</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s6">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s6" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">不计免赔特约险</div>
            <div className="weui-cell__ft">
                <span className="sml">455</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s7">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s7" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">无故责任险</div>
            <div className="weui-cell__ft">
                <span className="sml">455</span>
            </div>
        </label>

        <label className="weui-cell weui-check__label" For="s8">
            <div className="weui-cell__hd">
                <input type="checkbox" name="checkbox1" className="weui-check" id="s8" />
                <i className="weui-icon-checked"></i>
            </div>
            <div className="weui-cell__bd">车上人员责任险</div>
            <div className="weui-cell__ft" style={{flex: 1}}>
                <span>
                <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入" style={{textAlign: 'right'}} name="LPAY" />
                </span>
            </div>
        </label>

        <div className="weui-cell weui-cell_access">
            <div className="weui-cell__hd">
                <i style={{display:'inline-block',margin:'0 .2em',width:'23px',height:'23px'}}> </i>
            </div>
            <div className="weui-cell__bd">商业险折扣</div>
            <div className="weui-cell__ft">
                <span className="sml">9.0折</span>
            </div>
        </div>
      </div>
      <div style={{height: '20px'}}> </div>
    </div>

      <div className="footBox">
        <div className="footBtn">计算</div>
        <div className="footCon">
          <div className="footNub"><em>总价</em><i>17.33元</i></div>
          <div className="footMsg">
            <div className="footMsgAll fMIt">
              <em>首付</em>
              <i>153元</i>
            </div>
            <div className="footMsgAll fMIt">
              <em>利息</em>
              <i>153元</i>
            </div>
            <div className="footMsgAll">
              <em>月供(24个月)</em>
              <i>153元</i>
            </div>
          </div>
        </div>
      </div>

    </div>
    )
  }
}

