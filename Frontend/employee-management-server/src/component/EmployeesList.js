import React, { useState, useEffect } from 'react';
// import EmployeesJsonApi from './EmployeesJsonApi';
import { Link } from 'react-router-dom';
import EmployeesApi from './EmployeesApi';

const EmployeesList = () => {
  const [state, setState] = useState({
    employees: []
  });

  const [employeesCopy, setEmployeesCopy] = useState([]);

  useEffect(() => {
    setEmployeesCopy(state.employees);
  }, [state.employees]);

  const [filText, setFilText] = useState('');

  useEffect(() => {
    handleChange();
  }, [filText]);

  useEffect(() => {
    EmployeesApi.getAllEmployees((data) => setState({ employees: data }));
  }, []);

  const deleteEmployee = (employeeId) => {
    EmployeesApi.deleteEmployee(employeeId);
    const findEmployees = state.employees.filter((emp) => emp.id !== employeeId);
    setState({ employees: findEmployees });
  };

  //Search box
  function handleChange() {
    const findEmployees = state.employees.filter((emp) =>
      emp.name.toLowerCase().includes(filText.toLowerCase())
    );
    setEmployeesCopy(findEmployees);
  }

  return (
    <div>
      <br />
      <label>Filter by:</label>
      <br />
      <input
        type='text'
        name='filText'
        value={filText}
        onChange={(e) => setFilText(e.target.value)}
        placeholder='Search...'
      />
      <br />
      <p>Total number of employees: {employeesCopy.length}</p>
      <br />

      <table border={1} className='table'>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeesCopy.length ? (
            employeesCopy.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Link to={'/employeeDetails/' + employee.id}>{employee.id}</Link>
                </td>
                <td>{employee.name}</td>
                <td>{employee.location}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>
                  <Link to={'/addEmployees/' + employee.id}>Edit{employee.id}</Link>
                </td>
                <td>
                  <Link onClick={() => deleteEmployee(employee.id)}>Delete{employee.id}</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeesList;
