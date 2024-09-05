import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Home = () => {
  const [adminTotal, setadminTotal] = useState()
  const [employeeTotal, setemployeeTotal] = useState()
  const [salaryTotal, setsalaryTotal] = useState()
  const [admins, setadmins] = useState([])

  useEffect(() => {
    admincount();
    employeecount();
    salarycount();
    Adminrecords();
  }, [])

  const Adminrecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setadmins(result.data.Result)
        }
      })
  }

  const admincount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setadminTotal(result.data.Result[0].admin)
        }
      })
  }

  const employeecount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }

  const salarycount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setsalaryTotal(result.data.Result[0].salary)
        }
      })
  }

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total :</h5>
            <h5> {adminTotal} </h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total :</h5>
            <h5> {employeeTotal} </h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total :</h5>
            <h5>₹ {salaryTotal}  </h5>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr key={a.email}>
                  <td>
                    <a href={`mailto:${a.email}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                      {a.email}
                    </a>
                  </td>
                  <td>
                    
                    <button className='btn btn-success btn-sm me-2'>Online</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
