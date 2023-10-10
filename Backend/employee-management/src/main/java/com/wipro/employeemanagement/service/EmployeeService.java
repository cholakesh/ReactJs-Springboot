package com.wipro.employeemanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.employeemanagement.entity.Employee;
import com.wipro.employeemanagement.repo.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepo empRepo;
	
	public List<Employee> getAllEmployees(){
		List<Employee> employees=empRepo.findAll();
		return employees;
	}

	public void saveEmployees(Employee newEmployee) throws Exception {
		try {
			empRepo.save(newEmployee);
		}
		catch(Exception e) {
			throw new Exception("Invalid data");
		}
		
	}

	public void deleteEmployeeDetails(Long id) throws Exception {
		try {
			empRepo.deleteById(id);
		}
		catch(Exception e) {
			throw new Exception("Invalid ID provided");
		
		}
		
	}

	public Optional<Employee> getEmpDetails(Long id) {
		Optional<Employee> emp=empRepo.findById(id);
		return emp;
	}

	public void updateEmpDetails(Long id, Employee updEmp) {
		empRepo.updateEmpById(id,updEmp.getName(),updEmp.getEmail(),updEmp.getLocation(),updEmp.getMobile());		
	}
}
