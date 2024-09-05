import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import { Home } from './components/Home';
import Catagory from './components/Catagory';
import Profile from './components/Profile';
import Employee from './components/Employee';
import Addcatagory from './components/Addcatagory';
import Addemployee from './components/Addemployee';
import Edit_employee from './components/Edit_employee';
import Start from './components/Start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDetail from './components/EmployeeDetail';
import { useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {  


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Start/>}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail/>}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute>
            <Dashboard/>  
        </PrivateRoute>       
        }>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/catagory' element={<Catagory/>}></Route>
        <Route path='/dashboard/add_catagory' element={<Addcatagory/>}></Route>
        <Route path='/dashboard/add_employee' element={<Addemployee/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<Edit_employee/>}></Route>



      </Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;