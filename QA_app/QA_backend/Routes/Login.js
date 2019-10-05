module.exports = (login,knex)=>{
    login.post('/login',(req,res)=>{
        knex('userdetail')
        .where('userdetail.email',req.body.email)
        .then((data) => {
            if(data.length===0){
                knex('userdetail')
                .insert(req.body)
                .then((data1) => {
                    knex('userdetail')
                    .where('userdetail.email',req.body.email)
                    .then((data2) => {
                        console.log('sign in success ',data2[0]);
                        res.send(data2[0]);
                    })
                    .catch((err) => {
                        console.log('this user already exists');
                    });
                })
                .catch((err) => {
                    console.log('this user already exists');
                });
            }else{
            console.log('sign in success ',data[0]);
            res.send(data[0]);
            }
        })
        .catch(err => {
            console.log('err in verifing user in userdetail :',err);
            res.send('err');
        });
    })
}