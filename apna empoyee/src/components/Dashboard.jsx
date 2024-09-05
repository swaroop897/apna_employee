import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  axios.defaults.withCredentials = true;

  const handleLogoutClick = () => {
    setShowLogoutModal(true); 
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); 
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false); 
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        console.log(result.data);
        if (result.data.Status) {
          console.log("Navigating to /adminlogin");
          localStorage.removeItem('valid')
          navigate('/');
        }
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Apna Employee
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="w-100">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/catagory" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Catagory</span>
                </Link>
              </li>
           
              <li onClick={handleLogoutClick}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>APNA EMPLOYEE</h4>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelLogout}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmLogout}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
