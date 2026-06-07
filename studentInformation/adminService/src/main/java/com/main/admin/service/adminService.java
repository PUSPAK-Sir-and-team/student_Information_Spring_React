package com.main.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.admin.entity.admin;
import com.main.admin.repository.adminRepo;

@Service
public class adminService {
	
	@Autowired
	private adminRepo refRepo;
	
	
	public admin create(admin obj) {
		return refRepo.save(obj);
	}

	public Optional<admin> getAdminById(Integer id) {
		return refRepo.findById(id);
	}
	
	public List<admin> getAllAdmin()
	{
		return refRepo.findAll();
	}
	
	public void deleteAdmin(Integer id)
	{
		 refRepo.deleteById(id);
	}
	
	public admin updateAdmin(Integer id, admin updatedAdmin)
	{
	    Optional<admin> existingAdmin = refRepo.findById(id);

	    if(existingAdmin.isPresent())
	    {
	        admin adminData = existingAdmin.get();

	        // Update fields
	        adminData.setAdminName(updatedAdmin.getAdminName());
	        adminData.setEmail(updatedAdmin.getEmail());
	        adminData.setPhone(updatedAdmin.getPhone());
	        adminData.setAdminUrl(updatedAdmin.getAdminUrl());
	        adminData.setAddressProof(updatedAdmin.getAddress());
	        adminData.setAddressProof(updatedAdmin.getAddressProof());
	        adminData.setAddressProofType(updatedAdmin.getAddressProofType());
	        

	        return refRepo.save(adminData);
	    }
	    else
	    {
	        throw new RuntimeException("Admin not found with id : " + id);
	    }
	}

}
