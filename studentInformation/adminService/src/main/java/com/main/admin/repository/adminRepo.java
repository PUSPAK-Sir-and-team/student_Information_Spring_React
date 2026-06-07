package com.main.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.admin.entity.admin;

public interface adminRepo extends JpaRepository<admin, Integer> {

}
