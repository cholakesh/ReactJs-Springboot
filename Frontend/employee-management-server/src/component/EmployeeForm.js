import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EmployeeForm.css';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Redirect } from 'react-router-dom';
import EmployeesApi from './EmployeesApi';

const EmployeeForm = () => {
  const params = useParams();
  const selectedId = params.id;
  const [existEmp, setExistEmp] = useState({});
  let initialData;

  if (selectedId) {
    initialData = {
      name: existEmp.name,
      location: existEmp.location,
      email: existEmp.email,
      mobile: existEmp.mobile
    };
    EmployeesApi.getEmployeeDetails(selectedId, (data) => setExistEmp(data));
  } else {
    initialData = { name: '', location: '', email: '', mobile: '' };
  }

  // console.log(selectedId);c
  // console.log(initialValues);

  const handleSubmit = (values, { resetForm }) => {
    const newEmployee = {
      ...values
    };
    EmployeesApi.saveNewEmployees(newEmployee);
    resetForm();
    return <Redirect to='/employees' />;
  };

  const handleEdit = (values, { resetForm }) => {
    const empid = existEmp.id;
    const updatedEmployee = {
      id: empid,
      ...values
    };
    EmployeesApi.updateEmployee(empid, updatedEmployee);
    resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Employee name is required'),
    location: Yup.string().required('select a location'),
    email: Yup.string().email('Invalid Email').required('Employee email is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required')
  });

  return (
    <div className='form-container'>
      {selectedId ? <h1>Update employee details:</h1> : <h1>Add new employee details:</h1>}
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={selectedId ? handleEdit : handleSubmit}>
        <Form>
          {console.log(Formik.initialValues)}
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='name'>Employee Name:</label>
                </td>
                <td>
                  <div style={{ display: 'flex' }}>
                    <Field type='text' id='name' name='name' className='form-input' />
                    <ErrorMessage name='name' component='div' className='error' />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='location'>location:</label>
                </td>
                <td>
                  <div style={{ display: 'flex' }}>
                    <Field
                      as='select'
                      id='location'
                      name='location'
                      className='form-input'
                      required>
                      <option value=''>Select a location</option>
                      <option value='Bangalore'>Bangalore</option>
                      <option value='Chennai'>Chennai</option>
                      <option value='Pune'>Pune</option>
                      <option value='Hyderabad'>Hyderabad</option>
                    </Field>
                    <ErrorMessage name='location' component='div' className='error' />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='email'>Email:</label>
                </td>
                <td>
                  <div style={{ display: 'flex' }}>
                    <Field type='text' id='email' name='email' className='form-input' />
                    <ErrorMessage name='email' component='div' className='error' />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='mobileNum'>Mobile number:</label>
                </td>
                <td>
                  <div style={{ display: 'flex' }}>
                    <Field
                      type='tel'
                      id='mobileNum'
                      name='mobile'
                      className='form-input'
                      required={true}
                    />
                    <ErrorMessage name='mobile' component='div' className='error' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default EmployeeForm;
