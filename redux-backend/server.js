var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

// creating connections for mysql with knex
const knex = require('knex')({
    client:'mysql',
    connection:{
        hsot:'localhost',
        user:'root',
        database:'demodb',
        password:'jagan@jagan',
    },useNullAsDefault:true
});

// creating table for storing table with project_id
knex.schema.hasTable('todos').then(function(exists){
    if(!exists){
        return knex.schema.createTable('todos', function (table) {
            table.increments('id').primary()
            table.string('text').notNullable();
            table.boolean('done').notNullable();
          },()=>{
              console.log('todos table created successfully')
          })
    }
})

app.post('/todo',(req,res)=>{
    knex('todos')
    .insert({
        text:req.body.text,
        done:req.body.done
    })
    .then((data)=>{
        knex('todos')
        .select('*')
        .then((result)=>{
            res.json(result)
        })
        .catch(err => res.json({status_code:404,"message":err}))
    })
    .catch((err)=>{
        console.log('err in inserting todo into db',err)
    })
})


app.listen(PORT=3030,()=>{
    console.log('your app is running on PORT : ',PORT)
})