const express = require('express');
var mysql = require ('mysql');

var connection = mysql.createConnection
({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port:'3306',
    database:'saglik'
})

connection.connect(function(err){
    if (err) throw err;
    console.log('db connected');
});

module.exports = connection;