module.exports=(postAns,knex)=>{
    postAns.post('/answer',(req,res)=>{
        knex('Abank')
        .insert({Q_id:req.body.Q_id,answer:req.body.answer})
        .then((result)=>{console.log('answer saved into database');
            knex('Abank')
            .where('Abank.Q_id',req.body.Q_id)
            .then((result)=>{res.send(result)})
            .catch((err)=>{console.log('err in getting back answer from database',err)})
        })
        .catch((err)=>{console.log('err in saving answer into database',err)})
    })
}