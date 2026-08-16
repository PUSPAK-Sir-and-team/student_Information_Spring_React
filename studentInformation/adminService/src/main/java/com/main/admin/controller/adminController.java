package com.main.admin.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.main.admin.entity.admin;
import com.main.admin.service.adminService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/library/admin")
public class adminController {
	
	@Autowired
	private adminService srvObj;
	
	//insert record
	@PostMapping(path="/save-admin")
	public admin createLibraryAdmin(@RequestBody admin libObj)
	{
		return srvObj.create(libObj) ;
	}
	
	//select record by id
	
	@GetMapping(path="/get-admin/{id}")
	public Optional<admin> findByAdminId(@PathVariable Integer id)
	{
		return srvObj.getAdminById(id);   
	}
	
	@GetMapping(path="/get-all-admin")
	public List<admin> findByAllAdmin()
	{
		return srvObj.getAllAdmin();   
	}
	
	@DeleteMapping(path="/delete-admin/{id}")
	public void deleteAdmin(@PathVariable Integer id)
	{
		srvObj.deleteAdmin(id);
		
		
	}
	
	@PutMapping(path="/update-admin/{id}")
	public admin updateAdmin(@PathVariable Integer id,
	                         @RequestBody admin adminObj)
	{
	    return srvObj.updateAdmin(id, adminObj);
	}

}
