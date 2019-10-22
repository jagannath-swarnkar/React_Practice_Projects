const express = require('express');
const router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

module.exports = (fileUpload,knex,checkToken)=>{
    fileUpload.post('/file-upload/:id',(req,res)=>{
        console.log(req.params.id)
        singleUpload(req,res,(err)=>{
            if(err){
                return res.status(422).send({errors:[{title:"file upload error",detail:err.message}]})
            }
            knex('files')
            .insert({
                todo_id:req.params.id,
                file:req.file.location
            })
            .then((data)=>{
                console.log('url uploaded into database',data)
                knex('files')
                .select('file')
                .where('files.todo_id',req.params.id)
                .then((result)=>{
                    res.json(result)
                })
                .catch((err)=>{
                    console.log({status:404,message:"err in fetching url from database",Error:err})
                })
            })
            .catch((err)=>{
                console.log('error in inserting url into dagabaase',err)
            })
        })
    })

    // getting all urls of a todo.............
    fileUpload.get('/getFiles/:id',(req,res)=>{
        knex('files')
            .select('file')
            .where('files.todo_id',req.params.id)
            .then((result)=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log({status:404,message:"err in fetching url from database",Error:err})
            })
    })
} 