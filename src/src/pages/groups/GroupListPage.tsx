import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const GroupListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Link
          to={`${ROUTES.GROUPS}/new`}
          className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Create New Group
        </Link>
      </div>

      {/* Empty state */}
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No groups yet</p>
        <p className="text-sm text-muted-foreground">
          Create a group to start splitting expenses with your friends
        </p>
      </div>
    </div>
  );
};

export default GroupListPage; 