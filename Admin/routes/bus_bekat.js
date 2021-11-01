const express = require('express');
const router=express.Router();
const pool=require('../db');

router.get('/', function(req, res){
    const h=req.body;
    console.log(h);
    pool.query('SELECT * FROM bus_xys;',(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error:true,
                message: "Serverda xatolik",
                data:{rows:[]} 
            });
        }
        console.log(rows.rows);
        return res.json({
            error: false,
            message: `Hammasi joyida :)`,
            data:{
                rows:rows.rows
            }
        });
    });
});

module.exports =router;