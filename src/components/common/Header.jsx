import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';

/**
 * Header component with navigation and branding
 */
const Header = ({ currentView, onBackToClasses }) => {
  return (
    <header className="bg-white shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-lg shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                SmartAttendance
              </h1>
              <p className="text-sm text-purple-600">Secure Geo-Sound & Visual QR System</p>
            </div>
          </div>
          {currentView !== 'classList' && (
            <button
              onClick={onBackToClasses}
              className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Classes</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
