import React, { Component } from 'react';
import LoginPage from './Components/LoginPage';
import App from './Components/App';
import './Main.css';


export class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            jwt:''
        }
    }


jwtHandler=(e)=>{
    this.setState({jwt:e})
    
  }
  login =()=>{
      console.log('login',this.state.jwt);
      
  }


  render(){
    

    if(this.state.jwt===''){
        var a=<LoginPage jwtHandler={this.jwtHandler} login={this.login}/>
    }else{
        a=<App jwt={this.state.jwt}/>
    }
        return (
            <div id="loginPage">
                {a}
            </div>
        )
    }
}


export default Main
