import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link 
        to={ROUTES.DASHBOARD}
        className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage; 