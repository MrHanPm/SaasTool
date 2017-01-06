import React from 'react'

class Sidebar extends React.Component{
  constructor(props) {
      super(props)
          this.state ={
            visible:false,
            Lval:'',
            Lname:'',
            L:[
              {name:'5折',val:0.5},
              {name:'5.5折',val:0.55},
              {name:'6折',val:0.6},
              {name:'6.5折',val:0.65},
              {name:'7折',val:0.7},
              {name:'7.5折',val:0.75},
              {name:'8折',val:0.8},
              {name:'8.5折',val:0.85},
              {name:'9折',val:0.9},
              {name:'9.5折',val:0.95},
              {name:'无折扣',val:1}
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
    let {L, Lname, visible} = this.state
      return(
          <aside className={visible ? "PubSidebar visible":"PubSidebar"} onClick={this.CLXB}>
              <header>
                  <span>保险折扣</span>
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
