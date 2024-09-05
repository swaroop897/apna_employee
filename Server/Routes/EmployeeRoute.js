import express from 'express'
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt'
import logger from '../logger/logger.js';


const router = express.Router()

router.post('/employee_login', (req, res) => {    
    const sql = "SELECT * from employee where email = ?"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: "fail", Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
                if (err) return res.json({ loginStatus: "fail", Error: "Wrong password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                    { role: "employee", email: email ,id:result[0].id},
                    "jwt_secrate_key",
                    { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: "true",id:result[0].id });
                }
            })
            
     
        } else {
            return res.json({ loginStatus: "fail", Error: "wrong email or password" });
        }
    });

});


router.use('/public',express.static('./public'))

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT employee.*, catagory.name as catagory_name 
                 FROM employee 
                 JOIN catagory ON employee.catagory_id = catagory.id 
                 WHERE employee.id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json(result[0]); 
    });
});


router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})

export {router as EmployeeRouter}