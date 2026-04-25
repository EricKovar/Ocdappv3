import React, { useState } from 'react';

interface CustomTargetInputProps {
  onAdd: (label: string) => void;
  disabled: boolean;
}

export function CustomTargetInput({ onAdd, disabled }: CustomTargetInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !disabled) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="w-full flex items-center gap-2 p-2 text-left border border-border rounded-md bg-secondary/30">
      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/50" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="other"
        disabled={disabled}
        className="text-xs text-foreground flex-1 bg-transparent placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
      />
      {inputValue.trim() && (
        <button
          onClick={handleAdd}
          disabled={disabled}
          className="text-xs text-primary hover:text-primary/80 font-medium disabled:opacity-50"
        >
          Add
        </button>
      )}
    </div>
  );
}
