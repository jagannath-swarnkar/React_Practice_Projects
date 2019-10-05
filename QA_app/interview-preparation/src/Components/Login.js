import GoogleLogin from 'react-google-login';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import React from 'react';
import { Card } from '@material-ui/core';


export default function Login() {

    const googleLoginHandler = (email,name,image) =>{
        axios
        .post('http://localhost:4000/login',{name:name,email:email,image:image})
        .then((result)=>{
            if(result.data!=='err'){
              console.log('login successfull!',result.data)
              }
            else{
              console.log('user exists!')
              };
        })
        .catch((err)=>{console.log('err in posting signup data'.err)})
      }
    
    const responseGoogle = (response) => {
        var userDetail=(response.profileObj);
        googleLoginHandler(userDetail.email,userDetail.name,userDetail.imageUrl)
    }
    


    return (
        <Container style={{display:'flex',justifyContent:'center'}}>
          <Card style={{margin:'20px',padding:'20px',width:'400px',display:'flex',justifyContent:'center'}}>
                <GoogleLogin
                    clientId="725279638493-ldam4ggm5ro23gum4kncj36l88bj160g.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    fullWidth
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
                </Card>
        </Container>
    )
}
