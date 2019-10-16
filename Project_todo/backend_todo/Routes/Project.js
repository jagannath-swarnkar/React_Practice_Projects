module.exports = (project,knex,jwt,checkToken)=>{
    project.post('/project',checkToken,(req,res)=>{        
        knex('projects')
            .insert({
                user_id:req.tokenData.user_id,
                project_name:req.body.project,
                description:req.body.description,
                user_name:req.tokenData.username,
                user_email:req.tokenData.email,
                project_date:new Date()
            })
            .then((data)=>{
                console.log('success',data)
                knex('todos')
                    .select(
                        'todos.user_id'
                    )
                    .where('todos.assigned_to',req.tokenData.email)
                    .then((data1)=>{
                        if(data1.length>0){
                            knex('projects')
                                .select('*')
                                .where('projects.user_id',req.tokenData.user_id)
                                .orWhere('projects.user_id',data1[0].user_id)
                                .then((result)=>{
                                    console.log(result)
                                    res.json(result)
                                    })
                                .catch((err)=>{
                                    console.log('err in fetching data from projects',err)
                                    })
                            }
                        else{
                            knex('projects')
                                .select('*')
                                .where('projects.user_id',req.tokenData.user_id)
                                .then((result)=>{
                                    console.log(result)
                                    res.json(result)
                                    })
                                .catch((err)=>{
                                    console.log('err in fetching data from projects',err)
                                    })
                            }                
                        })
                    .catch(err => res.json({status_code:404,"message":err}))
                })
            .catch(err => res.json({status_code:404,"message":"err in inserting project detail into db","Error":err}))
    })

    project.post('/getProject',checkToken,(req,res)=>{
        knex('todos')
            .select(
                'todos.project_id'
            )
            .where('todos.assigned_to',req.tokenData.email)
            .then((data1)=>{
                if(data1.length>0){
                    knex('projects')
                        .select('*')
                        .where('projects.user_id',req.tokenData.user_id)
                        .orWhere('projects.project_id',data1[0].project_id)
                        .then((result)=>{
                            console.log(result)
                            res.json(result)
                            })
                        .catch((err)=>{
                            console.log('err in fetching data from projects',err)
                            })
                    }
                else{
                    knex('projects')
                        .select('*')
                        .where('projects.user_id',req.tokenData.user_id)
                        .then((result)=>{
                            console.log(result)
                            res.json(result)
                            })
                        .catch((err)=>{
                            console.log('err in fetching data from projects',err)
                            })
                    }                
                })
        .catch((err)=>{
            console.log('err in getting todos data',err)
            })
    })
}
