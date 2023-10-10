// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import EmployeesList from './component/EmployeesList';
// import EmployeeForm from './component/EmployeeForm';
import EmployeeFormUpd from './component/EmployeeFormUpd';
import EmployeeDetails from './component/EmployeeDetails';
// import { EmployeesListClass } from './component/EmployeeListClass';

function App() {
  class Links extends Component {
    render() {
      return (
        <nav>
          <NavLink to='/employees'>Employees List</NavLink>&emsp;&emsp;
          <NavLink to='/addEmployees'>Add Employee</NavLink>
        </nav>
      );
    }
  }

  return (
    <Router>
      <div className='App'>
        <h1>Employee Management System</h1>
        <Links />
        <Routes>
          <Route path='/employees' Component={EmployeesList} />
          <Route path='/addEmployees' Component={EmployeeFormUpd} />
          <Route path='/addEmployees/:id' Component={EmployeeFormUpd} />
          <Route path='/employeeDetails/:id' Component={EmployeeDetails} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
