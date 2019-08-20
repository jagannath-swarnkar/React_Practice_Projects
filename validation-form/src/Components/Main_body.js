import React, { Component } from 'react';
import './style/Main_body.css';
import swal from 'sweetalert';

export default class Main_body extends Component {
    constructor(props){
        super(props);
        this.state = {
            student:{"fullname":"","email":"",'contact':'',"gender":""},
            err:{'name':"Please enter a min length of 8 digit",
            'email':"Please include @ and . in email",
            'contact':"Mobile number should of 10 digits",
            "gender":"please choose either male or female"}
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
    }
    nameChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
        var errIns = this.state.err;
        if(studentInstance.fullname.length<8){
            errIns['name']="Please enter a min length of 8 digit"
            this.setState({
                err:errIns
            })
        }else{errIns['name']="";
            this.setState({
            err:errIns
        })}
    }
    contactChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
        var errIns = this.state.err;
        if(studentInstance.contact.length!==10){
                errIns['contact']="Mobile number should of 10 digits"
                this.setState({
                    err:errIns
                })
            }else{errIns['contact']="";
            this.setState({
            err:errIns
        })}
    }
    emailChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
        var errIns = this.state.err;
        if(studentInstance.email.includes('@') && studentInstance.email.includes('.')){
            errIns['email']="";
            this.setState({err:errIns})
            }
        else{
            errIns['email']="Please include @ and . in email"
            this.setState({
                err:errIns
                })
            }
    }
    genderChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
        var errIns = this.state.err;
        if(studentInstance.gender!=='male' && studentInstance.gender!=="female"){
                errIns['gender']="please choose either male or female"
                this.setState({
                    err:errIns
                })
            }else{errIns['gender']="";
            this.setState({
            err:errIns
        })}
    }
    
    onClickHandler(event){
        document.getElementById('name').style.display="block";
        document.getElementById('email').style.display="block";
        document.getElementById('contact').style.display="block";
        document.getElementById('gender').style.display="block";
        if(this.state.err.name==="" && this.state.err.email==="" && this.state.err.contact==="" && this.state.err.gender===""){
            var studentInstance = this.state.student;
            studentInstance['fullname']="";
            studentInstance['email']="";
            studentInstance['contact']="";
            studentInstance['gender']="";
            this.setState({
                student:studentInstance
            })
            swal('Congratulation! form submitted successfuly')
        }
    }

    render() {
        return (
            <div className="main_body">
                <form className="form">
                    <span>Full Name : </span><br/>
                    <input onChange={this.nameChangeHandler} name="fullname" placeholder="name surname" type="text" value={this.state.student.fullname}/>
                    <p id ="name">{this.state.err.name}</p><br/><br/>

                    <span>Email ID : </span><br/>
                    <input onChange={this.emailChangeHandler} name="email" placeholder="abc@gmail.com" type="email" value={this.state.student.email}/>
                    <p id ="email">{this.state.err.email}</p><br/><br/>
                    
                    <span>Contact No. : </span><br/>
                    <input onChange={this.contactChangeHandler} name="contact" type="number" placeholder="contact number" value={this.state.student.contact}/>
                    <p id ="contact">{this.state.err.contact}</p><br/><br/>

                    <span>Gender : </span><br/>
                    <input onChange={this.genderChangeHandler} name="gender" type="text" placeholder="male/female" value={this.state.student.gender}/>
                    <p id ="gender">{this.state.err.gender}</p><br/><br/>

                    <button className="button" onClick={this.onClickHandler} type="button">Submit</button>
                </form>
            </div>
        )
    }
}
