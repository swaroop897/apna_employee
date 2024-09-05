import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Start = () => {
    const navigate = useNavigate()
   
  useEffect(()=>{
      axios.get('http://localhost:3000/verify', { withCredentials: true })
      .then(result=>{
        if (result.data.Status) {
          if (result.data.role==="admin") {
              navigate('/dashboard')
          }else{
            navigate('/employee_detail/'+result.data.id)
          }
        }
      }).catch(err => console.log(err))
  },[])

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-4 rounded w-25 border loginForm'>

                <h2 className="text-center">Login As</h2>
                <div className="d-flex justify-content-between mt-5 mb-2 ">
                    <button type="button" className="btn btn-primary me-5"
                    onClick={()=>{ navigate('/employee_login')}}
                    >Emoployee</button>
                    <button type="button" className="btn btn-success ms-5"
                    onClick={()=>{ navigate('/adminlogin')}}
                    >Admin</button>
                </div>

            </div>
        </div>
    )
}

export default Start
