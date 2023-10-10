package com.wipro.employeemanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.wipro.employeemanagement.entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Long>{
	
	public void deleteById(Long id);

	@Modifying
	@Transactional
	@Query(value="UPDATE EMPLOYEE SET NAME = ?2 , EMAIL = ?3 , LOCATION = ?4 , MOBILE = ?5 WHERE ID=?1 ;",nativeQuery = true)
	public void updateEmpById(Long id, String name, String email, String location, String mobile);
	

}
