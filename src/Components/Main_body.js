import React, { Component } from 'react';
import './style/Main_body.css';
import swal from 'sweetalert';

export default class Main_body extends Component {
    constructor(props){
        super(props);
        this.state = {
            student:{"fullname":"","email":"",'contact':'',"gender":""},
            err:{'name':"",'email':"",'contact':"","gender":""}
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        // this.dobChangeHandler = this.dobChangeHandler.bind(this);
        // this.qualChangeHandler = this.qualChangeHandler.bind(this);
    }
    nameChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
    }
    contactChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
    }
    emailChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
        // console.log(studentInstance)
    }
    genderChangeHandler(event){
        var studentInstance = this.state.student;
        studentInstance[event.target.name]=event.target.value;
        this.setState({
            student:studentInstance
        })
    }
    
    onClickHandler(event){
        var errIns = this.state.err;
        this.setState({
            err:{'name':"",'email':"",'contact':"","gender":"","qual":""}
        })
        // swal('form submitted successfuly')
        var studentInstance = this.state.student;
        
        if(studentInstance.fullname.length<8){
            errIns['name']="Please enter a min length of 8 digit"
            this.setState({
                err:errIns
            })
        }
        else if(!studentInstance.email.includes('@') || !studentInstance.email.includes('.')){
            errIns['email']="Please include @ and . in email"
            this.setState({
                err:errIns
            })
        }
        else if(studentInstance.contact.length!==10){
            errIns['contact']="Mobile number should of 10 digits"
                this.setState({
                    err:errIns
                })
        }
        else if(studentInstance.gender!=='male' && studentInstance.gender!=="female"){
            console.log(studentInstance.gender)
            errIns['gender']="please choose either male or female"
                this.setState({
                    err:errIns
                })
        }
        else{
            console.log("done")
            this.setState({
                err:{'name':"",'email':"",'contact':"","gender":"","qual":""}
            })
            swal('form submitted successfuly')
            
        }
    }

    render() {
        return (
            <div className="main_body">
                <form className="form">
                    <span>Full Name : </span><br/>
                    <input onChange={this.nameChangeHandler} name="fullname" placeholder="name surname" type="text" value={this.state.student.fullname}/>
                    <p>{this.state.err.name}</p><br/>

                    <span>Email ID : </span><br/>
                    <input onChange={this.emailChangeHandler} name="email" placeholder="abc@gmail.com" type="email" value={this.state.student.email}/>
                    <p>{this.state.err.email}</p><br/>
                    
                    <span>Contact No. : </span><br/>
                    <input onChange={this.contactChangeHandler} name="contact" type="number" placeholder="contact number" value={this.state.student.contact}/>
                    <p>{this.state.err.contact}</p><br/>

                    <span>Gender : </span><br/>
                    <input onChange={this.genderChangeHandler} name="gender" type="text" placeholder="male/female" value={this.state.student.gender}/><br/><br/>
                    <p>{this.state.err.gender}</p><br/>

                    {/* <span>DOB : </span><br/>
                    <input onChange={this.dobChangeHandler} type="text" /><br/><br/> */}
                    {/* <span>Qualification : </span><br/>
                    <input onChange={this.qualChangeHandler} type="text" placeholder="qualification" value={this.state.student.qual}/>
                    <p>{this.state.err.email}</p><br/> */}

                    <button className="button" onClick={this.onClickHandler} type="button">Submit</button>
                </form>
            </div>
        )
    }
}
