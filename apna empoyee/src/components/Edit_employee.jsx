import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const Edit_employee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        catagory_id: '',


    })
    const [catagory, setcatagory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/catagory')
            .then(result => {
                if (result.data.Status) {
                    setcatagory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    catagory_id: result.data.Result[0].catagory_id,


                })

            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+ id, employee)
        .then(result =>{
            if (result.data.Status) {
                navigate('/dashboard/employee')   
                
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit} >
                    <div className='col-12'>
                        <label for='inputname' className='form-lable'><strong>Name</strong></label>
                        <input
                            type='text'
                            className='form-control rounded-10'
                            id='inputname'
                            placeholder='Enter Name'
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
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
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}

                        />
                    </div>
                    <div className='col-12'>

                        <label for='inputSalary' className='form-lable'><strong>Salary</strong></label>
                        <input
                            type='text'
                            className='form-control rounded-10'
                            id='inputSalary'
                            placeholder='Enter Salary'
                            autoComplete='off'
                            value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}

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
                            value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}

                        />
                    </div>
                    <div className='col-12'>
                        <label for='catagory' className='form-lable'><strong>Catagory</strong></label>
                        <select name="catagory" id="catagory" className='form-select'
                            onChange={(e) => setEmployee({ ...employee, catagory_id: e.target.value })}
                        >
                            {
                                catagory.map(c => {
                                    return <option value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100 rounded-10'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit_employee