module.exports=(ans,knex)=>{
    ans.get('/GetAns',(req,res)=>{
        knex('Abank')
        .then((Ans)=>{
            console.log('all ans',Ans);
            res.send(Ans)
        })
    })
}