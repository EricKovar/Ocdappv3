import React, { useState, useMemo } from 'react';
import { useAssessment, SymptomItem } from '../context/AssessmentContext';
import { ThreeColumnLayout } from '../components/ThreeColumnLayout';
import { ChecklistRow } from '../components/ChecklistRow';
import { Card } from '../components/Card';
import { Search, X } from 'lucide-react';

const SYMPTOM_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Contamination',
    items: [
      'Concerns with dirt or germs',
      'Concerns with body waste or secretions',
      'Concerns with environmental contaminants',
      'Concerns with household items',
    ],
  },
  {
    category: 'Aggressive',
    items: [
      'Fear of harming self',
      'Fear of harming others',
      'Violent or horrific images',
      'Fear of blurting out obscenities or insults',
    ],
  },
  {
    category: 'Sexual',
    items: [
      'Forbidden or perverse sexual thoughts or images',
      'Sexual obsessions involving children',
      'Obsessions about homosexuality',
    ],
  },
  {
    category: 'Religious',
    items: [
      'Concerns with sacrilege or blasphemy',
      'Excessive concern with right/wrong or morality',
    ],
  },
  {
    category: 'Symmetry',
    items: [
      'Need for symmetry or exactness',
      'Concerns with bodily sensations',
    ],
  },
  {
    category: 'Miscellaneous',
    items: [
      'Lucky or unlucky numbers',
      'Colors with special significance',
      'Superstitious fears',
      'Need to know or remember',
      'Fear of saying certain things',
    ],
  },
];

export function SymptomsScreen() {
  const { selectedSymptoms, setSelectedSymptoms } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allSymptoms = useMemo(() => {
    const symptoms: SymptomItem[] = [];
    SYMPTOM_DATA.forEach(({ category, items }) => {
      items.forEach((label, idx) => {
        symptoms.push({
          id: `${category}-${idx}`,
          label,
          category,
          current: false,
          past: false,
          primary: false,
        });
      });
    });
    return symptoms;
  }, []);

  const filteredSymptoms = useMemo(() => {
    let filtered = allSymptoms;
    if (activeCategory) {
      filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [allSymptoms, activeCategory, searchTerm]);

  const toggleSymptom = (symptom: SymptomItem) => {
    const existing = selectedSymptoms.find(s => s.id === symptom.id);
    if (existing) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, { ...symptom }]);
    }
  };

  const updateSymptom = (id: string, updates: Partial<SymptomItem>) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SYMPTOM_DATA.forEach(({ category }) => {
      counts[category] = selectedSymptoms.filter(s => s.category === category).length;
    });
    return counts;
  }, [selectedSymptoms]);

  const leftSidebar = (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary text-foreground'
            }`}
          >
            All Categories
          </button>
          {SYMPTOM_DATA.map(({ category }) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <span>{category}</span>
              {categoryCounts[category] > 0 && (
                <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                  {categoryCounts[category]}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search symptoms..."
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
        <p className="text-sm text-foreground leading-relaxed">
          Review the following symptom categories with the patient and identify all that apply. Mark symptoms that have been present recently (past 30 days) and those currently active (past week). Clearly indicate the principal symptoms that will guide assessment. Use clinical judgment to distinguish OCD symptoms from those of other conditions.
        </p>
      </Card>

      <div className="space-y-3">
        {filteredSymptoms.map(symptom => {
          const selected = selectedSymptoms.find(s => s.id === symptom.id);
          const isSelected = !!selected;
          const displaySymptom = selected || symptom;

          return (
            <ChecklistRow
              key={symptom.id}
              symptom={displaySymptom}
              isSelected={isSelected}
              onToggle={() => toggleSymptom(symptom)}
              onCurrentToggle={() =>
                updateSymptom(symptom.id, { current: !displaySymptom.current })
              }
              onPastToggle={() =>
                updateSymptom(symptom.id, { past: !displaySymptom.past })
              }
              onPrimaryToggle={() =>
                updateSymptom(symptom.id, { primary: !displaySymptom.primary })
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
        Selected Symptoms ({selectedSymptoms.length})
      </h3>
      <div className="space-y-3">
        {selectedSymptoms.length === 0 ? (
          <p className="text-sm text-muted-foreground">No symptoms selected</p>
        ) : (
          selectedSymptoms.map(symptom => (
            <div
              key={symptom.id}
              className="p-3 border border-border rounded-lg bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-foreground font-medium flex-1">
                  {symptom.label}
                </span>
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="text-muted-foreground hover:text-destructive ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {symptom.current && (
                  <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md">
                    Current
                  </span>
                )}
                {symptom.past && (
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border">
                    Past
                  </span>
                )}
                {symptom.primary && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-md">
                    Primary
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
      title="Symptom Checklist"
      backPath="/instructions"
      continuePath="/obsessions"
      leftSidebar={leftSidebar}
      centerContent={centerContent}
      rightSidebar={rightSidebar}
    />
  );
}
