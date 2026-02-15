package com.vignesh.expencetracker.Repository;

import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;

import com.vignesh.expencetracker.Entity.User;

public interface UserRepository extends JpaRepository<User, Long>{  
	
	Optional<User> findByEmail(String email);
}
