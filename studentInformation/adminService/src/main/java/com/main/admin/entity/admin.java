package com.main.admin.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_admin")
@Data //for getter and setter 
@NoArgsConstructor //for default constructor
@AllArgsConstructor // for all other constructors

public class admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="admin_id")
	private Integer adminId;
	
	@Column(name="admin_name")
	private String adminName;
	
	
	@Column(name="admin_email")
	private String email;
	
	@Column(name="admin_phno")
	private Long phone;
	
	@Column(name="admin_img_url")
	private String adminUrl;
	
	@Column(name="admin_address")
	private String address;
	
	@Column(name="admin_addrproof_num")
	private String addressProof;
	
	@Column(name="admin_addrproof_type")
	private String addressProofType;

}
