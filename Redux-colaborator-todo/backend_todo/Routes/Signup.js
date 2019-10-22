module.exports = (signup,knex)=>{
    signup.post('/signup',(req,res)=>{
        knex('userdetail')
        .insert(req.body)
        .then((data)=>{
            console.log('userdetail insrted into userdetail table in database ',data)
            knex('userdetail')
            .select(
                'userdetail.username',
                'userdetail.email'
            )
            .then((result)=>{
                res.send(result)
            })
            .catch(err => res.json('err'))
        })
        .catch((err)=>{
            console.log('err in inserting userdetail into userdetail table of database')
            res.json({status_code:404,"message":"err in inserting userdetail into table"})
        })
    })
}