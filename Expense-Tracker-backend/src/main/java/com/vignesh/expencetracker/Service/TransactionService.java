package com.vignesh.expencetracker.Service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vignesh.expencetracker.Entity.Transaction;
import com.vignesh.expencetracker.Entity.User;
import com.vignesh.expencetracker.ExpenseTrackerBackendApplication;
import com.vignesh.expencetracker.Repository.TransactionRepository;
import com.vignesh.expencetracker.Repository.UserRepository;
import com.vignesh.expencetracker.dto.TransactionRequest;
import com.vignesh.expencetracker.dto.TransactionResponse;
import com.vignesh.expencetracker.exception.ResourceNotFoundException;
import com.vignesh.expencetracker.exception.UnauthorizedActionException;
import com.vignesh.expencetracker.Entity.Category;

import com.vignesh.expencetracker.Entity.TransactionType;
import com.vignesh.expencetracker.dto.DashboardSummaryResponse;

@Service
public class TransactionService {

    private final ExpenseTrackerBackendApplication expenseTrackerBackendApplication;
	
	@Autowired
	private TransactionRepository transactionRepo;
	
	@Autowired
	private UserRepository userRepo;

    TransactionService(ExpenseTrackerBackendApplication expenseTrackerBackendApplication) {
        this.expenseTrackerBackendApplication = expenseTrackerBackendApplication;
    }
	
	public Transaction createTransaction(TransactionRequest request) {
		
		TransactionType type = request.getType();
		Category category = request.getCategory();

		if (type == TransactionType.INCOME) {
		    if (!(category == Category.SALARY ||
		          category == Category.BUSINESS ||
		          category == Category.FREELANCE ||
		          category == Category.INTEREST ||
		          category == Category.OTHER)) {
		        throw new RuntimeException("Invalid income category");
		    }
		}

		if (type == TransactionType.EXPENSE) {
		    if (!(category == Category.FOOD ||
		          category == Category.RENT ||
		          category == Category.TRAVEL ||
		          category == Category.SHOPPING ||
		          category == Category.OTHERS)) {
		        throw new RuntimeException("Invalid expense category");
		    }
		}


        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = new Transaction();
         
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType()); 
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate());
        transaction.setUser(user);

        return transactionRepo.save(transaction); 
    }
	
	public List<TransactionResponse> getTransactionsByUser(Long userId) {
	    return transactionRepo.findByUser_Id(userId)
	            .stream()
	            .map(t -> new TransactionResponse (
	                    t.getId(),  
	                    t.getAmount(),
	                    t.getType(),
	                    t.getCategory(),
	                    t.getDescription(),
	                    t.getDate()
	            ))
	            .toList(); 
	}
	
	public DashboardSummaryResponse getDashboardSummary(Long userId) {

	    long totalIncome = transactionRepo
	            .findByUser_IdAndType(userId, TransactionType.INCOME)
	            .stream()
	            .mapToLong(Transaction::getAmount)
	            .sum();

	    long totalExpense = transactionRepo
	            .findByUser_IdAndType(userId, TransactionType.EXPENSE)
	            .stream()
	            .mapToLong(Transaction::getAmount)
	            .sum();

	    long balance = totalIncome - totalExpense;

	    return new DashboardSummaryResponse(totalIncome, totalExpense, balance);
	}
	
	
	public Transaction updateTransaction(
	        Long transactionId,
	        Long requestUserId,
	        TransactionRequest request) {

	    // 1. Fetch transaction
	    Transaction transaction = transactionRepo.findById(transactionId)
	            .orElseThrow(() -> new RuntimeException("Transaction not found"));

	    // 2. OWNERSHIP CHECK
	    Long ownerId = transaction.getUser().getId();

	    if (!ownerId.equals(requestUserId)) {
	        throw new RuntimeException("You are not allowed to update this transaction");
	    }

	    // 3. Business validation
	    TransactionType type = request.getType();
	    Category category = request.getCategory();

	    if (type == TransactionType.INCOME && category != Category.OTHER) {
	        throw new RuntimeException("Income must use OTHER category");
	    }

	    // 4. Update fields
	    transaction.setAmount(request.getAmount());
	    transaction.setType(type);
	    transaction.setCategory(category);
	    transaction.setDescription(request.getDescription());
	    transaction.setDate(request.getDate());

	    // 5. Save
	    return transactionRepo.save(transaction);
	} 
	
	public void deleteTransaction(Long transactionId, Long userId) {

	    if (userId == null) {
	        throw new RuntimeException("UserId is required");
	    }

	    Transaction transaction = transactionRepo.findById(transactionId)
	        .orElseThrow(() -> new RuntimeException("Transaction not found"));

	    if (!Objects.equals(transaction.getUser().getId(), userId)) {
	        throw new UnauthorizedActionException("You are not allowed to delete this transaction");
	    }

	    transactionRepo.delete(transaction);
	}

}
