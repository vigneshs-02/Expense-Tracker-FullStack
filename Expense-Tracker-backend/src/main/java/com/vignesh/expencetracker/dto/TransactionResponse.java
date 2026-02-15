package com.vignesh.expencetracker.dto;

import java.time.LocalDate;
import com.vignesh.expencetracker.Entity.Category;

import com.vignesh.expencetracker.Entity.TransactionType;

public class TransactionResponse {
	
	    private Long id;
	    private long amount;
	    private TransactionType type; 
	    private Category category;
	    private String description;
	    private LocalDate date;
	    
		public TransactionResponse(Long id, long amount, TransactionType type, Category category, String description,
				LocalDate date) {
			super();
			this.id = id;
			this.amount = amount;
			this.type = type;
			this.category = category;
			this.description = description;
			this.date = date;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

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
	    
		
	    


}
