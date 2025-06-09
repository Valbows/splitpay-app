import React from "react";
import { useParams } from "react-router-dom";

const ExpenseDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Expense Details</h1>
      <p className="text-muted-foreground">Expense ID: {id}</p>
    </div>
  );
};

export default ExpenseDetailPage; 