package com.student.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_admin")

public class studentdbEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="admin_id")
	private int adminId;
	
	@Column(name="admin_name")
	private String adminName;
	
	@Column(name="admin_email")
	private String adminEmail;
	
	@Column(name="admin_phno")
	private long adminPhno;
	
	@Column(name="admin_img_url")
	private String adminImgUrl;
	
	@Column(name="admin_address")
	private String adminAddress;
	
	@Column(name="admin_addrproof_type")
	private String adminAddrproofType;
	
	@Column(name="admin_addrproof_num")
	private String adminAddrproofNum;
    
	@JsonManagedReference
    @OneToMany(mappedBy = "adminId", cascade = CascadeType.ALL)
    private List<departmentEntity> department;

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

	public long getAdminPhno() {
		return adminPhno;
	}

	public void setAdminPhno(long adminPhno) {
		this.adminPhno = adminPhno;
	}

	public String getAdminImgUrl() {
		return adminImgUrl;
	}

	public void setAdminImgUrl(String adminImgUrl) {
		this.adminImgUrl = adminImgUrl;
	}

	public String getAdminAddress() {
		return adminAddress;
	}

	public void setAdminAddress(String adminAddress) {
		this.adminAddress = adminAddress;
	}

	public String getAdminAddrproofType() {
		return adminAddrproofType;
	}

	public void setAdminAddrproofType(String adminAddrproofType) {
		this.adminAddrproofType = adminAddrproofType;
	}

	public String getAdminAddrproofNum() {
		return adminAddrproofNum;
	}

	public void setAdminAddrproofNum(String adminAddrproofNum) {
		this.adminAddrproofNum = adminAddrproofNum;
	}

	public List<departmentEntity> getDepartment() {
		return department;
	}

	public void setDepartment(List<departmentEntity> department) {
		this.department = department;
	}

	
	
	
}
