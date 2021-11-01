const express = require('express');
const router=express.Router();
const pool=require('../db');
//id , uz_name, ru_name, en_name, x, y, hudud_id 

router.get('/', function(req, res){
    const h=req.body;
    pool.query(`SELECT * FROM bekat;`,(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error: true,
                message:"Serverda xatolik",
                data:{rows:[]}
            });
        }
        console.log(rows.rows);
        return res.json({
            error: false,
            message:"Hammasi joyida.",
            data:{rows:rows}
        })
    });
});

router.post('/', function(req, res) {
    const h=req.body;
    console.log(h);
    const {uz_name, ru_name, en_name, x, y, hudud_id}=h;
    if(!(uz_name&&ru_name&&en_name&&x&&y&&hudud_id)){
        console.log('yuborilgan ma\'lumot yetarli emas.');
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    }
    pool.query(`INSERT INTO bekat(uz_name,ru_name,en_name, x, y, hudud_id) VALUES($1,$2,$3,$4,$5,$6)`,
        [uz_name, ru_name, en_name, x, y, hudud_id],(err,rows, fields)=>{
            if(err){
                console.error(err)
                return res.json({
                    error: true,
                    message: "Serverda xatolik",
                    data:{rows:[]}
                });
            }
            console.log(rows.rows[rows.rows.length-1]);
            return res.json({
                error: false,
                message:"Yangi bekat yaratildi",
                data:{rows:rows.rows[rows.rows.length-1]}
            });
        });
});

router.delete('/', function(req, res){
    const h=req.body;
    console.log(h);
    const {id}=h;
    if(!id){
        console.log('yuborilgan ma\'lumot yetarli emas.');
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    }
    pool.query('SELECT * FROM bekat WHERE id = $1',[id],(err,rows, fields)=>{
        if(err){
            console.error(err)
            return res.json({
                error: true,
                message: "Serverda xatolik",
                data:{rows:[]}
            });    
        }
        if(rows.rows.length==0){
            return res.json({
                error: true,
                message:`${h.id}-ID ga ega hudud mavjud emas!`,
                data:{rows:[]}
            });
        }
        pool.query('DELETE FROM bekat WHERE id=$1',[id],(err1,rows1, fields1)=>{
            if(err1){
                console.error(err1)
                return res.json({
                    error: true,
                    message: "Serverda xatolik",
                    data:{rows:[]}
                });    
            }
            console.log(rows1.rows);
            return res.json({
                error: false,
                message:`${h.id}-IDga ega hudud o'chirildi.`,
                data:{rows:[]}
            });
        });
    });
})

module.exports =router;