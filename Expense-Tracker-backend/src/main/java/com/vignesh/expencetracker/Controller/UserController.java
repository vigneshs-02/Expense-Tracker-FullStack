package com.vignesh.expencetracker.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vignesh.expencetracker.Entity.User;
import com.vignesh.expencetracker.Service.UserService;
import com.vignesh.expencetracker.dto.LoginRequest;
import com.vignesh.expencetracker.dto.LoginResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5177")
public class UserController {
	
	@Autowired
	private UserService userService; 
	
	@PostMapping("/register")
	public User createuser(@Valid @RequestBody User user) {
		return userService.createUser(user);  
	}
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest request) {  
	    return userService.login(request.getEmail(), request.getPassword());
	}

}
 