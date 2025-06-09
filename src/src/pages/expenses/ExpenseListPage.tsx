import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const ExpenseListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Link
          to={`${ROUTES.EXPENSES}/new`}
          className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Add New Expense
        </Link>
      </div>

      {/* Empty state */}
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No expenses yet</p>
        <p className="text-sm text-muted-foreground">
          Add an expense to start tracking your shared costs
        </p>
      </div>
    </div>
  );
};

export default ExpenseListPage; 