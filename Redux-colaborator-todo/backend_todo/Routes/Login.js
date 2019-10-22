module.exports = (login,knex,jwt,SECRET) =>{
    login.post('/login',(req,res)=>{
        knex('userdetail')
        .where('userdetail.email',req.body.email)
        .select(
            'userdetail.username',
            'userdetail.email',
            'userdetail.user_id',
            'userdetail.password'
        )
        .then((data)=>{
            if(data.length>0){
                if(req.body.password){
                    if(data[0].password===req.body.password){
                        delete data[0].password
                        jwt.sign({
                            data:JSON.stringify(data[0])},
                            process.env.SECRET,
                            {expiresIn:'1d'}, 
                            (err, token) => {
                                if(!err){
                                    res.send(token.toString())
                                }
                                else{
                                    console.log(
                                        'some err in sending token in cookie',
                                        err
                                        );
                                }
                        })
                    }
                    else{
                        console.log(
                            'wrong password'),
                            res.send('wrongPass'
                            )
                    }
                }
                else{
                    delete data[0].password
                    jwt.sign({
                        data:JSON.stringify(data[0])},
                        process.env.SECRET,
                        {expiresIn:'1d'}, 
                        (err, token) => {
                            if(!err){
                                res.send(token.toString())
                            }
                            else{
                                console.log(
                                    'some err in sending token in cookie',
                                    err)
                                    ;
                            }
                    })
                }
            }
            else{
                console.log(
                    'user does not exists please signup first');
                    res.send('err'
                    )
            }
        })
        .catch(
            (err)=>{
                console.log(err);
            }
        )
    })

    login.get('/checkToken',(req,res)=>{
        jwt.verify(req.query.token,process.env.SECRET,(err,tokenData)=>{
            if(!err){
                console.log('tokenData : ',tokenData)
            }else{
                console.log('token expired')
                res.json('tokenExpires')
            }
        })
    })
}