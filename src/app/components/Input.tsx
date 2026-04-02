import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
}
