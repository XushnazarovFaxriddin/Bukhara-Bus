const express= require('express');
const app = express();
const hudud=require('./hudud');
const admin=require('./admin');
const bekat=require('./bekat');
const bus_bekat=require('./bus_bekat');
const bus_xys=require('./bus_xys');
const bus=require('./bus');

app.use('/admin',admin);
app.use('/hudud',hudud);
app.use('/bekat',bekat);
app.use('/bus',bus);
app.use('/bus_xys',bus_xys);
app.use('/bus_bekat',bus_bekat);

module.exports=app;