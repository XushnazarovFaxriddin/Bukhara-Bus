const express = require('express');
const router=express.Router();
const pool=require('../db');

//barcha bus'lar ro'yxatini olish.
router.get('/', function(req, res){
    const h=req.body;
    console.log(h);
    pool.query(`SELECT * FROM bus;`,(err,rows, fields)=>{
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
            message: `Hammasi joyida :)`,
            data:{
                rows:rows.rows
            }
        });
    })
});

router.post('/', function(req, res){
    const h=req.body;
    console.log(h);
    const {hudud_id, name}=h;
    if(!(hudud_id && name)){
        console.log('yuborilgan ma\'lumot yetarli emas.');
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    }
    pool.query(`INSERT INTO bus(hudud_id, name) VALUES ($1, $2)`, 
        [hudud_id, name], function(err, rows, fields){
            if(err){
                console.error(err);
                return res.json({
                    error: true,
                    message:`Serverda xatolik`,
                    data:{rows:[]}
                });
            }
            console.log(rows.rows[rows.rows.length-1]);
            return res.json({
                error: false,
                message:"Yangi hudud yaratildi",
                data:{rows:rows.rows[rows.rows.length-1]},
            });
    });
});

router.put('/', function(req, res){
    const h=req.body;
    const {id,hudud_id,name}=h;
    if(!(id&&hudud_id&&name)){
        console.log('yuborilgan ma\'lumot yetarli emas.');
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    }
    pool.query(`SELECT * FROM bus WHERE id=$1`,[id],(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error: true,
                message:`Serverda xatolik`,
                data:{rows:[]}
            });    
        }
        if(rows.rows.length==0){
            return res.json({
                error: true,
                message:`${id}-IDga ega bus mavjud emas!`,
                data:{rows:[]}
            });
        }
        pool.query(`UPDATE bus SET hudud_id=$1, name=$2 WHERE id=$3`,
            [hudud_id, name, id],(err1,rows1, fields1)=>{
                if(err1){
                    console.error(err);
                    return res.json({
                        error: true,
                        message:`Serverda xatolik`,
                        data:{rows:[]}
                    });       
                }
                console.log(rows1.rows);
                return res.json({
                    error: false,
                    message:`${id}-ID da bus malumotlari yangilandi`,
                    data:{rows:rows1.rows}
                })
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
    pool.query(`SELECT * FROM bus WHERE id=$1`,[id],(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error: true,
                message:`Serverda xatolik`,
                data:{rows:[]}
            });     
        }
        if(rows.rows.length==0){
            return res.json({
                error: true,
                message:`${id}-IDga ega bus mavjud emas!`,
                data:{rows:[]}
            });
        }
        pool.query(`DELETE FROM bus WHERE id=$1`,[id],(err1,rows1, fields1)=>{
            if(err1){
                console.error(err1);
                return res.json({
                    error: true,
                    message:`Serverda xatolik`,
                    data:{rows:[]}
                });     
            }
            console.log(rows1.rows);
            return res.json({
                error: false,
                message:`${id}-IDga ega hudud o'chirildi.`,
                data:{rows:[]}
            });
        });
    });
});

module.exports =router;