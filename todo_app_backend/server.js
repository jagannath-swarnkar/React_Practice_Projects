const express = require('express');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const checkToken = require('./tokenvar');

// creating database........
let db = new sqlite3.Database('Todo',(err)=>{
    if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database`tododb`')
      }
})

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./tododb"
    },useNullAsDefault:true
});
// creating table for storing todos
knex.schema.hasTable('todo').then(function(exists){
    if(!exists){
        return knex.schema.createTable('todo', function (table) {
            table.increments('id').primary().notNullable();
            table.integer('userId').notNullable();
            table.string('text').notNullable();
            table.boolean('done').notNullable();
          })
    }
})
// insert into userdetail(email,password) values("jagan@gmail.com", "123asd!@#ASD");

// creating user detail table 
knex.schema.hasTable('userdetail').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('userdetail',(t)=>{
            t.increments('userId').primary().unique().notNullable();
            t.string('name').notNullable();
            t.string('email').unique().notNullable();
            t.string('password').notNullable();
        },()=>{
            console.log('userdetail table created successfuly');
        })
    }
})

var app = express();
app.use(express.json())
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
	next();
  });

app.get('/get',checkToken,(req,res)=>{    
    jwt.verify(req.token,process.env.SECRET,(err,authData)=>{
        if(!err){                     
            knex('todo')
            .where('todo.userId',authData.userId)
            .then((result)=>{
                // console.log('result',result,authData.userId);

                if(result.length>0){
                    res.json(result)
                }
                })
            .catch((err)=>{console.log(err)});
        }
    })
})
 


app.post('/post',checkToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET,(err,authData)=>{
        if(!err){
            req.body.data.userId = authData.userId;
            knex('todo')
            .insert(req.body.data)
            .then(() => {console.log('data inserted',req.body.data),
                    knex('todo')
                    .where('todo.userId',authData.userId)
                    .then((result)=>{
                        if(result.length>0){
                            console.log('updated todo has sent to backend',result);
                            res.send(result)
                        }
                        })
                    .catch((err)=>{console.log(err)});
                })
            .catch(err => console.log(err));
        }    
    })   
})

app.put('/put/:id',checkToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET,(err,authData)=>{
        let text = req.body.text;          
        knex('todo')
        .where('todo.userId',authData.userId).andWhere('todo.id',req.body.id)
        .update({text:text})
        .then((data) =>{console.log('database data',data);})
        .catch((err)=>console.log(err))
    })
})

app.put('/done/:id',checkToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET,(err,authData)=>{
        if(!err){
            knex('todo')
            .where('todo.id',req.body.id).andWhere('todo.userId',authData.userId)
            .update({done:req.body.done})
            .then(() => console.log('done updated in db'))
            .catch((err)=>{res.send('err')})
        }
    })
    

})
  

// Post method for signup page / inserting user detail into database
app.post('/signup',(req,res)=>{
    console.log(req.body);
    knex('userdetail')
        .insert({name:req.body.name,email:req.body.email,password:req.body.password1})
        .then(()=>{console.log('user signup detail has saved to database successfyly');
            knex('userdetail')
            .where('userdetail.email',req.body.email)
            .then((result)=>{
                console.log(result);
                
                res.send(result)
            })
           .catch((err)=>console.log(err)
           ) 
            })
        .catch((err)=>{console.log('err in inserting signup detail of user into database',err),res.send('err')})
    
})

// post method for login page verifying login data to signup data and Creating JWT token
app.post('/login',(req,res)=>{    
    knex('userdetail')
    .where('userdetail.email',req.body.email)
    .then((data)=>{        
        if(data.length>0){   
            if(data[0].password===req.body.password){
        jwt.sign(data[0], process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if(!err){
                // res.clearCookie("key");
                // res.cookie(token.toString());
                res.send(token.toString())
                // console.log('email exists , login successfuly',data,'Token          : ',token);
            }else{console.log('some err in sending token in cookie'),err;
            }
            })
        }else{console.log('wrong password'),res.send('wrongPass')}
        }else{console.log('user does not exists please signup first');res.send('err')}
    })
    .catch((err)=>{console.log(err);
    })
})

app.post('/delete/:id',(req,res)=>{
    knex('todo')
    .del()
    .where('todo.id',req.body.id)
    .then((data)=>{
        knex('todo').select('*').where('todo.userId',3).then((result)=>{console.log(result);res.send(result)}).catch((err)=>console.log(err))
        // res.send(result)
    })
    .catch((err)=>{console.log('err in deleting data in backend',err)})
})

app.listen(PORT=8080,()=>{
    console.log("Your backend is working on port : ",PORT);
})
