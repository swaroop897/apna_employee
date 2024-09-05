import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3 className='m-0'>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>E-mail</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th> {/* New column for category */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><img src={`http://localhost:3000/Images/` + e.image} className='employeeImage' alt='employee'/></td>
                  <td>
                    <a href={`mailto:${e.email}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                      {e.email}
                    </a>
                  </td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>{e.catagory_name}</td> {/* Display category name */}
                  <td>
                    <Link to={`/dashboard/edit_employee/` + e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
