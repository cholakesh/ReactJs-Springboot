import axios from 'axios';

export default class EmployeesApi {
  static getAllEmployees(cb) {
    axios
      .get('http://localhost:8082/getAllDetails')
      .then((response) => cb(response.data))
      .catch((error) => {
        throw error;
      });
  }

  static saveNewEmployees(newEmployee) {
    axios
      .post('http://localhost:8082/saveEmployee', newEmployee)
      .then((response) => {
        console.log(response.data); // Handle the response data
      })
      .catch((error) => {
        console.error(error); // Handle the error
      });
  }

  static deleteEmployee(employeeId) {
    axios
      .delete('http://localhost:8082/deleteEmployee/' + employeeId)
      .then((response) => {
        console.log(response.data); // Handle the response data
      })
      .catch((error) => {
        console.error(error); // Handle the error
      });
  }

  static getEmployeeDetails(employeeId, cb) {
    axios
      .get('http://localhost:8082/getEmpDetail/' + employeeId)
      .then((response) => cb(response.data))
      .catch((error) => {
        throw error;
      });
  }

  static updateEmployee(id, employee) {
    try {
      axios.put(`http://localhost:8082/updateEmpDetails/${id}`, employee);
      // fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  }
}
