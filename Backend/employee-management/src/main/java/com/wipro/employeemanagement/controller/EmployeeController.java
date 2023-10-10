package com.wipro.employeemanagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.employeemanagement.entity.Employee;
import com.wipro.employeemanagement.service.EmployeeService;

@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeService empService;
	
	@GetMapping("/getAllDetails")
	public ResponseEntity<List<Employee>> getAllEmployees(){
		return new ResponseEntity<>(empService.getAllEmployees(),HttpStatus.OK);
	}
	
	@PostMapping("/saveEmployee")
	public void saveEmployees(@RequestBody Employee newEmployee) throws Exception {
		empService.saveEmployees(newEmployee);
	}
	
	@DeleteMapping("/deleteEmployee/{employeeId}")
	public void deleteEmployee(@PathVariable("employeeId") Long id) throws Exception {
		empService.deleteEmployeeDetails(id);
	}
	
	@GetMapping("/getEmpDetail/{employeeId}")
	public ResponseEntity<Optional<Employee>> getEmployeeDetails(@PathVariable("employeeId") Long id) throws Exception{
		return new ResponseEntity<>(empService.getEmpDetails(id),HttpStatus.OK);
	}
	
	@PutMapping("/updateEmpDetails/{employeeId}")
	public void updateEmpDetails(@PathVariable("employeeId") Long id,@RequestBody Employee updEmp) {
		empService.updateEmpDetails(id,updEmp);
	}
}

