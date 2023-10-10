import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeesApi from './EmployeesApi';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const params = useParams();
  const employeeId = parseInt(params.id, 10);

  useEffect(() => {
    EmployeesApi.getEmployeeDetails(employeeId, (data) => setEmployee(data));
  }, [employeeId]);

  return (
    <div>
      <h2>Employee Details</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{employee.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{employee.location}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <td>Mobile:</td>
            <td>{employee.mobile}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeDetails;
