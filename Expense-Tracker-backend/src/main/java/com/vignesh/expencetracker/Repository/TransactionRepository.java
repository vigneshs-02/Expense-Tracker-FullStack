package com.vignesh.expencetracker.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vignesh.expencetracker.Entity.Transaction;
import com.vignesh.expencetracker.Entity.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
	List<Transaction> findByUser_Id(Long userId);

	List<Transaction> findByUser_IdAndType(Long userId, TransactionType type);
 
} 
