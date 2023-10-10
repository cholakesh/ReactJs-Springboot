import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import './EmployeeForm.css';
import { useParams } from 'react-router-dom';
import EmployeesApi from './EmployeesApi';

const EmployeeFormUpd = () => {
  const params = useParams();
  const selectedId = params.id;
  const [existEmp, setExistEmp] = useState({});

  useEffect(() => {
    if (selectedId) EmployeesApi.getEmployeeDetails(selectedId, (data) => setExistEmp(data));
    else setExistEmp({ name: '', location: '', email: '', mobile: '' });
  }, [selectedId]);

  const handleSubmit = () => {
    const newEmployee = {
      name: existEmp.name,
      location: existEmp.location,
      email: existEmp.email,
      mobile: existEmp.mobile
    };
    EmployeesApi.saveNewEmployees(newEmployee);
    // resetForm();
    setExistEmp({ name: '', location: '', email: '', mobile: '' });
  };

  const handleEdit = () => {
    const empid = existEmp.id;
    EmployeesApi.updateEmployee(empid, existEmp);
    // resetForm();
    setExistEmp({ ...existEmp, name: '', location: '', email: '', mobile: '' });
  };

  //   const validationSchema = Yup.object({
  //     name: Yup.string().required('Employee name is required'),
  //     location: Yup.string().required('select a location'),
  //     email: Yup.string().email('Invalid Email').required('Employee email is required'),
  //     mobile: Yup.string()
  //       .matches(/^[0-9]{10}$/, 'Invalid mobile number')
  //       .required('Mobile number is required')
  //   });

  const handleChange = (evt) => {
    evt.preventDefault();
    // console.log(evt.target.value);
    setExistEmp({ ...existEmp, [evt.target.name]: evt.target.value });
  };

  return (
    <div className='form-container'>
      {selectedId ? <h1>Update employee details:</h1> : <h1>Add new employee details:</h1>}
      <form onSubmit={selectedId ? handleEdit : handleSubmit} action='/employees'>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='name'>Employee Name:</label>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={existEmp.name}
                    className='form-input'
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='location'>location:</label>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <select
                    id='location'
                    name='location'
                    className='form-input'
                    value={existEmp.location}
                    onChange={handleChange}
                    required>
                    <option value=''>Select a location</option>
                    <option value='Bangalore'>Bangalore</option>
                    <option value='Chennai'>Chennai</option>
                    <option value='Pune'>Pune</option>
                    <option value='Hyderabad'>Hyderabad</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='email'>Email:</label>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={existEmp.email}
                    className='form-input'
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='mobileNum'>Mobile number:</label>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <input
                    type='tel'
                    id='mobileNum'
                    name='mobile'
                    className='form-input'
                    value={existEmp.mobile}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default EmployeeFormUpd;
