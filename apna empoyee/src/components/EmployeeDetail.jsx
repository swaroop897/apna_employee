import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeDetail.css'; // Import your CSS file

function EmployeeDetail() {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => setEmployee(result.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem('valid');
          navigate('/');
        }
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h4>Employee Detail</h4>
      </div>
      <div className="image-container">
        {employee.image && (
          <img
            src={`http://localhost:3000/Images/` + employee.image}
            className="emp_det_image"
            alt="Employee"
          />
        )}
      </div>
      <div className="details">
        <h3>Name: <span>{employee.name}</span></h3>
        <h3>E-mail: <span>{employee.email}</span></h3>
        <h3>Category: <span>{employee.catagory_name}</span></h3> {/* Display category name */}
        <h3>Salary: <span>₹ {employee.salary}</span></h3>
        <h3>Address: <span>{employee.address}</span></h3>
      </div>
      <div className="btn-container">
        <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
  );
}

export default EmployeeDetail;
