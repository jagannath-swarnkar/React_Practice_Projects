module.exports = (db,login,knex,jwt,SECRET) =>{
    login.post('/login',(req,res)=>{
        db.userdetail.findOne({
            raw:true,
            where:{email: req.body.email}
            })   
        .then((data)=>{
            if(req.body.password){
                if(data.password===req.body.password){
                    delete data.password
                    jwt.sign({
                        data:JSON.stringify(data)},
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
                    console.log('wrong password'),
                    res.send('wrongPass')
                }
            }
            else{
                delete data.password
                jwt.sign({
                    data:JSON.stringify(data)},
                    process.env.SECRET,
                    {expiresIn:'1d'}, 
                    (err, token) => {
                        if(!err){
                            res.send(token.toString())
                        }
                        else{
                            console.log(
                                'some err in sending token in cookie',
                                err);
                        }
                })
            }
        })
        .catch(
            (err)=>{
                console.log(
                    'user does not exists please signup first');
                    res.send('err'
                    )
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