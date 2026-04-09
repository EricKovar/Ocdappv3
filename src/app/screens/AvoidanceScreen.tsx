import React, { useState, useMemo } from 'react';
import { useAssessment, SymptomItem } from '../context/AssessmentContext';
import { ThreeColumnLayout } from '../components/ThreeColumnLayout';
import { ChecklistRow } from '../components/ChecklistRow';
import { Card } from '../components/Card';
import { Search, X } from 'lucide-react';

const AVOIDANCE_ITEMS = [
  'Avoids doing things, going places, or being with someone because of obsessions',
  'Avoids contact with contaminated objects or people',
  'Avoids handling sharp or dangerous objects',
  'Avoids contact with people, children, or animals because of unwanted impulses',
  'Avoids talking or writing for fear of saying the wrong thing',
  'Avoids watching TV, using the internet, or reading to shield from triggers',
  'Avoids situations that trigger time-consuming rituals',
  'Avoids particular numbers, colors, or names',
  'Avoids discarding items that might be needed',
];

export function AvoidanceScreen() {
  const { selectedAvoidance, setSelectedAvoidance } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');

  const allAvoidance = useMemo(() => {
    return AVOIDANCE_ITEMS.map((label, idx) => ({
      id: `avoid-${idx}`,
      label,
      category: 'Avoidance Behaviors',
      current: false,
      past: false,
      primary: false,
    }));
  }, []);

  const filteredAvoidance = useMemo(() => {
    if (!searchTerm) return allAvoidance;
    return allAvoidance.filter(s =>
      s.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allAvoidance, searchTerm]);

  const toggleAvoidance = (avoidance: SymptomItem) => {
    const existing = selectedAvoidance.find(s => s.id === avoidance.id);
    if (existing) {
      setSelectedAvoidance(selectedAvoidance.filter(s => s.id !== avoidance.id));
    } else {
      setSelectedAvoidance([...selectedAvoidance, { ...avoidance }]);
    }
  };

  const updateAvoidance = (id: string, updates: Partial<SymptomItem>) => {
    setSelectedAvoidance(
      selectedAvoidance.map(s => {
        if (s.id === id) {
          const newSymptom = { ...s, ...updates };
          
          // Enforce mutual exclusivity rules:
          // 1. Current and Past are mutually exclusive
          if (updates.current === true) {
            newSymptom.past = false;
          }
          if (updates.past === true) {
            newSymptom.current = false;
            newSymptom.primary = false; // Principal not allowed with Past
          }
          
          // 2. Principal can only be selected with Current
          if (updates.primary === true && newSymptom.past) {
            newSymptom.past = false;
            newSymptom.current = true;
          }
          
          return newSymptom;
        }
        return s;
      })
    );
  };

  const removeAvoidance = (id: string) => {
    setSelectedAvoidance(selectedAvoidance.filter(s => s.id !== id));
  };

  const leftSidebar = (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-1">
          <div className="px-3 py-2 rounded-md bg-primary text-primary-foreground">
            Avoidance Behaviors
            {selectedAvoidance.length > 0 && (
              <span className="ml-2 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                {selectedAvoidance.length}
              </span>
            )}
          </div>
        </div>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search behaviors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );

  const centerContent = (
    <div className="space-y-6">
      <Card className="bg-secondary/30">
        <p className="text-sm text-foreground leading-relaxed mb-3">
          Evaluate avoidance behaviors used to reduce exposure to triggers associated with obsessions or compulsions. Identify behaviors that limit functioning or are used in place of rituals, and include them as part of the overall symptom profile.
        </p>
        <p className="text-xs text-muted-foreground italic">
          Avoidance may reduce visible compulsions but still indicates severity.
        </p>
      </Card>

      <div className="space-y-3">
        {filteredAvoidance.map(avoidance => {
          const selected = selectedAvoidance.find(s => s.id === avoidance.id);
          const isSelected = !!selected;
          const displayAvoidance = selected || avoidance;

          return (
            <ChecklistRow
              key={avoidance.id}
              symptom={displayAvoidance}
              isSelected={isSelected}
              onToggle={() => toggleAvoidance(avoidance)}
              onCurrentToggle={() =>
                updateAvoidance(avoidance.id, { current: !displayAvoidance.current })
              }
              onPastToggle={() =>
                updateAvoidance(avoidance.id, { past: !displayAvoidance.past })
              }
              onPrimaryToggle={() =>
                updateAvoidance(avoidance.id, { primary: !displayAvoidance.primary })
              }
            />
          );
        })}
      </div>
    </div>
  );

  const rightSidebar = (
    <Card>
      <h3 className="font-semibold text-foreground mb-4">
        Selected Avoidance ({selectedAvoidance.length})
      </h3>
      <div className="space-y-3">
        {selectedAvoidance.length === 0 ? (
          <p className="text-sm text-muted-foreground">No avoidance behaviors selected</p>
        ) : (
          selectedAvoidance.map(avoidance => (
            <div
              key={avoidance.id}
              className="p-3 border border-border rounded-lg bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-foreground font-medium flex-1">
                  {avoidance.label}
                </span>
                <button
                  onClick={() => removeAvoidance(avoidance.id)}
                  className="text-muted-foreground hover:text-destructive ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {avoidance.current && (
                  <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md">
                    Current
                  </span>
                )}
                {avoidance.past && (
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border">
                    Past
                  </span>
                )}
                {avoidance.primary && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-md">
                    Principal
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );

  return (
    <ThreeColumnLayout
      title="Avoidance"
      backPath="/compulsions"
      continuePath="/target-symptoms"
      leftSidebar={leftSidebar}
      centerContent={centerContent}
      rightSidebar={rightSidebar}
    />
  );
}