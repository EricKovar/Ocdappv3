import React, { useState, useMemo } from 'react';
import { useAssessment, SymptomItem } from '../context/AssessmentContext';
import { ThreeColumnLayout } from '../components/ThreeColumnLayout';
import { ChecklistRow } from '../components/ChecklistRow';
import { Card } from '../components/Card';
import { Search, X } from 'lucide-react';

const COMPULSION_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Cleaning/Washing',
    items: [
      'Excessive handwashing',
      'Cleaning household items',
      'Excessive showering or bathing',
      'Cleaning other items',
    ],
  },
  {
    category: 'Checking',
    items: [
      'Checking locks or appliances',
      'Checking that no harm occurred',
      'Checking that nothing terrible happened',
      'Checking for mistakes',
      'Checking tied to somatic obsessions',
    ],
  },
  {
    category: 'Repeating',
    items: [
      'Re-reading or re-writing',
      'Repeating routine activities',
      'Repeating body movements',
    ],
  },
  {
    category: 'Counting',
    items: [
      'Counting compulsions',
      'Counting while performing tasks',
    ],
  },
  {
    category: 'Ordering/Arranging',
    items: [
      'Ordering or arranging items',
      'Need for symmetry',
    ],
  },
  {
    category: 'Hoarding/Collecting',
    items: [
      'Difficulty discarding possessions',
      'Collecting useless items',
    ],
  },
  {
    category: 'Miscellaneous',
    items: [
      'Mental rituals',
      'Need to confess',
      'Touching or tapping rituals',
      'Measures to prevent harm',
      'Ritualized eating behaviors',
      'Superstitious behaviors',
      'Trichotillomania (hair pulling)',
    ],
  },
];

export function CompulsionsScreen() {
  const { selectedCompulsions, setSelectedCompulsions } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCompulsions = useMemo(() => {
    const compulsions: SymptomItem[] = [];
    COMPULSION_DATA.forEach(({ category, items }) => {
      items.forEach((label, idx) => {
        compulsions.push({
          id: `comp-${category}-${idx}`,
          label,
          category,
          current: false,
          past: false,
          primary: false,
        });
      });
    });
    return compulsions;
  }, []);

  const filteredCompulsions = useMemo(() => {
    let filtered = allCompulsions;
    if (activeCategory) {
      filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [allCompulsions, activeCategory, searchTerm]);

  const toggleCompulsion = (compulsion: SymptomItem) => {
    const existing = selectedCompulsions.find(s => s.id === compulsion.id);
    if (existing) {
      setSelectedCompulsions(selectedCompulsions.filter(s => s.id !== compulsion.id));
    } else {
      setSelectedCompulsions([...selectedCompulsions, { ...compulsion }]);
    }
  };

  const updateCompulsion = (id: string, updates: Partial<SymptomItem>) => {
    setSelectedCompulsions(
      selectedCompulsions.map(s => {
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

  const removeCompulsion = (id: string) => {
    setSelectedCompulsions(selectedCompulsions.filter(s => s.id !== id));
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    COMPULSION_DATA.forEach(({ category }) => {
      counts[category] = selectedCompulsions.filter(s => s.category === category).length;
    });
    return counts;
  }, [selectedCompulsions]);

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
          {COMPULSION_DATA.map(({ category }) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <span className="text-sm">{category}</span>
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
          placeholder="Search compulsions..."
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
          Assess compulsive behaviors or mental acts that the patient feels driven to perform in response to obsessions or according to rigid rules. These behaviors are typically aimed at reducing anxiety or preventing feared outcomes, even if they are recognized as excessive or unrealistic. Identify current and past compulsions and note those that are most prominent.
        </p>
      </Card>

      <div className="space-y-3">
        {filteredCompulsions.map(compulsion => {
          const selected = selectedCompulsions.find(s => s.id === compulsion.id);
          const isSelected = !!selected;
          const displayCompulsion = selected || compulsion;

          return (
            <ChecklistRow
              key={compulsion.id}
              symptom={displayCompulsion}
              isSelected={isSelected}
              onToggle={() => toggleCompulsion(compulsion)}
              onCurrentToggle={() =>
                updateCompulsion(compulsion.id, { current: !displayCompulsion.current })
              }
              onPastToggle={() =>
                updateCompulsion(compulsion.id, { past: !displayCompulsion.past })
              }
              onPrimaryToggle={() =>
                updateCompulsion(compulsion.id, { primary: !displayCompulsion.primary })
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
        Selected Compulsions ({selectedCompulsions.length})
      </h3>
      <div className="space-y-3">
        {selectedCompulsions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No compulsions selected</p>
        ) : (
          selectedCompulsions.map(compulsion => (
            <div
              key={compulsion.id}
              className="p-3 border border-border rounded-lg bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-foreground font-medium flex-1">
                  {compulsion.label}
                </span>
                <button
                  onClick={() => removeCompulsion(compulsion.id)}
                  className="text-muted-foreground hover:text-destructive ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {compulsion.current && (
                  <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md">
                    Current
                  </span>
                )}
                {compulsion.past && (
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border">
                    Past
                  </span>
                )}
                {compulsion.primary && (
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
      title="Compulsions"
      backPath="/obsessions"
      continuePath="/avoidance"
      leftSidebar={leftSidebar}
      centerContent={centerContent}
      rightSidebar={rightSidebar}
    />
  );
}