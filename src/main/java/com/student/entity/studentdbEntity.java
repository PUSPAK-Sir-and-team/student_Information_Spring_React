package com.student.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_admin")

public class studentdbEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int adminId;
	
    @JsonProperty("admin_name")
	private String adminName;
	
    @JsonProperty("admin_email")
	private String adminEmail;
	
    @JsonProperty("admin_phno")
	private long adminPhno;
	
    @JsonProperty("admin_img_url")
	private String adminImgUrl;
	
    @JsonProperty("admin_address")
	private String adminAddress;
	
    @JsonProperty("admin_addrproof_type")
	private String adminAddrproofType;
	
    @JsonProperty("admin_addrproof_num")
	private String adminAddrproofNum;

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
	
	
}
