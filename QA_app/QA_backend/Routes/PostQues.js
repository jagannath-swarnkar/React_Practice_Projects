module.exports=(postQues,knex)=>{
    postQues.post('/question',(req,res)=>{
        knex('Qbank')
        .insert({question:req.body.Question})
        .then(()=>{console.log('data saved into the database successfully');
            knex('Qbank')
            // .where('Qbank.question',req.body.Question)
            .then((result)=>{res.send(result)})
            .catch((err)=>{console.log('err in getting back question from database',err)})
        })
        .catch((err)=>{console.log('err in saving question into database',err)})

    })
}