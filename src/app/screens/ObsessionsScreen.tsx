import React, { useState, useMemo } from 'react';
import { useAssessment, SymptomItem } from '../context/AssessmentContext';
import { ThreeColumnLayout } from '../components/ThreeColumnLayout';
import { ChecklistRow } from '../components/ChecklistRow';
import { Card } from '../components/Card';
import { Search, X } from 'lucide-react';

const OBSESSION_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Aggressive',
    items: [
      'Fear might harm self',
      'Fear might harm others',
      'Violent or horrific images',
      'Fear of blurting out obscenities',
      'Fear of doing something embarrassing',
    ],
  },
  {
    category: 'Contamination',
    items: [
      'Concern with dirt or germs',
      'Concern with body waste or secretions',
      'Concern with environmental contaminants',
      'Concern with animals',
      'Concern with sticky substances',
    ],
  },
  {
    category: 'Sexual',
    items: [
      'Forbidden or perverse sexual thoughts',
      'Sexual images',
      'Sexual obsessions involving children',
      'Obsessions about homosexuality',
    ],
  },
  {
    category: 'Hoarding/Saving',
    items: [
      'Difficulty discarding items',
      'Fear of losing important information',
    ],
  },
  {
    category: 'Religious (Scrupulosity)',
    items: [
      'Concerns with sacrilege or blasphemy',
      'Excessive concern with right/wrong',
      'Excessive concern with morality',
    ],
  },
  {
    category: 'Symmetry/Exactness',
    items: [
      'Need for symmetry or exactness',
      'Need things "just right"',
    ],
  },
  {
    category: 'Miscellaneous',
    items: [
      'Need to know or remember',
      'Fear of saying certain things',
      'Lucky or unlucky numbers',
      'Colors with special significance',
      'Superstitious fears',
    ],
  },
  {
    category: 'Somatic',
    items: [
      'Concern with illness or disease',
      'Excessive concern with body parts',
    ],
  },
];

export function ObsessionsScreen() {
  const { selectedObsessions, setSelectedObsessions } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allObsessions = useMemo(() => {
    const obsessions: SymptomItem[] = [];
    OBSESSION_DATA.forEach(({ category, items }) => {
      items.forEach((label, idx) => {
        obsessions.push({
          id: `obs-${category}-${idx}`,
          label,
          category,
          current: false,
          past: false,
          primary: false,
        });
      });
    });
    return obsessions;
  }, []);

  const filteredObsessions = useMemo(() => {
    let filtered = allObsessions;
    if (activeCategory) {
      filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [allObsessions, activeCategory, searchTerm]);

  const toggleObsession = (obsession: SymptomItem) => {
    const existing = selectedObsessions.find(s => s.id === obsession.id);
    if (existing) {
      setSelectedObsessions(selectedObsessions.filter(s => s.id !== obsession.id));
    } else {
      setSelectedObsessions([...selectedObsessions, { ...obsession }]);
    }
  };

  const updateObsession = (id: string, updates: Partial<SymptomItem>) => {
    setSelectedObsessions(
      selectedObsessions.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeObsession = (id: string) => {
    setSelectedObsessions(selectedObsessions.filter(s => s.id !== id));
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    OBSESSION_DATA.forEach(({ category }) => {
      counts[category] = selectedObsessions.filter(s => s.category === category).length;
    });
    return counts;
  }, [selectedObsessions]);

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
          {OBSESSION_DATA.map(({ category }) => (
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
          placeholder="Search obsessions..."
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
          Assess the presence of obsessive thoughts, images, or impulses experienced by the patient. These are typically unwanted, distressing, and intrusive. Identify both current and past symptoms, and indicate which are most prominent for assessment.
        </p>
      </Card>

      <div className="space-y-3">
        {filteredObsessions.map(obsession => {
          const selected = selectedObsessions.find(s => s.id === obsession.id);
          const isSelected = !!selected;
          const displayObsession = selected || obsession;

          return (
            <ChecklistRow
              key={obsession.id}
              symptom={displayObsession}
              isSelected={isSelected}
              onToggle={() => toggleObsession(obsession)}
              onCurrentToggle={() =>
                updateObsession(obsession.id, { current: !displayObsession.current })
              }
              onPastToggle={() =>
                updateObsession(obsession.id, { past: !displayObsession.past })
              }
              onPrimaryToggle={() =>
                updateObsession(obsession.id, { primary: !displayObsession.primary })
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
        Selected Obsessions ({selectedObsessions.length})
      </h3>
      <div className="space-y-3">
        {selectedObsessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No obsessions selected</p>
        ) : (
          selectedObsessions.map(obsession => (
            <div
              key={obsession.id}
              className="p-3 border border-border rounded-lg bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-foreground font-medium flex-1">
                  {obsession.label}
                </span>
                <button
                  onClick={() => removeObsession(obsession.id)}
                  className="text-muted-foreground hover:text-destructive ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {obsession.current && (
                  <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md">
                    Current
                  </span>
                )}
                {obsession.past && (
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border">
                    Past
                  </span>
                )}
                {obsession.primary && (
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
      title="Obsessions"
      backPath="/symptoms"
      continuePath="/compulsions"
      leftSidebar={leftSidebar}
      centerContent={centerContent}
      rightSidebar={rightSidebar}
    />
  );
}
