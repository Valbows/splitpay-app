import React from "react";
import { useParams } from "react-router-dom";

const GroupDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Group Details</h1>
      <p className="text-muted-foreground">Group ID: {id}</p>
    </div>
  );
};

export default GroupDetailPage; 