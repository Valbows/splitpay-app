import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const GroupListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-text-primary">Your Groups</h1>
            <Link
              to={ROUTES.CREATE_GROUP}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Create Group
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-text-secondary text-center">
            You haven't created or joined any groups yet. Create a new group to get started!
          </p>
        </div>
      </main>
    </div>
  );
};

export default GroupListPage; 