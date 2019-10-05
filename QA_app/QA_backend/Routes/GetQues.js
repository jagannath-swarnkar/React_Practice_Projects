module.exports=(ques,knex)=>{
    ques.get('/get',(req,res)=>{
        knex('Qbank')
        .then((ques)=>{
            console.log('all ques',ques);
            res.send(ques)
        })
    })
}