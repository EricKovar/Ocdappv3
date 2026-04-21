import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAssessment, SymptomItem } from '../context/AssessmentContext';
import { ChecklistRow } from '../components/ChecklistRow';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, X, ArrowLeft } from 'lucide-react';

const OBSESSION_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Aggressive Obsessions',
    items: [
      'Fear might harm self',
      'Fear might harm others',
      'Violent or horrific images',
      'Fear of blurting out obscenities or insults',
      'Fear of doing something else embarrassing',
      'Fear will act on unwanted impulses (e.g., to stab friend)',
      'Fear will steal things',
      'Fear will harm others because not careful enough (e.g., hit/run MVA)',
      'Fear will be responsible for something else terrible happening (e.g., fire, burglary)'
    ]
  },
  {
    category: 'Contamination Obsessions',
    items: [
      'Concerns or disgust with bodily waste or secretions (e.g., urine, feces, saliva)',
      'Concern with dirt or germs',
      'Excessive concern with environmental contaminants (e.g. radiation, toxic waste)',
      'Excessive concern with household items (e.g., cleaners, solvents)',
      'Bothered by sticky substances or residues',
      'Concerned will get ill because of contaminant',
      'Concerned will get others ill by spreading contaminant',
      'Emotional contamination (e.g., concern that proximity to others will change self)',
      'No concerns about consequences of contamination other than how it might feel'
    ]
  },
  {
    category: 'Sexual Obsessions',
    items: [
      'Unwanted taboo thoughts involving forbidden or perverse sexual thoughts or images',
      'Content involves gender identity or sexual orientation (as distinct from gender dysphoria)',
      'Unwanted sexual behavior toward others'
    ]
  },
  {
    category: 'Hoarding/Saving Obsessions',
    items: [
      'Hoarding/saving obsessions (distinguish from hobbies and concern with objects of monetary or sentimental value and from Hoarding Disorder)'
    ]
  },
  {
    category: 'Religious Obsessions (Scrupulosity)',
    items: [
      'Concerned with sacrilege and blasphemy',
      'Excess concern with right/wrong, morality',
      'Obsessions about being a \'bad\' person or embodying negative characteristics (e.g., racist, sexist, etc.)'
    ]
  },
  {
    category: 'Obsession with Need for Symmetry or Exactness',
    items: [
      'Accompanied by magical thinking (e.g., concerned that mother will have accident unless things are in the right place)',
      'Not accompanied by magical thinking',
      'Urge/feeling for things to be done \'just right\' or complete'
    ]
  },
  {
    category: 'Miscellaneous Obsessions',
    items: [
      'Need to know or remember',
      'Fear of saying certain things',
      'Fear of not saying just the right thing',
      'Fear of losing things',
      'Obsessional slowness',
      'Urge to do things \'just right\'',
      'Obsessions related to relationships (e.g., fears in the wrong relationship, your partner doesn\'t love you, etc.)',
      'Existential obsessions (e.g., you don\'t exist, your concerns are not real)',
      'Concerns you may have or do not have a condition (e.g., OCD)',
      'Intrusive (non-violent) images',
      'Intrusive nonsense sounds, words, or music',
      'Bothered by certain sounds/noises',
      'Lucky/unlucky numbers',
      'Colors with special significance',
      'Superstitious fears'
    ]
  },
  {
    category: 'Somatic Obsessions',
    items: [
      'Concern with illness or disease',
      'Hyperawareness of automatic bodily functions such as breathing and swallowing',
      'Excessive concern with body part or aspect of appearance (distinguish from BDD)'
    ]
  }
];

const COMPULSION_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Cleaning/Washing Compulsions',
    items: [
      'Excessive or ritualized hygiene',
      'Excessive or ritualized showering, bathing, toothbrushing, grooming or toilet routine',
      'Involves cleaning of household items or other inanimate objects',
      'Other measures to prevent or remove contact with contaminants'
    ]
  },
  {
    category: 'Checking Compulsions',
    items: [
      'Checking locks, stove, appliances, etc.',
      'Checking that did not/will not harm others',
      'Checking that did not/will not harm self',
      'Checking that nothing terrible did/will happen',
      'Checking that did not make mistake',
      'Checking tied to somatic obsessions (e.g., looking for signs of illness)',
      'Mental checking/review of past events'
    ]
  },
  {
    category: 'Repeating Rituals',
    items: [
      'Re-reading or re-writing',
      'Need to repeat routine activities (e.g., in/out door, up/down from chair)',
      'Repeating things/actions until it feels \'just right\'',
      'Seeking reassurance by repeated questioning'
    ]
  },
  {
    category: 'Counting Compulsions',
    items: [
      'Counting compulsions'
    ]
  },
  {
    category: 'Ordering/Arranging Compulsions',
    items: [
      'Ordering/arranging compulsions'
    ]
  },
  {
    category: 'Hoarding/Collecting Compulsions',
    items: [
      'Hoarding/collecting compulsions (Distinguish from hobbies and concern with objects of monetary or sentimental value [e.g., carefully reads junk mail, piles up old newspapers, sorts through garbage, collects useless objects]. Does patient meet criteria for diagnosis of Hoarding Disorder?)'
    ]
  },
  {
    category: 'Miscellaneous Compulsions',
    items: [
      'Mental rituals (other than counting/checking)',
      'Excessive list making',
      'Need to tell, ask, or confess',
      'Need to touch, tap, or rub',
      'Rituals involving blinking or staring',
      'Measures (not checking) to prevent: harm to self; harm to others; terrible consequences',
      'Ritualized eating behaviors',
      'Superstitious rituals',
      'Hairpulling or skin picking in service of an obsession (distinguish from Trichotillomania and excoriation disorder)',
      'Other self-damaging or mutilating behaviors',
      'Pervasive slowness (distinguish from psychomotor retardation secondary to depression)'
    ]
  }
];

const AVOIDANCE_ITEMS = [
  'Avoids doing things, going places or being with someone because of obsessions',
  'Avoid contact with contaminated objects or people',
  'Avoid handling sharp or dangerous objects, or operating vehicles or machinery, out of concern might harm others',
  'Avoid contact with people, children or animals because of unwanted impulses',
  'Avoids talking to or writing to others for fear will say or write the wrong thing',
  'Avoids watching TV, using Internet, reading to shield from disturbing information',
  'Avoids doing things, going places, or being with someone that would trigger time consuming or onerous rituals'
];

type ChecklistSection = 'obsessions' | 'compulsions' | 'avoidance';

export function SymptomChecklistScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedObsessions,
    setSelectedObsessions,
    selectedCompulsions,
    setSelectedCompulsions,
    selectedAvoidance,
    setSelectedAvoidance,
  } = useAssessment();

  const [activeSection, setActiveSection] = useState<ChecklistSection>('obsessions');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Set active section based on route
  useEffect(() => {
    if (location.pathname === '/obsessions') setActiveSection('obsessions');
    else if (location.pathname === '/compulsions') setActiveSection('compulsions');
    else if (location.pathname === '/avoidance') setActiveSection('avoidance');

    // Reset filters when section changes
    setSearchTerm('');
    setActiveCategory(null);
  }, [location.pathname]);

  // Generate all items
  const allObsessions = useMemo(() => {
    const items: SymptomItem[] = [];
    OBSESSION_DATA.forEach(({ category, items: categoryItems }) => {
      categoryItems.forEach((label, idx) => {
        items.push({ id: `obs-${category}-${idx}`, label, category, current: false, past: false, primary: false });
      });
    });
    return items;
  }, []);

  const allCompulsions = useMemo(() => {
    const items: SymptomItem[] = [];
    COMPULSION_DATA.forEach(({ category, items: categoryItems }) => {
      categoryItems.forEach((label, idx) => {
        items.push({ id: `comp-${category}-${idx}`, label, category, current: false, past: false, primary: false });
      });
    });
    return items;
  }, []);

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

  // Get current data based on section
  const getCurrentData = () => {
    if (activeSection === 'obsessions') return { all: allObsessions, selected: selectedObsessions, categories: OBSESSION_DATA };
    if (activeSection === 'compulsions') return { all: allCompulsions, selected: selectedCompulsions, categories: COMPULSION_DATA };
    return { all: allAvoidance, selected: selectedAvoidance, categories: [] };
  };

  const { all, selected, categories } = getCurrentData();

  const filteredItems = useMemo(() => {
    let filtered = all;
    if (activeCategory && activeSection !== 'avoidance') {
      filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(s => s.label.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [all, activeCategory, searchTerm, activeSection]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(({ category }) => {
      counts[category] = selected.filter(s => s.category === category).length;
    });
    return counts;
  }, [selected, categories]);

  const toggleItem = (item: SymptomItem) => {
    const setter = activeSection === 'obsessions' ? setSelectedObsessions : activeSection === 'compulsions' ? setSelectedCompulsions : setSelectedAvoidance;
    const existing = selected.find(s => s.id === item.id);
    if (existing) {
      setter(selected.filter(s => s.id !== item.id));
    } else {
      setter([...selected, { ...item }]);
    }
  };

  const updateItem = (id: string, updates: Partial<SymptomItem>) => {
    const setter = activeSection === 'obsessions' ? setSelectedObsessions : activeSection === 'compulsions' ? setSelectedCompulsions : setSelectedAvoidance;
    setter(
      selected.map(s => {
        if (s.id === id) {
          const newSymptom = { ...s, ...updates };
          if (updates.current === true) newSymptom.past = false;
          if (updates.past === true) {
            newSymptom.current = false;
            newSymptom.primary = false;
          }
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

  const removeItem = (id: string) => {
    const setter = activeSection === 'obsessions' ? setSelectedObsessions : activeSection === 'compulsions' ? setSelectedCompulsions : setSelectedAvoidance;
    setter(selected.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-[32px] font-semibold text-foreground">Symptom Checklist</h1>
          <p className="text-muted-foreground mt-1">Steps 4-6 of 10</p>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => navigate('/obsessions')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeSection === 'obsessions'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Obsessions {selectedObsessions.length > 0 && `(${selectedObsessions.length})`}
          </button>
          <button
            onClick={() => navigate('/compulsions')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeSection === 'compulsions'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Compulsions {selectedCompulsions.length > 0 && `(${selectedCompulsions.length})`}
          </button>
          <button
            onClick={() => navigate('/avoidance')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeSection === 'avoidance'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Avoidance {selectedAvoidance.length > 0 && `(${selectedAvoidance.length})`}
          </button>
        </div>

        <div className="grid grid-cols-[280px_1fr_320px] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            {activeSection !== 'avoidance' && (
              <Card>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                      activeCategory === null ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(({ category }) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between text-sm ${
                        activeCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-foreground'
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
            )}

            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${activeSection}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="space-y-6">
            <Card className="bg-secondary/30">
              <p className="text-sm text-foreground leading-relaxed">
                {activeSection === 'obsessions' && 'Assess the presence of obsessive thoughts, images, or impulses experienced by the patient. These are typically unwanted, distressing, and intrusive. Identify both current and past symptoms, and indicate which are most prominent for assessment.'}
                {activeSection === 'compulsions' && 'Assess compulsive behaviors or mental acts that the patient feels driven to perform in response to obsessions or according to rigid rules. These behaviors are typically aimed at reducing anxiety or preventing feared outcomes, even if they are recognized as excessive or unrealistic.'}
                {activeSection === 'avoidance' && 'Evaluate avoidance behaviors used to reduce exposure to triggers associated with obsessions or compulsions. Identify behaviors that limit functioning or are used in place of rituals, and include them as part of the overall symptom profile.'}
              </p>
            </Card>

            <div className="space-y-3">
              {filteredItems.map(item => {
                const selectedItem = selected.find(s => s.id === item.id);
                const isSelected = !!selectedItem;
                const displayItem = selectedItem || item;

                return (
                  <ChecklistRow
                    key={item.id}
                    symptom={displayItem}
                    isSelected={isSelected}
                    onToggle={() => toggleItem(item)}
                    onCurrentToggle={() => updateItem(item.id, { current: !displayItem.current })}
                    onPastToggle={() => updateItem(item.id, { past: !displayItem.past })}
                    onPrimaryToggle={() => updateItem(item.id, { primary: !displayItem.primary })}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <Card>
            <h3 className="font-semibold text-foreground mb-4">
              Selected {activeSection === 'obsessions' ? 'Obsessions' : activeSection === 'compulsions' ? 'Compulsions' : 'Avoidance'} ({selected.length})
            </h3>
            <div className="space-y-3">
              {selected.length === 0 ? (
                <p className="text-sm text-muted-foreground">No {activeSection} selected</p>
              ) : (
                selected.map(item => (
                  <div key={item.id} className="p-3 border border-border rounded-lg bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm text-foreground font-medium flex-1">{item.label}</span>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive ml-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.current && <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md">Current</span>}
                      {item.past && <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border">Past</span>}
                      {item.primary && <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-md">Principal</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border sticky bottom-0 bg-background pb-8">
          <Button variant="secondary" onClick={() => navigate('/brief-instructions')}>
            Back
          </Button>
          <Button onClick={() => navigate('/target-symptoms')}>
            Continue to Target Symptoms
          </Button>
        </div>
      </div>
    </div>
  );
}
