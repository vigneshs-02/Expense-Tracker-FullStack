package com.vignesh.expencetracker.Controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vignesh.expencetracker.Entity.Transaction;
import com.vignesh.expencetracker.Service.TransactionService;
import com.vignesh.expencetracker.dto.DashboardSummaryResponse;
import com.vignesh.expencetracker.dto.TransactionRequest;
import com.vignesh.expencetracker.dto.TransactionResponse;

@RestController 
@RequestMapping("/api/transactions")
public class TransactionController {
	
	@Autowired 
	private TransactionService tranService; 
	
	    @PostMapping("/addtransaction")
	    public Transaction save(@RequestBody TransactionRequest request) {
	        return tranService.createTransaction(request);
	    }
	    
	    @GetMapping("/user/{userId}")
	    public List<TransactionResponse> getUserTransactions(@PathVariable Long userId) {
	        return tranService.getTransactionsByUser(userId); 
	    }
	     
	    @GetMapping("/dashboard/summary/{userId}")
	    public DashboardSummaryResponse getDashboardSummary(@PathVariable Long userId) {
	        return tranService.getDashboardSummary(userId);
	    }
	    
	    @PutMapping("/{transactionId}/user/{userId}")
	    public Transaction updateTransaction(
	            @PathVariable Long transactionId,
	            @RequestParam Long userId,
	            @RequestBody TransactionRequest request) {

	        return tranService.updateTransaction(transactionId, userId, request); 
	    }
	    
	    @DeleteMapping("/deletTransaction/{transactionId}")
	    public String deleteTransaction(
	            @PathVariable Long transactionId,
	            @RequestParam Long userId
	    ) {
	    	tranService.deleteTransaction(transactionId, userId);
	        return "Transaction deleted successfully";
	    }
	    
}
  