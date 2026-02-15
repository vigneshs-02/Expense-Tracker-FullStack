package com.vignesh.expencetracker.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vignesh.expencetracker.Entity.User;
import com.vignesh.expencetracker.Repository.UserRepository;
import com.vignesh.expencetracker.dto.LoginResponse;

@Service
public class UserService {
	
	@Autowired 
	private UserRepository userRepo; 
	
	public LoginResponse login(String email, String password) {
 
	    User user = userRepo.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Invalid email"));

	    if (!user.getPassword().equals(password)) {
	        throw new RuntimeException("Invalid password");
	    }

	    return new LoginResponse(
	    		user.getId(),
	    		user.getName(),
	    		user.getEmail()
	    );
	}
	
	 public User createUser(User user) {
		 
		 if (userRepo.findByEmail(user.getEmail()).isPresent()) { 
	            throw new RuntimeException("Email already exists");
	        }
		 
		 return userRepo.save(user); 
	 }


}
