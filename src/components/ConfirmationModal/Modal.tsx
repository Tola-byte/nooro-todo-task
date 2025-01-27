import React from 'react';
import { Button } from '../Buttons/PrimaryButton';
import { ConfirmationModalProps } from '@/types/ConfirmationModal';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#000] p-6 rounded-lg max-w-md w-full mx-4">
        <p className="text-white mb-4">{message}</p>
        <div className="flex ml-auto justify-end w-3/4 gap-4">
          <div className="w-1/3">
            <Button onClick={onCancel} text="Cancel" color="bg-transparent" />
          </div>

          <div className="w-1/3">
            <Button
              text={'Delete'}
              onClick={onConfirm}
              color="bg-red-500"
              icon=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
