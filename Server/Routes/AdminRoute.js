import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt'
import multer from "multer";
import path from 'path';
import logger from '../logger/logger.js';

const router = express.Router()   
 //admin login api 
router.post('/adminlogin', (req, res) => {    
    const sql = "SELECT * from admin where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json({ loginStatus: "fail", Error: "Query error" });}
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email ,id:result[0].id},
                "jwt_secrate_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token)
            logger.info(`login successfull ,${req.body.email}`)
            return res.json({ loginStatus: "true" });
        } else {
            logger.error(`login failed ,${req.body.email}`)
            return res.json({ loginStatus: "fail", Error: "wrong email or password" });
        }
    });

});

// catagory 
router.get('/catagory', (req, res) => {
    const sql = "SELECT * FROM catagory";
    
    con.query(sql, (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error fetching categories: ${err.message}`);
            return res.json({ Status: false, Error: "Query error" });
        }
        
        // Log the successful query
        logger.info('featched category data successfully');
        return res.json({ Status: true, Result: result });
    });
});

// add catagory
router.post('/add_catagory', (req, res) => {
    const sql = "INSERT INTO catagory (`name`) VALUES (?)";
    
    con.query(sql, [req.body.catagory], (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error adding category: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }
        
        // Log the successful insertion
        logger.info(`Category added successfully: ${req.body.catagory}`);
        return res.json({ Status: true });
    });
});

//uplooad image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

//end image

//add employee
router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, address, salary, image, catagory_id) VALUES(?)`;

    // Hash the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            // Log the error if password hashing fails
            logger.error(`Error hashing password for employee ${req.body.name}: ${err.message}`);
            return res.json({ Status: false, Error: "Password hashing error: " + err.message });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.catagory_id
        ];

        // Execute the SQL query to insert employee data
        con.query(sql, [values], (err, result) => {
            if (err) {
                // Log the error if the query fails
                logger.error(`Error adding employee ${req.body.name}: ${err.message}`);
                return res.json({ Status: false, Error: "Query error: " + err.message });
            }

            // Log the successful insertion
            logger.info(`Employee added successfully: ${req.body.name}`);
            return res.json({ Status: true });
        });
    });
});

// join to display catagory 
router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, catagory.name as catagory_name 
                 FROM employee 
                 JOIN catagory ON employee.catagory_id = catagory.id`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json({ Status: true, Result: result });
    });
});


router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee  WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" })
        return res.json({ Status: true, Result: result })
    })
})
// update api
router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee SET name = ?,email = ?,salary = ?,address =?,catagory_id=? Where id =?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.catagory_id,

    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error updating employee with ID ${id}: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        // Log the successful update
        logger.info(`Employee updated successfully: ID ${id}, Name: ${req.body.name}, Category ID: ${req.body.catagory_id}`);
        return res.json({ Status: true, Result: result });
    });
});
// delete api
 router.delete('/delete_employee/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'DELETE from employee WHERE id=?'
    con.query(sql, [id], (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error deleting employee with ID ${id}: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        if (result.affectedRows === 0) {
            // Log if no employee was found to delete
            logger.warn(`Attempted to delete employee with ID ${id}, but no record was found.`);
            return res.json({ Status: false, Error: `No employee found with ID ${id}` });
        }

        // Log the successful deletion
        logger.info(`Employee deleted successfully: ID ${id}`);
        return res.json({ Status: true, Result: result });
    });
});

//admin count
router.get('/admin_count', (req, res) => {
    const sql = 'SELECT count(id) as admin FROM admin';

    // Execute the SQL query to count the number of admins
    con.query(sql, (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error fetching admin count: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        // Log the successful retrieval of the admin count
        logger.info(`Admin count retrieved successfully: ${result[0].admin}`);
        return res.json({ Status: true, Result: result });
    });
});

//employee count
router.get('/employee_count', (req, res) => {
    const sql = 'SELECT count(id) as employee FROM employee';

    // Execute the SQL query to count the number of employees
    con.query(sql, (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error fetching employee count: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        // Log the successful retrieval of the employee count
        logger.info(`Employee count retrieved successfully: ${result[0].employee}`);
        return res.json({ Status: true, Result: result });
    });
});

//salary count
router.get('/salary_count', (req, res) => {
    const sql = 'SELECT SUM(salary) as salary FROM employee';

    // Execute the SQL query to calculate the total salary
    con.query(sql, (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error fetching total salary: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        // Log the successful retrieval of the total salary
        logger.info(`Total salary retrieved successfully: ₹${result[0].salary}`);
        return res.json({ Status: true, Result: result });
    });
});

//admin records

router.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM admin";

    // Execute the SQL query to fetch all admin records
    con.query(sql, (err, result) => {
        if (err) {
            // Log the error if the query fails
            logger.error(`Error fetching admin records: ${err.message}`);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }

        // Log the successful retrieval of admin records
        logger.info(`Admin records retrieved successfully. Number of records: ${result.length}`);
        return res.json({ Status: true, Result: result });
    });
});

//loout
router.get('/logout', (req, res) => {
    logger.info('Logout request received');
  
    try {
      // Clear the token cookie
      res.clearCookie('token');
  
      logger.info('Token cleared successfully');
  
      // Return success response
      return res.json({ Status: true });
    } catch (error) {
      logger.error('Error during logout:', error);
      return res.status(500).json({ Error: 'An unexpected error occurred' });
    }
  });
export { router as adminRouter }