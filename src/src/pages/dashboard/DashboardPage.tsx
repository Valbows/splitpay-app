import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Groups */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Groups</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">No groups yet</p>
            <Link 
              to={ROUTES.GROUPS}
              className="inline-block text-primary hover:text-primary/80"
            >
              View all groups →
            </Link>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">No expenses yet</p>
            <Link 
              to={ROUTES.EXPENSES}
              className="inline-block text-primary hover:text-primary/80"
            >
              View all expenses →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              to={ROUTES.GROUPS}
              className="block w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-center hover:bg-primary/90"
            >
              Create New Group
            </Link>
            <Link 
              to={ROUTES.EXPENSES}
              className="block w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-center hover:bg-primary/90"
            >
              Add New Expense
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 