package com.vignesh.expencetracker.dto;

import java.time.LocalDate;
import com.vignesh.expencetracker.Entity.Category;


import com.vignesh.expencetracker.Entity.TransactionType;

public class TransactionRequest {
	
	    private long amount;
	    private TransactionType type;
	    private Category category;
	    private String description;
	    private LocalDate date;
	    private Long userId;
	    
	    
		public long getAmount() {
			return amount;
		}
		public void setAmount(long amount) {
			this.amount = amount;
		}
		public TransactionType getType() {
			return type;
		}
		public void setType(TransactionType type) {
			this.type = type;
		}
		public Category getCategory() {
			return category;
		}
		public void setCategory(Category category) {
			this.category = category;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public LocalDate getDate() {
			return date;
		}
		public void setDate(LocalDate date) {
			this.date = date;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		
		@Override
		public String toString() {
			return "TransactionRequest [amount=" + amount + ", type=" + type + ", category=" + category
					+ ", description=" + description + ", date=" + date + ", userId=" + userId + "]";
		}
		
		
	    
	    

}
