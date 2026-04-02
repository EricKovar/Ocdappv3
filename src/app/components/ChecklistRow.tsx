import React from 'react';
import { SymptomItem } from '../context/AssessmentContext';

interface ChecklistRowProps {
  symptom: SymptomItem;
  isSelected: boolean;
  onToggle: () => void;
  onCurrentToggle: () => void;
  onPastToggle: () => void;
  onPrimaryToggle: () => void;
}

export function ChecklistRow({
  symptom,
  isSelected,
  onToggle,
  onCurrentToggle,
  onPastToggle,
  onPrimaryToggle,
}: ChecklistRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
      />
      <div className="flex-1">
        <span className="text-foreground">{symptom.label}</span>
      </div>
      {isSelected && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCurrentToggle}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              symptom.current
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground border border-border'
            }`}
          >
            Current
          </button>
          <button
            type="button"
            onClick={onPastToggle}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              symptom.past
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground border border-border'
            }`}
          >
            Past
          </button>
          <button
            type="button"
            onClick={onPrimaryToggle}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              symptom.primary
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground border border-border'
            }`}
          >
            Principal
          </button>
        </div>
      )}
    </div>
  );
}