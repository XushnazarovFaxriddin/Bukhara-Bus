const express = require('express');
const router=express.Router();
const pool=require('../db');

//admin login va parolini tekshirish
// {login, parol} ko'rinishidagi json get so'rovida yuboriladi.
router.get('/', function(req, res){
    let h=req.body;
    console.log(h);
    pool.query(`SELECT * FROM admin;`,(err,rows, fields)=>{
        if(err){
            console.log(err);
            return res.json({code: 500, success: "Serverda xatolik."});
        }
        //console.log(rows.rows);
        const {login, parol}=rows.rows[0];
        if(h.login==login && h.parol==parol) {
            return res.status(200).send('Tizimga xush kelibsiz.');
        }
        return res.status(500).send('login yoki parol xato!');
    });
});


module.exports =router;