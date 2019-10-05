module.exports = (signup,knex)=>{
    signup.post('/signup',(req,res)=>{
        console.log(req.body)
        knex('userdetail')
        .insert(req.body)
        .then((data) => {
            console.log('data-inserted!',data);
            res.send(data);
        })
        .catch((err) => {
            console.log('this user already exists');
            res.send('err');
        });
    })
}