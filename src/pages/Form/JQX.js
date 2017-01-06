import React from 'react'

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
      this.CLXB = this.CLXB.bind(this)
  }

  upDatas(e){
    let { BS } = this.state
    this.setState({
      Lval:e.target.title,
      Lname:e.target.innerHTML,
      Rval:'',
      Rname:'',
      R: BS[e.target.title],
      active: true
    })
  }
  goDatas(e){
    let AD = {
      Lval: parseFloat(this.state.Lval),
      Lname: this.state.Lname,
      Rval: parseFloat(e.target.title),
      Rname: e.target.innerHTML
    }
    this.setState({
      Rval: e.target.title,
      Rname: e.target.innerHTML,
      visible:false
    },() => this.props.onChange(AD))
  }
  componentDidMount(){

  }
  CLXB (e) {
    let x = e.pageX
    if( x < 68 ){
      this.closeSold()
    }
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
    },() => this.props.onClose())
  }
  render(){
    let selfs = this
    let {L, R, Lname, Rname, visible, active} = this.state
      return(
          <aside className={visible ? "PubSidebar visible":"PubSidebar"} onClick={this.CLXB}>
              <header>
                  <span>交强险类别</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {L.map((e,indexs) =>
                  <li key={indexs} className={e.name == Lname ? "active" :''}>
                    <span title={e.val} onClick={selfs.upDatas}>
                      {e.name}
                    </span>
                    <i></i>
                  </li>
                )}
              </ul>
              <ul className="Lnav" style={{'display': active?'block':'none'}}>
                {R.map((el,index) => 
                  <li key={index} className={el.name == Rname ? "active" :''}>
                    <span key={index} title={el.val} onClick={selfs.goDatas}>
                      {el.name}
                    </span>
                    <i></i>
                  </li>
                )}
              </ul>
          </aside>
      )
  }
}

export default Sidebar 
