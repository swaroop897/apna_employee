import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Addcatagory() {
    const[catagory,setcatagory]=useState()
    const navigate=useNavigate()
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_catagory',{catagory})
        .then(result=> {
            if (result.data.Status) {
                navigate('/dashboard/catagory')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-4 rounded w-25 border'>
            
            <h2>Add Catagory</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='catagory'><strong>Catagory:</strong></label>
                    <input type='text' name='catagory' placeholder='Enter Catagory' 
                    onChange={(e)=>setcatagory(e.target.value) }    className='form-control rounded-0'/>
                </div>
           
                <button type='submit' className='btn btn-success w-100 rounded-0'> Add Catagory</button>
                
            </form>
        </div>
    </div>
  )
}

export default Addcatagory