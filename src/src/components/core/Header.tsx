import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to={ROUTES.DASHBOARD} className="text-xl font-bold">
            SplitPay
          </Link>
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.GROUPS} className="text-foreground/80 hover:text-foreground">
              Groups
            </Link>
            <Link to={ROUTES.EXPENSES} className="text-foreground/80 hover:text-foreground">
              Expenses
            </Link>
            <Link to={ROUTES.SETTINGS} className="text-foreground/80 hover:text-foreground">
              Settings
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 