module.exports = (db,todos,knex,checkToken)=>{
    todos.post('/todo',checkToken,(req,res)=>{
        db.todos.create({
            project_id:parseInt(req.body.project_id),
            text:req.body.text,
            done:req.body.done,
            user_id:req.tokenData.id,
            user_email:req.tokenData.email,
            assigned_to:req.body.assignedTo
        })
        .then((data) => {
            db.todos.findAll({
                raw: true,
                where: {project_id: parseInt(req.body.project_id)}
            })
            .then((result) => {
                console.log(result)
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
                res.json({status_code:404,"message":err})
            })
        })
        .catch((err)=>{
            console.log('err in inserting todo into db',err)
        })
    })

        // knex('todos')
        // .insert({
        //     project_id:parseInt(req.body.project_id),
        //     text:req.body.text,
        //     done:req.body.done,
        //     user_id:req.tokenData.user_id,
        //     user_email:req.tokenData.email,
        //     assigned_to:req.body.assignedTo
        // })
        // .then((data)=>{
        //     knex('todos')
        //     .select('*')
        //     .where('todos.project_id',parseInt(req.body.project_id))
        //     .then((result)=>{
        //         res.json(result)
        //     })
        //     .catch(err => res.json({status_code:404,"message":err}))
        // })
        // .catch((err)=>{
        //     console.log('err in inserting todo into db',err)
        // })


    // getting data in compponent will mount from database using project_id
    todos.post('/getTodos',checkToken,(req,res)=>{
        db.todos.findAll({
            raw: true,
            where: {project_id: parseInt(req.body.project_id)}
        })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.json({status_code:404,"message":err})
        })
    })
    //     knex('todos')
    //         .select('*')
    //         .where('todos.project_id',parseInt(req.body.project_id))
    //         .then((result)=>{
    //             res.json(result)
    //         })
    //         .catch(err => res.json({status_code:404,"message":err}))
    // })

    // deleting a todo by its id---------------------------------------
    todos.post('/delete/:id',checkToken,(req,res)=>{
        db.todos.destroy({
            raw: true,
            where: {id:req.body.id}
        })
        .then((data) =>{
            db.todos.findAll({
                raw: true,
                where: {project_id: parseInt(req.body.project_id)}
            })
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.json({status_code:404,"message":err})
            })
        })
        .catch((err)=>{
            console.log('err in deleting data in backend',err)
        })

        // knex('todos')
        // .del()
        // .where('todos.id',req.body.id)
        // .then((data)=>{
        //     knex('todos')
        //     .select('*')
        //     .where('todos.project_id',parseInt(req.body.project_id))
        //     .then((result)=>{
        //         res.send(result)
        //         })
        //     .catch((err)=>console.log(err))
        //     })
        // .catch((err)=>{console.log('err in deleting data in backend',err)})
    })

    // Put method to update the states like done or pending into database and return back to update in frontend
    todos.put('/done/:id',checkToken,(req,res)=>{
        db.todos.update({
            done:req.body.done
        },
        {
            raw: true,
            where: {id: req.body.id},
            $and: {user_id: req.tokenData.id}
        })
        .then((data) => {
            console.log('done updated in db')
            res.json('done updated')
            })
        .catch((err)=>{
            res.send('err')
        })

        // knex('todos')
        // .where('todos.id',req.body.id)
        // .andWhere('todos.user_id',req.tokenData.user_id)
        // .update({done:req.body.done})
        // .then((data) => {
        //     console.log('done updated in db')
        //     res.json('done updated')
        //     })
        // .catch((err)=>{res.send('err')})
    })

    // editing a todo by its id and updating in db and rendering--------------------
    todos.put('/edit/:id',checkToken,(req,res)=>{
        let text = req.body.text;
        db.todos.update({
            text: req.body.text
        },
        {
            where: {id: req.body.id}
        })
        .then((data) => {
            console.log('todo updated to db')
            db.todos.findAll({
                raw: true,
                where: {project_id: parseInt(req.body.project_id)}
            })
            .then((result)=>{
                console.log(result);
                res.send(result)
                })
            .catch((err)=>console.log(err)) 
        })
        .catch((err)=>{
            console.log('token expired please login again')
        })
 
        // knex('todos')
        // // .where('todos.userId',req.tokenData.user_id)
        // .where('todos.id',req.body.id)
        // .update({text:text})
        // .then((data) =>{
        //     console.log('todo updated to db')
        //     knex('todos')
        //     .select('*')
        //     .where('todos.project_id',parseInt(req.body.project_id))
        //     .then((result)=>{
        //         console.log(result);
        //         res.send(result)
        //         })
        //     .catch((err)=>console.log(err)) 
        //     })
        // .catch((err)=>console.log('token expired please login again'))
    })

    // adding note to a todo by post method---------------------
    todos.post('/note/:id',checkToken,(req,res)=>{
        db.todos.update({
            note: req.body.note
        },{
            where: {id: req.params.id}
        })
        .then((data) => {
            db.todos.findAll({
                where: {id: req.params.id}
            })
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                res.send('error')
            })
        })
        .catch((err)=>{
            console.log('err in updating note to backend',err)
        })
        

        // console.log(req.params.id,req.body.note)
        // knex('todos')
        // .update({note:req.body.note})
        // .where('todos.id',req.params.id)
        // .then((data)=>{
        //     console.log('note updated to db',data)
        //     knex('todos')
        //     .select('*')
        //     .where('todos.id',req.params.id)
        //     .then((result)=>{
        //         res.send(result)
        //     })
        //     .catch((err)=>{
        //         res.send('error')
        //     })
        // })
        // .catch((err)=>{
        //     console.log('err in updating note to backend',err)
        // })
    })

}