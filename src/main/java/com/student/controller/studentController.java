package com.student.controller;

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

import com.student.entity.studentdbEntity;
import com.student.service.studentService;

@RestController
@RequestMapping("/api/student")

public class studentController {
	@Autowired 
	private studentService service;
	
	@PostMapping
	
	public studentdbEntity addStudent(@RequestBody studentdbEntity StudentDBEntity)
	{
		return service.addStudent(StudentDBEntity);
	}
	
	@GetMapping
	
	public List<studentdbEntity> getAllStudents()
	{
		List<studentdbEntity> allStudent=service.getAllStudents();
		
		return allStudent;
	}
	
    @GetMapping("/{id}")
	
	public Optional<studentdbEntity> getStudentsByID(@PathVariable int id)
	{
		Optional<studentdbEntity> studentById=service.getStudentsByID(id);
		
		return studentById;
	}
	
	@PutMapping("/{id}")
	
	public studentdbEntity updateStudentByID(@PathVariable int id,@RequestBody studentdbEntity newDataObj)
	{
		studentdbEntity updateById=service.updateStudentByID(id,newDataObj);
		
		return updateById;
	}
	
	@DeleteMapping("/{id}")
	
	public String deleteStudentById(@PathVariable Long id)
	{
		service.deleteStudentById(id);
		return "Student deleted successfully!!!";
	}
	

}
