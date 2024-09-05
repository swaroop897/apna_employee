import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const [value,setvalue]=useState({
    email:'',
    password:''

})
const [error,setError]=useState(null)
const navigate=useNavigate()
axios.defaults.withCredentials=true;
const handleSubmit = (event)=>{      
      event.preventDefault()
      axios.post('http://localhost:3000/auth/adminlogin', value )
      .then(result => {
        if (result.data.loginStatus === "true") {
            localStorage.setItem('valid',true)
            navigate('/dashboard');
        } else {
            setError(result.data.Error || "Login failed");
        }
    })
    .catch(err => {
        console.error(err);
        setError("An error occurred during login.");
    });
};

  return (
    <div className='d-flex justify-content-center loginPage'>
        <div className='p-4 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type='email' name='email' autoComplete='off' placeholder='Enter Email' 
                    onChange={(e)=>setvalue({...value,email : e.target.value})}    className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password:</strong></label>
                    <input type='password' name='password' placeholder='Enter Password' 
                     onChange={(e)=>setvalue({...value,password : e.target.value})}       className='form-control rounded-0'/>
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
              
            </form>
        </div>
    </div>
  )
}

export default Login
