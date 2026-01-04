package com.student.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.studentdbEntity;
import com.student.repository.studentRepository;

@Service
public class studentService {
	
	@Autowired
	private studentRepository repo;
	
	public studentdbEntity addStudent(studentdbEntity entity)
	{
		return repo.save(entity);
	}
	
	public List<studentdbEntity> getAllStudents()
	{
		return repo.findAll();
	}
	
	public Optional<studentdbEntity> getStudentsByID(int id)
	{
		return repo.findById((long) id);
	}
	
	public studentdbEntity updateStudentByID(int id,studentdbEntity newDataObj)
	{
		Optional<studentdbEntity> studDB=repo.findById((long) id);
		
		if(studDB.isPresent())
		{
			studentdbEntity existingStudOBj=studDB.get();
			
			existingStudOBj.setAdminAddress(newDataObj.getAdminAddress());
			existingStudOBj.setAdminAddrproofNum(newDataObj.getAdminAddrproofNum());
			existingStudOBj.setAdminAddrproofType(newDataObj.getAdminAddrproofType());
			existingStudOBj.setAdminEmail(newDataObj.getAdminEmail());
			existingStudOBj.setAdminImgUrl(newDataObj.getAdminImgUrl());
			existingStudOBj.setAdminName(newDataObj.getAdminName());
			existingStudOBj.setAdminPhno(newDataObj.getAdminPhno());
			
			return repo.save(existingStudOBj);
		}
		
		else
		{
			throw new RuntimeException("User Not found!! " + id);
		}
	}
	
	public void deleteStudentById(Long id)
	{
		Optional<studentdbEntity> existingStudent=repo.findById(id);
		
		if(existingStudent.isPresent())
		{
			repo.deleteById(id);
		}
		else
		{
			throw new RuntimeException("User Not found!! " + id);
		}
	}

}
