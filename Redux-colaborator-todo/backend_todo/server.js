var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
// const checkToken = require('./tokenvar');
const {DB_HOST,DB_USER,DB_PASS,DB_NAME} = require('./config').envdata;
var checkToken = require('./TokenVerify');

// creating connections for mysql with knex
const knex = require('knex')({
    client:'mysql',
    connection:{
        hsot:DB_HOST,
        user:DB_USER,
        database:DB_NAME,
        password:DB_PASS
    },useNullAsDefault:true
});

// creating table for user named `userdetail`
knex.schema.hasTable('userdetail').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('userdetail',(t)=>{
            t.increments('user_id').primary().unique().notNullable();
            t.string('username').notNullable();
            t.string('email').unique().notNullable();
            t.string('password');
        },()=>{
            console.log('userdetail table created successfuly');
        })
    }
})

// creating table for storing projects detail
knex.schema.hasTable('projects').then(function(exists){
    if(!exists){
        return knex.schema.createTable('projects', function (table) {
            table.increments('project_id').primary().notNullable();
            table.integer('user_id').notNullable();
            table.string('project_name').notNullable();
            table.string('description');
            table.string('user_name');
            table.string('user_email');
            table.dateTime('project_date');
          },()=>{
              console.log('projects table created successfully')
          })
    }
})

// creating table for storing table with project_id
knex.schema.hasTable('todos').then(function(exists){
    if(!exists){
        return knex.schema.createTable('todos', function (table) {
            table.increments('id').primary().notNullable();
            table.integer('project_id').notNullable();
            table.integer('user_id').notNullable();
            table.string('user_email').notNullable();
            table.string('text').notNullable();
            table.boolean('done').notNullable();
            table.string('assigned_to');
            table.string('note')
          },()=>{
              console.log('todos table created successfully')
          })
    }
})

knex.schema.hasTable('files').then(function(exists){
    if(!exists){
        return knex.schema.createTable('files', function (table) {
            table.integer('todo_id').notNullable();
            table.string('file')
          },()=>{
              console.log('files table created successfully')
          })
    }
})



// Creating routes for backend endpoints which are in routes folder-----

// endpoint for signup-----------------------
var signup = express.Router();
require('./Routes/Signup')(signup,knex);
app.use('/',signup)

// endpoint for login------------------------
var login = express.Router();
require('./Routes/Login')(login,knex,jwt);
app.use('/',login)

// endpoint for project detail table---------
var project = express.Router();
require('./Routes/Project')(project,knex,jwt,checkToken);
app.use('/',project)

// endpoint for todos------------------------
var todos = express.Router();
require('./Routes/Todos')(todos,knex,checkToken)
app.use('/',todos)

var fileUpload = express.Router();
require('./Routes/file-upload')(fileUpload,knex,checkToken)
app.use('/',fileUpload)


app.listen(PORT=3030,()=>{
    console.log('your app is running on PORT : ',PORT)
})