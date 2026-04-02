import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScoreOption {
  value: number;
  label: string;
  description: string;
}

interface Question {
  id: string;
  section: 'obsessions' | 'compulsions' | 'insight';
  number: string;
  title: string;
  prompt: string;
  options: ScoreOption[];
  scored: boolean;
  instruction?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'obs-1',
    section: 'obsessions',
    number: '1',
    title: 'Time Occupied by Obsessive Thoughts',
    prompt: 'How much of your time is occupied by obsessive thoughts?',
    scored: true,
    instruction: 'I am now going to ask several questions about your obsessive thoughts.',
    options: [
      { value: 0, label: 'None', description: 'No symptoms' },
      { value: 1, label: 'Mild', description: 'Less than 1 hour/day or occasional intrusion' },
      { value: 2, label: 'Moderate', description: '1–3 hours/day or frequent intrusion' },
      { value: 3, label: 'Severe', description: 'Greater than 3 and up to 8 hours/day or very frequent intrusion' },
      { value: 4, label: 'Extreme', description: 'Greater than 8 hours/day or near constant intrusion' },
    ],
  },
  {
    id: 'obs-1b',
    section: 'obsessions',
    number: '1b',
    title: 'Obsession-Free Interval',
    prompt: 'How long can you go without experiencing obsessive thoughts?',
    scored: false,
    options: [
      { value: 0, label: 'None', description: 'No obsessions' },
      { value: 1, label: 'Long', description: 'Can go 8+ consecutive hours without obsessions' },
      { value: 2, label: 'Moderately long', description: 'Can go 3-8 hours without obsessions' },
      { value: 3, label: 'Short', description: 'Can go 1-3 hours without obsessions' },
      { value: 4, label: 'Extremely short', description: 'Less than 1 hour obsession-free' },
    ],
  },
  {
    id: 'obs-2',
    section: 'obsessions',
    number: '2',
    title: 'Interference from Obsessive Thoughts',
    prompt: 'How much do your obsessive thoughts interfere with your social or work functioning?',
    scored: true,
    options: [
      { value: 0, label: 'None', description: 'No interference' },
      { value: 1, label: 'Mild', description: 'Slight interference, but overall performance not impaired' },
      { value: 2, label: 'Moderate', description: 'Definite interference, but still manageable' },
      { value: 3, label: 'Severe', description: 'Substantial impairment in performance' },
      { value: 4, label: 'Extreme', description: 'Incapacitating' },
    ],
  },
  {
    id: 'obs-3',
    section: 'obsessions',
    number: '3',
    title: 'Distress from Obsessive Thoughts',
    prompt: 'How much distress do your obsessive thoughts cause you?',
    scored: true,
    options: [
      { value: 0, label: 'None', description: 'No distress' },
      { value: 1, label: 'Mild', description: 'Not too disturbing' },
      { value: 2, label: 'Moderate', description: 'Disturbing, but still manageable' },
      { value: 3, label: 'Severe', description: 'Very disturbing' },
      { value: 4, label: 'Extreme', description: 'Near constant and disabling distress' },
    ],
  },
  {
    id: 'obs-4',
    section: 'obsessions',
    number: '4',
    title: 'Resistance Against Obsessions',
    prompt: 'How much effort do you make to resist the obsessive thoughts?',
    scored: true,
    options: [
      { value: 0, label: 'Always resists', description: 'Or symptoms minimal and no need to resist' },
      { value: 1, label: 'Usually resists', description: 'Tries to resist most of the time' },
      { value: 2, label: 'Sometimes resists', description: 'Makes some effort to resist' },
      { value: 3, label: 'Rarely resists', description: 'Yields to almost all obsessions without attempting control' },
      { value: 4, label: 'Never resists', description: 'Completely and willingly yields to all obsessions' },
    ],
  },
  {
    id: 'obs-5',
    section: 'obsessions',
    number: '5',
    title: 'Control Over Obsessive Thoughts',
    prompt: 'How much control do you have over your obsessive thoughts?',
    scored: true,
    options: [
      { value: 0, label: 'Complete control', description: 'Can always stop or dismiss obsessions' },
      { value: 1, label: 'Much control', description: 'Usually able to stop or divert obsessions with effort' },
      { value: 2, label: 'Moderate control', description: 'Sometimes able to stop or divert obsessions' },
      { value: 3, label: 'Little control', description: 'Rarely successful in stopping obsessions' },
      { value: 4, label: 'No control', description: 'Obsessions are completely involuntary' },
    ],
  },
  {
    id: 'comp-6',
    section: 'compulsions',
    number: '6',
    title: 'Time Spent on Compulsive Behaviors',
    prompt: 'How much time do you spend performing compulsive behaviors?',
    scored: true,
    instruction: 'Now I will ask you about your compulsive behaviors.',
    options: [
      { value: 0, label: 'None', description: 'No symptoms' },
      { value: 1, label: 'Mild', description: 'Less than 1 hour/day or occasional performance' },
      { value: 2, label: 'Moderate', description: '1–3 hours/day or frequent performance' },
      { value: 3, label: 'Severe', description: 'Greater than 3 and up to 8 hours/day or very frequent performance' },
      { value: 4, label: 'Extreme', description: 'Greater than 8 hours/day or near constant performance' },
    ],
  },
  {
    id: 'comp-6b',
    section: 'compulsions',
    number: '6b',
    title: 'Compulsion-Free Interval',
    prompt: 'How long can you go without performing compulsive behaviors?',
    scored: false,
    options: [
      { value: 0, label: 'None', description: 'No compulsions' },
      { value: 1, label: 'Long', description: 'Can go 8+ consecutive hours without compulsions' },
      { value: 2, label: 'Moderately long', description: 'Can go 3-8 hours without compulsions' },
      { value: 3, label: 'Short', description: 'Can go 1-3 hours without compulsions' },
      { value: 4, label: 'Extremely short', description: 'Less than 1 hour compulsion-free' },
    ],
  },
  {
    id: 'comp-7',
    section: 'compulsions',
    number: '7',
    title: 'Interference from Compulsions',
    prompt: 'How much do your compulsive behaviors interfere with your social or work functioning?',
    scored: true,
    options: [
      { value: 0, label: 'None', description: 'No interference' },
      { value: 1, label: 'Mild', description: 'Slight interference, but overall performance not impaired' },
      { value: 2, label: 'Moderate', description: 'Definite interference, but still manageable' },
      { value: 3, label: 'Severe', description: 'Substantial impairment in performance' },
      { value: 4, label: 'Extreme', description: 'Incapacitating' },
    ],
  },
  {
    id: 'comp-8',
    section: 'compulsions',
    number: '8',
    title: 'Distress if Compulsions Prevented',
    prompt: 'How anxious would you become if prevented from performing your compulsions?',
    scored: true,
    options: [
      { value: 0, label: 'None', description: 'No distress' },
      { value: 1, label: 'Mild', description: 'Only slightly anxious' },
      { value: 2, label: 'Moderate', description: 'Anxiety would mount but remain manageable' },
      { value: 3, label: 'Severe', description: 'Prominent and very disturbing increase in anxiety' },
      { value: 4, label: 'Extreme', description: 'Incapacitating anxiety' },
    ],
  },
  {
    id: 'comp-9',
    section: 'compulsions',
    number: '9',
    title: 'Resistance Against Compulsions',
    prompt: 'How much effort do you make to resist the compulsions?',
    scored: true,
    options: [
      { value: 0, label: 'Always resists', description: 'Or symptoms minimal and no need to resist' },
      { value: 1, label: 'Usually resists', description: 'Tries to resist most of the time' },
      { value: 2, label: 'Sometimes resists', description: 'Makes some effort to resist' },
      { value: 3, label: 'Rarely resists', description: 'Yields to almost all compulsions without attempting control' },
      { value: 4, label: 'Never resists', description: 'Completely and willingly yields to all compulsions' },
    ],
  },
  {
    id: 'comp-10',
    section: 'compulsions',
    number: '10',
    title: 'Control Over Compulsions',
    prompt: 'How much control do you have over your compulsive behaviors?',
    scored: true,
    options: [
      { value: 0, label: 'Complete control', description: 'Can always stop or delay compulsions' },
      { value: 1, label: 'Much control', description: 'Usually able to control compulsions with effort' },
      { value: 2, label: 'Moderate control', description: 'Sometimes able to stop or delay compulsions' },
      { value: 3, label: 'Little control', description: 'Rarely successful in controlling compulsions' },
      { value: 4, label: 'No control', description: 'Compulsions are completely involuntary' },
    ],
  },
  {
    id: 'insight-11',
    section: 'insight',
    number: '11',
    title: 'Insight into Obsessions and Compulsions',
    prompt: 'Do you think your obsessions and compulsions are reasonable or excessive?',
    scored: false,
    instruction: 'Finally, I will ask about your insight into these symptoms.',
    options: [
      { value: 0, label: 'Excellent', description: 'Fully aware that beliefs are excessive and unreasonable' },
      { value: 1, label: 'Good', description: 'Readily acknowledges that beliefs are unreasonable' },
      { value: 2, label: 'Fair', description: 'Reluctantly admits beliefs seem unreasonable but not convinced' },
      { value: 3, label: 'Poor', description: 'Maintains that beliefs are reasonable despite contrary evidence' },
      { value: 4, label: 'Absent/Delusional', description: 'Completely convinced that beliefs are reasonable' },
    ],
  },
];

export function SeverityInterviewScreen() {
  const navigate = useNavigate();
  const { severityScores, updateScore, targetObsessions, targetCompulsions, targetAvoidance } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState('');

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const currentScore = severityScores.find(s => s.questionId === currentQuestion.id);

  const handleScoreSelect = (score: number) => {
    updateScore(currentQuestion.id, score, notes);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = QUESTIONS[currentQuestionIndex + 1];
      const nextScore = severityScores.find(s => s.questionId === nextQuestion.id);
      setNotes(nextScore?.notes || '');
    } else {
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = QUESTIONS[currentQuestionIndex - 1];
      const prevScore = severityScores.find(s => s.questionId === prevQuestion.id);
      setNotes(prevScore?.notes || '');
    }
  };

  const obsessionScore = useMemo(() => {
    return QUESTIONS.filter(q => q.section === 'obsessions' && q.scored)
      .reduce((sum, q) => {
        const score = severityScores.find(s => s.questionId === q.id);
        return sum + (score?.score || 0);
      }, 0);
  }, [severityScores]);

  const compulsionScore = useMemo(() => {
    return QUESTIONS.filter(q => q.section === 'compulsions' && q.scored)
      .reduce((sum, q) => {
        const score = severityScores.find(s => s.questionId === q.id);
        return sum + (score?.score || 0);
      }, 0);
  }, [severityScores]);

  const totalScore = obsessionScore + compulsionScore;

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const questionsBySection = useMemo(() => {
    return {
      obsessions: QUESTIONS.filter(q => q.section === 'obsessions'),
      compulsions: QUESTIONS.filter(q => q.section === 'compulsions'),
      insight: QUESTIONS.filter(q => q.section === 'insight'),
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/target-symptoms')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-foreground">Severity Interview</h1>
              <p className="text-sm text-muted-foreground mt-1">Y-BOCS Scoring</p>
            </div>
            <Button onClick={() => navigate('/results')}>Complete Interview</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  {Object.entries(questionsBySection).map(([section, questions]) => {
                    const completedCount = questions.filter(q =>
                      severityScores.some(s => s.questionId === q.id)
                    ).length;
                    const isActive = questions.some(q => q.id === currentQuestion.id);

                    return (
                      <div
                        key={section}
                        className={`p-2 rounded-md ${
                          isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{section}</span>
                          <span className="text-xs">
                            {completedCount}/{questions.length}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-3">Target Symptoms</h3>
              <div className="space-y-3">
                {targetObsessions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Obsessions
                    </h4>
                    <ul className="space-y-1">
                      {targetObsessions.map(symptom => (
                        <li key={symptom.id} className="text-xs text-foreground">
                          {symptom.rank}. {symptom.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {targetCompulsions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Compulsions
                    </h4>
                    <ul className="space-y-1">
                      {targetCompulsions.map(symptom => (
                        <li key={symptom.id} className="text-xs text-foreground">
                          {symptom.rank}. {symptom.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {targetAvoidance.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Avoidance
                    </h4>
                    <ul className="space-y-1">
                      {targetAvoidance.map(symptom => (
                        <li key={symptom.id} className="text-xs text-foreground">
                          {symptom.rank}. {symptom.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="col-span-6">
            <div className="space-y-6">
              {currentQuestion.instruction && (
                <Card className="bg-accent/10 border-accent">
                  <p className="text-sm text-foreground italic">
                    {currentQuestion.instruction}
                  </p>
                </Card>
              )}

              <Card>
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {currentQuestion.section.charAt(0).toUpperCase() + currentQuestion.section.slice(1)} • Question {currentQuestion.number}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {currentQuestion.title}
                  </h2>
                  <p className="text-foreground">
                    {currentQuestion.prompt}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleScoreSelect(option.value)}
                      className={`w-full flex items-start gap-4 p-4 border-2 rounded-lg text-left transition-all ${
                        currentScore?.score === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={currentScore?.score === option.value}
                        onChange={() => handleScoreSelect(option.value)}
                        className="mt-1 w-5 h-5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-semibold text-foreground">
                            {option.value}
                          </span>
                          <span className="font-semibold text-foreground">
                            {option.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Optional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      if (currentScore) {
                        updateScore(currentQuestion.id, currentScore.score, e.target.value);
                      }
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                    placeholder="Add any relevant clinical notes..."
                  />
                </div>
              </Card>

              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  {currentQuestionIndex < QUESTIONS.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    'Finish'
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <Card className="sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Live Score Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {totalScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Y-BOCS Score</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm text-foreground">Obsessions</span>
                    <span className="text-lg font-semibold text-foreground">{obsessionScore}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm text-foreground">Compulsions</span>
                    <span className="text-lg font-semibold text-foreground">{compulsionScore}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">
                    Not included in total:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Question 1b (Obsession-free interval)</li>
                    <li>• Question 6b (Compulsion-free interval)</li>
                    <li>• Question 11 (Insight)</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="w-full bg-secondary rounded-full h-3 mb-2">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min((totalScore / 40) * 100, 100)}%`,
                        backgroundColor:
                          totalScore >= 32 ? '#dc2626' :
                          totalScore >= 24 ? '#ea580c' :
                          totalScore >= 16 ? '#f59e0b' :
                          totalScore >= 8 ? '#14B8A6' : '#6B7280',
                      }}
                    />
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    {totalScore === 0 ? 'No score yet' :
                     totalScore <= 7 ? 'Subclinical' :
                     totalScore <= 15 ? 'Mild' :
                     totalScore <= 23 ? 'Moderate' :
                     totalScore <= 31 ? 'Severe' : 'Extreme'}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
