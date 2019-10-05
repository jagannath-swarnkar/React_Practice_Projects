var express = require('express');
var cors = require('cors')

const {DB_HOST,DB_USER,DB_PASS,DB_NAME} = require('./config').envdata;


var app = express();
app.use(express.json())
app.use(cors())


// creating connections for mySQL database with knex query ( with importing kenx query )
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host:DB_HOST,
      user:DB_USER,
      database:DB_NAME,
      password:DB_PASS
    },useNullAsDefault:true
});

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

app.get('/get',(req,res)=>{
    knex('Qbank')
    .then((ques)=>{
        console.log('all ques',ques);
        res.send(ques)
    })
})
app.get('/getAns',(req,res)=>{
    knex('Abank')
    .then((Ans)=>{
        console.log('all ans',Ans);
        res.send(Ans)
    })
})

app.post('/question',(req,res)=>{
    // console.log(req.body.Question)
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

app.post('/answer',(req,res)=>{
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


app.listen(PORT=1234,()=>{
    console.log('your app is running on port : ',PORT);
})