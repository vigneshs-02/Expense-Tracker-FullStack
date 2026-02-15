package com.vignesh.expencetracker.dto;

public class DashboardSummaryResponse {
	
	private long totalIncome;
    private long totalExpense;
    private long balance;
    
	public DashboardSummaryResponse(long totalIncome, long totalExpense, long balance) {
		super();
		this.totalIncome = totalIncome;
		this.totalExpense = totalExpense;
		this.balance = balance;
	}

	public long getTotalIncome() {
		return totalIncome;
	}

	public void setTotalIncome(long totalIncome) {
		this.totalIncome = totalIncome;
	}

	public long getTotalExpense() {
		return totalExpense;
	}

	public void setTotalExpense(long totalExpense) {
		this.totalExpense = totalExpense;
	}

	public long getBalance() {
		return balance;
	}

	public void setBalance(long balance) {
		this.balance = balance;
	}
	
	
    
    

}
