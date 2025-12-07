package com.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.entity.studentdbEntity;

public interface studentRepository extends JpaRepository<studentdbEntity, Long> { 

	
}
