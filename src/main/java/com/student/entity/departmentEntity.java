package com.student.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_dept")

public class departmentEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "dept_no")
	private int deptno;

	@Column(name="dept_name")
	private String deptName;

	@Column(name="dept_capacity")
	private int deptCapacity;

	@Column(name="dept_loc")
	private String deptLoc;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "admin_id") 
	private studentdbEntity adminId;


	public int getDeptno() {
		return deptno;
	}

	public void setDeptno(int deptno) {
		this.deptno = deptno;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public int getDeptCapacity() {
		return deptCapacity;
	}

	public void setDeptCapacity(int deptCapacity) {
		this.deptCapacity = deptCapacity;
	}

	public String getDeptLoc() {
		return deptLoc;
	}

	public void setDeptLoc(String deptLoc) {
		this.deptLoc = deptLoc;
	}

	public studentdbEntity getAdminId() {
		return adminId;
	}

	public void setAdminId(studentdbEntity adminId) {
		this.adminId = adminId;
	}







}
