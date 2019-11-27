const express = require('express');
const router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

module.exports = (db,fileUpload,knex,checkToken)=>{
    fileUpload.post('/file-upload/:id',(req,res)=>{
        console.log('todo_id :',req.params.id)
        singleUpload(req,res,(err)=>{
            if(err){
                return res.status(422).send({errors:[{title:"file upload error",detail:err.message}]})
            }
            db.files.create({
                todo_id: req.params.id,
                file: req.file.location
            })
            .then((data) =>{
                console.log("Url uploaded into database")
                db.files.findAll({
                    attributes: ['file'],
                    where: {todo_id: req.params.id}
                })
                .then((result)=>{
                    console.log('result',result)
                    res.json(result)
                })
                .catch((err)=>{
                    console.log({status:404,message:"err in fetching url from database",Error:err})
                })
            })
            .catch((err)=>{
                console.log('error in inserting url into dagabaase',err)
            })



            // knex('files')
            // .insert({
            //     todo_id:req.params.id,
            //     file:req.file.location
            // })
            // .then((data)=>{
            //     console.log('url uploaded into database',data)
            //     knex('files')
            //     .select('file')
            //     .where('files.todo_id',req.params.id)
                // .then((result)=>{
                //     res.json(result)
                // })
                // .catch((err)=>{
                //     console.log({status:404,message:"err in fetching url from database",Error:err})
                // })
            // })
            // .catch((err)=>{
            //     console.log('error in inserting url into dagabaase',err)
            // })
        })
    })

    // getting all urls of a todo.............
    fileUpload.get('/getFiles/:id',(req,res)=>{
        db.files.findAll({
            attributes: ['file'],
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            console.log('result',result)
            res.json(result)
        })
        .catch((err)=>{
            console.log({status:404,message:"err in fetching url from database",Error:err})
        })

        // knex('files')
        //     .select('file')
        //     .where('files.todo_id',req.params.id)
        //     .then((result)=>{
        //         res.json(result)
        //     })
        //     .catch((err)=>{
        //         console.log({status:404,message:"err in fetching url from database",Error:err})
        //     })
    })

    // adding comment to a todo and updating to comment table
    fileUpload.post('/comment:id',(req,res)=>{
        db.comments.create({
            todo_id: req.params.id,
            comment: req.body.comment
        })
        .then((data) => {
            db.comments.findAll({
                raw: true,
                where: {todo_id: req.params.id}
            })
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                console.log('err in getting all comments from db',err)
            })
        })


        // console.log(req.body)
        // knex('comments')
        // .insert({todo_id:req.params.id,comment:req.body.comment})
        // .then((data)=>{
        //     knex('comments')
        //     .select('*')
        //     .where('comments.todo_id',req.params.id)
        //     .then((result)=>{
        //         res.send(result)
        //     })
        //     .catch((err)=>{console.log('err in getting all comments from db',err)})
        // })
        // .catch((err)=>{console.log('err in inserting comment to db',err)})
    })

    // getting comment in in will mount 
    fileUpload.get('/comment:id',(req,res)=>{
        db.comments.findAll({
            raw: true,
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log('err in getting all comments from db',err)
        })

        // knex('comments')
        // .select('*')
        // .where('comments.todo_id',req.params.id)
        // .then((result)=>{
        //     res.send(result)
        // })
        // .catch((err)=>{console.log('err in getting all comments from db',err)})
    })

    // posting subComments
    fileUpload.post('/subComment/:id/:comment_id',(req,res)=>{
        db.subComments.create({
            todo_id: req.params.id,
            subComment: req.body.subComment,
            comment_id: req.params.comment_id
        })
        .then((data) => {
            db.subComments.findAll({
                raw: true,
                where: {todo_id: req.params.id}
            })
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                console.log('err in getting all subComments from db',err)
            })
        })




        // knex('subComments')
        // .insert({todo_id:req.params.id,subComment:req.body.subComment,comment_id:req.params.comment_id})
        // .then((data)=>{
        //     knex('subComments')
        //     .select('*')
        //     .where('subComments.todo_id',req.params.id)
        //     .then((result)=>{
        //         res.send(result)
        //     })
        //     .catch((err)=>{console.log('err in getting all subComments from db',err)})
        // })
        // .catch((err)=>{console.log('err in inserting subComment to db',err)})
    })

    fileUpload.get('/getSubComment:id',(req,res)=>{
        db.subComments.findAll({
            raw: true,
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log('err in getting all subComments from db',err)
        })


        // console.log(req.params.id);
        
        // knex('subComments')
        //     .select('*')
        //     // .where('subComments.todo_id',req.params.id)
        //     .then((result)=>{
        //         console.log('.........',result);
                
        //         res.send(result)
        //     })
        //     .catch((err)=>{console.log('err in getting all subComments from db',err)})
        })
} 