import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">App Settings</h2>
            <p className="text-gray-500">Settings will be available soon.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <p className="text-gray-500">No preferences available yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 