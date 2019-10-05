const express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
// var jwt = requie('jsonwebtoken');
const configData = require('./config');

const {DB_NAME,DB_HOST,DB_USER,SECRETE,DB_PASS} = configData.envdata;

// creating connection for mysql database with knex query
var knex = require('knex')({
    client:'mysql',
    connection:{
        host:DB_HOST,
        user:DB_USER,
        database:DB_NAME,
        password:DB_PASS
    }
});

// creating user detail table to store signup detail
knex.schema.hasTable('userdetail').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('userdetail',(t)=>{
            t.string('name');
            t.increments('userId').primary().notNullable();
            t.string('email').unique().notNullable();
            t.string('password');
            t.string('image')
        })
    }
})

// Creating table for storing Questions with Q_id.
knex.schema.hasTable('Qbank')
.then((exists)=>{
    if(!exists){
        return knex.schema.createTable('Qbank',(q)=>{
            q.increments('Q_id').primary().notNullable();
            q.string('question').notNullable().unique();
        })
    }
})

// Creating table for storing answers of the questions with Q_id and A_id.
knex.schema.hasTable('Abank')
.then((exists)=>{
    if(!exists){
        return knex.schema.createTable('Abank',(a)=>{
            a.increments('A_id').primary().notNullable();
            a.integer('Q_id').notNullable();
            a.longtext('answer');
        })
    }
})


var signup=express.Router();
require('./Routes/Signup')(signup,knex);
app.use('/',signup);

var login  = express.Router();
require('./Routes/Login')(login,knex);
app.use('/',login);

var ques = express.Router();
require('./Routes/GetQues')(ques,knex);
app.use('/',ques)

var ans = express.Router();
require('./Routes/GetAns')(ans,knex);
app.use('/',ans);

var postQues=express.Router();
require('./Routes/PostQues')(postQues,knex);
app.use('/',postQues);

var postAns = express.Router();
require('./Routes/PostAns')(postAns,knex);
app.use('/',postAns);

app.listen(4000);