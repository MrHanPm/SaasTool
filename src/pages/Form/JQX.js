import React from 'react'
import {Icon} from 'react-weui'
import {Tool,Alert} from '../../tool.js'
import './sidebar.less'

class Sidebar extends React.Component{
  constructor(props) {
      super(props)
          this.state ={
            visible:false,
            active:false,
            Lval:'',
            Lname:'',
            Rval:'',
            Rname:'',
            R:[],
            L:[{name:'营业',val:0},{name:'非营业',val:1}],
            BS:[[
                  {name:'2吨以下',val:1850},
                  {name:'2-5吨',val:3070},
                  {name:'5-10吨',val:3450},
                  {name:'10吨以上',val:4480}
                ],
                [
                  {name:'2吨以下',val:1200},
                  {name:'2-5吨',val:1470},
                  {name:'5-10吨',val:1650},
                  {name:'10吨以上',val:2220}
                ]
            ]
          }
      this.closeSold = this.closeSold.bind(this)
      this.upDatas = this.upDatas.bind(this)
      this.goDatas = this.goDatas.bind(this)
  }

  upDatas(e){
    let citylistData = []
    for(let i=0;i < citylist.citylist.length; i++){
      if(citylist.citylist[i].provincesn == e.target.title){
          citylistData.push(citylist.citylist[i]);
      }
    }
    this.setState({
      provincesn:e.target.title,
      provincename:e.target.innerHTML,
      citysn:'',
      cityname:'',
      R:citylistData,
      active: true,
    })
    citylistData = []
  }
  goDatas(e){
    let Ad = {
      'provincesn':this.state.provincesn,
      'provincename':this.state.provincename,
      'citysn':e.target.title,
      'cityname':e.target.innerHTML
    }
    // this.setState({
    //   visible:false,
    //   cityname:e.target.innerHTML,
    //   citysn:e.target.title
    // })
    this.setState({
      cityname:e.target.innerHTML,
      citysn:e.target.title,
      visible:false
    }, ()=> this.props.onChange(Ad))
  }
  componentDidMount(){
    let self = this
    document.querySelectorAll('.PubSidebar').addEventListener('touchend', (e) => {
        var x = e.changedTouches[0].pageX
        if( x < 68 ){
            self.closeSold()
        }
      }, false)
  }
  componentWillReceiveProps(nextProps) {
    if(typeof(nextProps.Datas) == 'number'){
      this.setState({
        visible: true
      })
    }
  }
  closeSold(){
    this.setState({
      visible:false
    })
  }
  render(){
    let {L, R, Lname, Rname, visible, active} = this.state
      return(
          <aside className={visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>类别</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {L.map((e,indexs) => 
                  <li key={indexs} 
                  className={e.provincename == Fes ? "active" :''}
                  >
                    <span 
                    title={e.provincesn}
                    onClick={self.upDatas}
                    >
                      {e.provincename}
                    </span>
                    <Icon value="success" />
                  </li>
                )}
              </ul>
              <ul className="Lnav" style={{'display': active?'block':'none'}}>
                {R.map((el,index) => 
                  <li key={index} 
                  className={el.cityname == Ges ? "active" :''} 
                  >
                    <span 
                    key={index} 
                    title={el.citysn}
                    onClick={self.goDatas}
                    >
                      {el.cityname}
                    </span>
                    <Icon value="success" />
                  </li>
                )}
              </ul>
          </aside>
      )
  }
}

export default Sidebar 
