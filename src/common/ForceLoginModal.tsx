import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ForceLoginModalProps {
  isOpen: boolean;
  userEmail: string;
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ForceLoginModal: React.FC<ForceLoginModalProps> = ({
  isOpen,
  userEmail,
  userName,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in">
       
        <div className="bg-amber-50 px-6 py-4 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Active Session Detected</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-amber-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

   
        <div className="px-6 py-6">
          <p className="text-gray-600 mb-4">
            You already have an active session on another device.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500">Account</p>
            <p className="font-medium text-gray-800">{userEmail}</p>
            <p className="text-sm text-gray-500 mt-2">Name</p>
            <p className="font-medium text-gray-800">{userName}</p>
          </div>
          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
            ⚠️ If you continue, you will be logged out from all other devices.
          </p>
        </div>

        
        <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Continue & Terminate Other Session'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};