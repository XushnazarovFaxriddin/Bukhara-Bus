const express = require('express');
const router=express.Router();
const pool=require('../db');

// Barcha hududlar ro'yxati.
// shunchaki get so'rov yuboriladi.
router.get('/', (req,res)=>{
    let h=req.body;
    console.log(h);
    // barcha hududlar ro'yxatini bazadan olish
    pool.query(`SELECT * FROM hudud;`,(err,rows,fields)=>{
        if(err){
            console.log(err)
            console.error("Datatbase Connections Error!");
            return res.json({
                error: true,
                message:`Serverda xatolik`,
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


// Yangi hudud qo'shish
// {uz_name,ru_name,en_name} ko'rinishidagi json post so'rovida yuboriladi.
router.post('/',(req,res) => {
    let h=req.body;
    console.log(h);
    const {uz_name,ru_name,en_name}=h;
    //yuborilgan malumotlarni to'liqlikka tekshirish
    if(!(uz_name && ru_name && en_name))
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    // yuborilgan malumotlardan yangi hudud qo'shish
    pool.query(`INSERT INTO hudud(uz_name, ru_name, en_name) VALUES($1, $2, $3);`,
                [uz_name,ru_name,en_name], function(err, rows, fields){
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
            data:{rows:rows.rows[rows.rows.length-1]}
        });
    });
});

// Mavjud hududni o'chirish
// { id=5 } ko'rinishidagi json delete so'rovida yuboriladi.
router.delete('/',function(req,res){
    let h=req.body;
    console.log(h);
    // yuborilgan id yoqligini tekshirish
    if(!h.id)
        return res.json({
            error: true,
            message:`Yuborilgan ma'lumot yetarli emas!`,
            data:{rows:[]}
        });
    // yuborilgan id dagi hudud malumotlarini olish.
    pool.query(`SELECT * FROM hudud WHERE id=$1;`,[h.id],(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error: true,
                message:`Serverda xatolik`,
                data:{rows:[]}
            });     
        }
        // yuborilgan id bazada yoqligini tekshirish
        if(rows.rows.length==0)
            return res.json({
                error: true,
                message:`${h.id}-ID ga ega hudud mavjud emas!`,
                data:{rows:[]}
            });
        // yuborilgan bazada mavjud id dagi hududni o'chirish
        pool.query(`DELETE FROM hudud WHERE id=$1`,[h.id],(err1,rows1, fields1)=>{
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
                message:`${h.id}-IDga ega hudud o'chirildi.`,
                data:{rows:[]}
            });
        });
    });
    
});

//Mavjud hududni yangilash
// {id,uz_name,ru_name,en_name} ko'rinishidagi json put so'rovida yuboriladi.
router.put('/', (req,res)=>{
    let h=req.body;
    console.log(h);
    const {id,uz_name,ru_name,en_name}=h;
    //yuborilgan malumotlarni to'liqlikka tekshirish
    if(!(id && uz_name && ru_name && en_name))
        return res.json({
            error: true,
            message:"Yuborilgan ma'lumot yetarli emas!",
            data:{rows:[]}
        });
    // yuborilgan id dagi hudud malumotlarini olish.
    pool.query(`SELECT * FROM hudud WHERE id=$1;`,[id],(err,rows, fields)=>{
        if(err){
            console.error(err);
            return res.json({
                error: true,
                message:"Serverda xatolik",
                data:{rows:[]}
            });
        }
        // yuborilgan id bazada yoqligini tekshirish
        if(rows.rows.length==0)
            return res.json({
                error:true,
                message:`${id}-IDga ega hudud mavjud emas!`,
                data:{rows:[]}
            });
        // yuborilgan bazada mavjud id dagi hudud nomlarini yangilash
        pool.query(`UPDATE hudud SET uz_name=$1, ru_name=$2, en_name=$3 WHERE id=$4`,
            [uz_name, ru_name, en_name, id], function(err1,rows1, fields1){
                if(err1){
                    console.error(err1);
                    return res.json({
                        error: true,
                        message:"Serverda xatolik",
                        data:{rows:[]}
                    });
                }
                console.log(rows1.rows);
                return res.json({
                    error: false,
                    message:`${h.id}-ID dagi hudud nomlari yangilandi.`,
                    data:{rows:[]}
                });
            });
    });
});


module.exports =router;