import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Catagory() {
  const [catagory,setcatagory]=useState([])
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
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3 className='m-0'>Catagory List</h3>
        
      </div>
      <Link to="/dashboard/add_catagory" className="btn btn-success">Add Catagory</Link>
      <div className='mt-3'>
         <table className='table'>
          <thead>
             <tr>
                 <th>Name</th>
             </tr>
          </thead>
          <tbody>
             {
               catagory.map(c =>(
                <tr>
                    <td>{c.name}</td>
                </tr>
               ))
             }
          </tbody>
         </table>
      </div>
    </div>
  )
}

export default Catagory