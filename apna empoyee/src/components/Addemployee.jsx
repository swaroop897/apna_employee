import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Addemployee() {
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        catagory_id:'',
        image:''

    })
    const [catagory,setcatagory]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3000/auth/catagory')
        .then(result =>{
          if (result.data.Status) {
            setcatagory(result.data.Result);
          }else{
            alert(result.data.Error)
          }
        }).catch(err => console.log(err))
  
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', employee.name)
        formData.append('email', employee.email)
        formData.append('password', employee.password)
        formData.append('address', employee.address)
        formData.append('salary', employee.salary)
        formData.append('image', employee.image)
        formData.append('catagory_id', employee.catagory_id)

        axios.post('http://localhost:3000/auth/add_employee',formData)
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label for='inputname' className='form-lable'><strong>Name</strong></label>
                        <input 
                        type='text'
                         className='form-control rounded-10'
                         id='inputname'
                         placeholder='Enter Name'
                         onChange={(e)=> setEmployee({...employee, name: e.target.value})}             
                         />
                    </div>
                    <div className='col-12'>
                        <label for='inputEmail4' className='form-lable'><strong>E-mail</strong></label>
                        <input 
                        type='email'
                         className='form-control rounded-10'
                         id='inputEmail4'
                         placeholder='Enter E-mail'
                         autoComplete='off' 
                         onChange={(e)=> setEmployee({...employee, email: e.target.value})}             

                         />
                    </div>
                    <div className='col-12'>
                        <label for='inputPassword4' className='form-lable'><strong>Password</strong></label>
                        <input 
                        type='password'
                         className='form-control rounded-10'
                         id='inputPassword4'
                         placeholder='Enter Password'
                         onChange={(e)=> setEmployee({...employee, password: e.target.value})}             

                                      
                         />
                        <label for='inputSalary' className='form-lable'><strong>Salary</strong></label>
                        <input 
                        type='text'
                         className='form-control rounded-10'
                         id='inputSalary'
                         placeholder='Enter Salary'
                         autoComplete='off'
                         onChange={(e)=> setEmployee({...employee, salary : e.target.value})}             

                         />
                    </div>
                    <div className='col-12'>
                        <label for='inputAddress' className='form-lable'><strong>Address</strong></label>
                        <input 
                        type='text'
                         className='form-control rounded-10'
                         id='inputEmail4'
                         placeholder='A/P City, House number, Street name, Pin code '
                         autoComplete='off' 
                         onChange={(e)=> setEmployee({...employee, address: e.target.value})}             

                         />
                    </div>
                    <div className='col-12'>
                        <label for='catagory' className='form-lable'><strong>Catagory</strong></label>
                        <select name="catagory" id="catagory" className='form-select'
                         onChange={(e)=> setEmployee({...employee, catagory_id: e.target.value})}             
                         >
                            {
                                catagory.map(c => {
                                    return <option value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='col-12'>
                        <label className='form-lable' for='inputGroupFile01'><strong>Select Image</strong></label>
                        <input 
                        type='file'
                         className='form-control rounded-10'
                         id='inputGroupFile01'
                         name='image'
                         onChange={(e)=> setEmployee({...employee, image : e.target.files[0]})}             

                                      
                         />
                    </div>
                    <div className='col-12'>
                    <button type='submit' className='btn btn-primary w-100 rounded-10'> Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addemployee