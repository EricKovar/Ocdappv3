import React, { useState } from 'react';
import { SymptomItem } from '../context/AssessmentContext';

interface CustomSymptomRowProps {
  category: string;
  onAdd: (label: string) => void;
  existingSymptom?: SymptomItem;
  isSelected: boolean;
  onToggle: () => void;
  onCurrentToggle: () => void;
  onPastToggle: () => void;
  onPrimaryToggle: () => void;
  onUpdate: (label: string) => void;
}

export function CustomSymptomRow({
  category,
  onAdd,
}: CustomSymptomRowProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
      <input
        type="checkbox"
        checked={false}
        onChange={handleAdd}
        disabled={!inputValue.trim()}
        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
      />
      <div className="flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="other symptoms"
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
      </div>
    </div>
  );
}
