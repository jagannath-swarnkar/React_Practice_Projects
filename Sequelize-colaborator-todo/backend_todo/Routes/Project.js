module.exports = (db,Op,project,knex,jwt,checkToken)=>{
    
    project.post('/project',checkToken,(req,res)=>{
        db.projects.create({
            user_id:req.tokenData.id,
            project_name:req.body.project,
            description:req.body.description,
            user_name:req.tokenData.username,
            user_email:req.tokenData.email,
            project_date:new Date()
        })
        .then((card) => {
            Promise.all([
                db.todos.findAll({
                    raw: true,
                    attributes: ['user_id'],
                    where: {
                        assigned_to: req.tokenData.email
                    }
                }),
                db.projects.findAll({
                    raw:true,
                    where: {
                        user_id: req.tokenData.id
                    }
                })
            ])
            .then((data) => {
                if(data[0].length>0){
                    console.log('this project has some assigned todos');
                    db.projects.findAll({
                        raw:true,
                        where: {
                            user_id: req.tokenData.id
                        },
                        orWhere: {
                            project_id: data[0][0].project_id
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        res.json(result)
                    })
                }else{
                    console.log("this todo hasn't any assigned todo",data[1])
                    res.json(data[1])
                }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log('error in inserting new project into db',err))
    })


    //     knex('projects')
    //         .insert({
    //             user_id:req.tokenData.user_id,
    //             project_name:req.body.project,
    //             description:req.body.description,
    //             user_name:req.tokenData.username,
    //             user_email:req.tokenData.email,
    //             project_date:new Date()
    //         })
    //         .then((data)=>{
    //             console.log('success',data)
    //             knex('todos')
    //                 .select(
    //                     'todos.user_id'
    //                 )
    //                 .where('todos.assigned_to',req.tokenData.email)
    //                 .then((data1)=>{
    //                     if(data1.length>0){
    //                         knex('projects')
    //                             .select('*')
    //                             .where('projects.user_id',req.tokenData.user_id)
    //                             .orWhere('projects.user_id',data1[0].user_id)
    //                             .then((result)=>{
    //                                 console.log(result)
    //                                 res.json(result)
    //                                 })
    //                             .catch((err)=>{
    //                                 console.log('err in fetching data from projects',err)
    //                                 })
    //                         }
    //                     else{
    //                         knex('projects')
    //                             .select('*')
    //                             .where('projects.user_id',req.tokenData.user_id)
    //                             .then((result)=>{
    //                                 console.log(result)
    //                                 res.json(result)
    //                                 })
    //                             .catch((err)=>{
    //                                 console.log('err in fetching data from projects',err)
    //                                 })
    //                         }                
    //                     })
    //                 .catch(err => res.json({status_code:404,"message":err}))
    //             })
    //         .catch(err => res.json({status_code:404,"message":"err in inserting project detail into db","Error":err}))

    project.post('/getProject',checkToken,(req,res)=>{
        Promise.all([
            db.todos.findAll({
                raw: true,
                attributes: ['project_id'],
                where: {
                    assigned_to: req.tokenData.email
                }
            }),
            db.projects.findAll({
                raw:true,
                where: {
                    user_id: req.tokenData.id
                }
            })
        ])
        .then((data) => {
            // console.log('todos :',data[0],'projects :',data[1])
            if(data[0].length>0){
                console.log('this project has some assigned todos');
                db.projects.findAll({
                    raw:true,
                    // where: {
                    //     user_id: req.tokenData.id
                    // },
                    // orWhere: {
                    //     project_id: data[0][0].project_id
                    // }
                    where: {
                        [Op.or]: [{user_id: req.tokenData.id}, {project_id: data[0][0].project_id}]
                    }
                })
                .then((result) => {
                    console.log(result)
                    res.json(result)
                })
            }else{
                console.log("this todo hasn't any assigned todo")
                res.json(data[1])
            }
        })
        .catch(err => console.log(err))

    //     knex('todos')
    //         .select(
    //             'todos.project_id'
    //         )
    //         .where('todos.assigned_to',req.tokenData.email)
    //         .then((data1)=>{
    //             if(data1.length>0){
    //                 knex('projects')
    //                     .select('*')
    //                     .where('projects.user_id',req.tokenData.user_id)
    //                     .orWhere('projects.project_id',data1[0].project_id)
    //                     .then((result)=>{
    //                         console.log(result)
    //                         res.json(result)
    //                         })
    //                     .catch((err)=>{
    //                         console.log('err in fetching data from projects',err)
    //                         })
    //                 }
    //             else{
    //                 knex('projects')
    //                     .select('*')
    //                     .where('projects.user_id',req.tokenData.user_id)
    //                     .then((result)=>{
    //                         console.log(result)
    //                         res.json(result)
    //                         })
    //                     .catch((err)=>{
    //                         console.log('err in fetching data from projects',err)
    //                         })
    //                 }                
    //             })
    //     .catch((err)=>{
    //         console.log('err in getting todos data',err)
    //         })
    })
}
