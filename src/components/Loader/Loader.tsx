import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5E60CE] border-solid"></div>
    </div>
  );
};
