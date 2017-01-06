import React from 'react'

class Sidebar extends React.Component{
  constructor(props) {
      super(props)
          this.state ={
            visible:false,
            Lval:'',
            Lname:'',
            L:[
              {name:'5万',val:0},
              {name:'10万',val:1},
              {name:'15万',val:2},
              {name:'20万',val:3},
              {name:'30万',val:4},
              {name:'50万',val:5},
              {name:'100万',val:6}
            ]
          }
      this.closeSold = this.closeSold.bind(this)
      this.goDatas = this.goDatas.bind(this)
      this.CLXB = this.CLXB.bind(this)
  }

  goDatas(e){
    let AD = {
      Lval: parseFloat(e.target.title),
      Lname: e.target.innerHTML
    }
    this.setState({
      Lval: e.target.title,
      Lname: e.target.innerHTML,
      visible:false
    },() => this.props.onChange(AD))
  }
  componentDidMount(){}

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
    let {L, Lname, visible} = this.state
      return(
          <aside className={visible ? "PubSidebar visible":"PubSidebar"} onClick={this.CLXB}>
              <header>
                  <span>赔偿金额</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {L.map((e,indexs) =>
                  <li key={indexs} className={e.name == Lname ? "active" :''}>
                    <span title={e.val} onClick={selfs.goDatas}>
                      {e.name}
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
