'use client';

import React from 'react';
import { ButtonProps } from '@/types/Buttons';

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  color = 'bg-[#1E6F9F]',
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex w-full items-center justify-center gap-2 py-4 text-[#F2F2F2] text-sm font-bold rounded-md shadow-md
             ${color} ${
               disabled || loading
                 ? 'opacity-50 cursor-not-allowed'
                 : 'hover:opacity-90'
             }`}
    >
      {text}
      {loading ? (
        <img src="/loading.svg" alt="loading-spinner" width={20} />
      ) : (
        icon && <img src={icon} alt="icon" />
      )}
    </button>
  );
};
