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
    prompt: 'How much of your time is occupied by obsessive thoughts? [When obsessions occur as brief, intermittent intrusions, it may be difficult to assess time occupied by them in terms of total hours. In such cases, posing item #2 first may help identify most appropriate response to item #1. Be sure to exclude ruminations and preoccupations that, unlike obsessions, are ego-syntonic and rational – albeit excessive.]',
    scored: true,
    instruction: '"I am now going to ask several questions about your obsessive thoughts." [Make specific reference to the patient\'s target obsessions.]',
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Less than 1 hr/day or occasional intrusion.' },
      { value: 2, label: '2', description: 'l hr/day to 3 hrs/day or frequent intrusion.' },
      { value: 3, label: '3', description: 'Greater than 3 and up to 8 hrs/day or very frequent intrusion.' },
      { value: 4, label: '4', description: 'Greater than 8 hrs/day or near constant intrusion.' },
    ],
  },
  {
    id: 'obs-1b',
    section: 'obsessions',
    number: '1b',
    title: 'Obsession-Free Interval',
    prompt: 'How long can you go without experiencing obsessive thoughts? [If necessary, ask: What is the longest block of time in which obsessions are absent?]',
    scored: false,
    options: [
      { value: 0, label: '0', description: 'No symptoms.' },
      { value: 1, label: '1', description: 'Long symptom-free interval, more than 8 consecutive hours/day symptom-free.' },
      { value: 2, label: '2', description: 'Moderately long symptom-free interval, more than 3 and up to 8 consecutive hours/day symptom-free.' },
      { value: 3, label: '3', description: 'Short symptom-free interval, from 1 to 3 consecutive hours/day symptom-free.' },
      { value: 4, label: '4', description: 'Extremely short symptom-free interval, less than 1 consecutive hour/day symptom-free.' },
    ],
  },
  {
    id: 'obs-2',
    section: 'obsessions',
    number: '2',
    title: 'Interference Due to Obsessive Thoughts',
    prompt: 'How much do your obsessive thoughts interfere with your social or work (or role) functioning? Is there anything that you don\'t do because of them? [If currently not working determine how much performance would be affected if patient were employed.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Mild, slight interference with social or occupational activities, but overall performance not impaired.' },
      { value: 2, label: '2', description: 'Moderate, definite interference with social or occupational performance, but still manageable.' },
      { value: 3, label: '3', description: 'Severe, causes substantial impairment in social or occupational performance.' },
      { value: 4, label: '4', description: 'Extreme, incapacitating.' },
    ],
  },
  {
    id: 'obs-3',
    section: 'obsessions',
    number: '3',
    title: 'Distress Associated with Obsessive Thoughts',
    prompt: 'How much distress do your obsessive thoughts cause you? [In most cases, distress is equated with anxiety; however, patients may report that their obsessions are "disturbing" but deny "anxiety." Only rate anxiety that seems triggered by obsessions, not generalized anxiety or anxiety associated with other conditions.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Mild, not too disturbing.' },
      { value: 2, label: '2', description: 'Moderate, disturbing, but still manageable.' },
      { value: 3, label: '3', description: 'Severe, very disturbing.' },
      { value: 4, label: '4', description: 'Extreme, near constant and disabling distress.' },
    ],
  },
  {
    id: 'obs-4',
    section: 'obsessions',
    number: '4',
    title: 'Resistance Against Obsessions',
    prompt: 'How much of an effort do you make to resist the obsessive thoughts? How often do you try to disregard or turn your attention away from these thoughts as they enter your mind? [Only rate effort made to resist, not success or failure in actually controlling the obsessions. How much the patient resists the obsessions may or may not correlate with his ability to control them. Note that this item does not directly measure the severity of the obsessions; rather it rates a manifestation of health, i.e., the effort the patient makes to counteract the obsessions. Thus, the more the patient tries to resist, the less impaired is this aspect of his functioning. If the obsessions are minimal, the patient may not feel the need to resist them. In such cases, a rating of "0" should be given.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'Makes an effort to always resist, or symptoms so minimal doesn\'t need to actively resist.' },
      { value: 1, label: '1', description: 'Tries to resist most of the time.' },
      { value: 2, label: '2', description: 'Makes some effort to resist.' },
      { value: 3, label: '3', description: 'Yields to all obsessions without attempting to control them, but does so with some reluctance.' },
      { value: 4, label: '4', description: 'Completely and willingly yields to all obsessions.' },
    ],
  },
  {
    id: 'obs-5',
    section: 'obsessions',
    number: '5',
    title: 'Degree of Control Over Obsessive Thoughts',
    prompt: 'How much control do you have over your obsessive thoughts? How successful are you in stopping or diverting your obsessive thinking? Can you dismiss them? [In contrast to the preceding item on resistance, the ability of the patient to control his obsessions is more closely related to the severity of the obsessions.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'Complete control.' },
      { value: 1, label: '1', description: 'Much control, usually able to stop or divert obsessions with some effort and concentration.' },
      { value: 2, label: '2', description: 'Moderate control, sometimes able to stop or divert obsessions.' },
      { value: 3, label: '3', description: 'Little control, rarely successful in stopping or dismissing obsessions, can only divert attention with difficulty.' },
      { value: 4, label: '4', description: 'No control, experienced as completely involuntary, rarely able to even momentarily alter obsessive thinking.' },
    ],
  },
  {
    id: 'comp-6',
    section: 'compulsions',
    number: '6',
    title: 'Time Spent Performing Compulsive Behaviors',
    prompt: 'How much time do you spend performing compulsive behaviors? [When rituals involving activities of daily living are chiefly present, ask: How much longer than most people does it take to complete routine activities because of your rituals?] How much time do you spend doing these things? [When compulsions occur as brief, intermittent behaviors, it may be difficult to assess time spent performing them in terms of total hours. In such cases, estimate time by determining how frequently they are performed. Consider both the number of times compulsions are performed and how many hours of the day are affected. Count separate times, not number of repetitions; e.g., a patient who goes into the bathroom twenty different times a day to wash his hands 5 times very quickly, performs compulsions 20 times a day, not 5 or 5 x 20 = 100. Ask: How frequently do you perform compulsions? [In most cases compulsions are observable behaviors (e.g., hand washing), but some compulsions are covert (e.g., silent checking).]',
    scored: true,
    instruction: 'The next several questions are about your compulsive behaviors.',
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Mild, spends less than 1 hr/day performing compulsions, or occasional performance of compulsive behaviors.' },
      { value: 2, label: '2', description: 'Moderate, spends from 1 to 3 hrs/day performing compulsions, or frequent performance of compulsive behaviors.' },
      { value: 3, label: '3', description: 'Severe, spends more than 3 and up to 8 hrs/day performing compulsions, or very frequent performance of compulsive behaviors.' },
      { value: 4, label: '4', description: 'Extreme, spends more than 8 hrs/day performing compulsions, or near constant performance of compulsive behaviors (too numerous to count).' },
    ],
  },
  {
    id: 'comp-6b',
    section: 'compulsions',
    number: '6b',
    title: 'Compulsion-Free Interval',
    prompt: 'How long can you go without performing compulsive behaviors? [If necessary ask: What is the longest block of time in which compulsions are absent?]',
    scored: false,
    options: [
      { value: 0, label: '0', description: 'No symptoms.' },
      { value: 1, label: '1', description: 'Long symptom-free interval, more than 8 consecutive hours/day symptom-free.' },
      { value: 2, label: '2', description: 'Moderately long symptom-free interval, more than 3 and up to 8 consecutive hours/day symptom-free.' },
      { value: 3, label: '3', description: 'Short symptom-free interval, from 1 to 3 consecutive hours/day symptom-free.' },
      { value: 4, label: '4', description: 'Extremely short symptom-free interval, less than 1 consecutive hour/day symptom-free.' },
    ],
  },
  {
    id: 'comp-7',
    section: 'compulsions',
    number: '7',
    title: 'Interference Due to Compulsive Behaviors',
    prompt: 'How much do your compulsive behaviors interfere with your social or work (or role) functioning? Is there anything that you don\'t do because of the compulsions? [If currently not working determine how much performance would be affected if patient were employed.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Mild, slight interference with social or occupational activities, but overall performance not impaired.' },
      { value: 2, label: '2', description: 'Moderate, definite interference with social or occupational performance, but still manageable.' },
      { value: 3, label: '3', description: 'Severe, causes substantial impairment in social or occupational performance.' },
      { value: 4, label: '4', description: 'Extreme, incapacitating.' },
    ],
  },
  {
    id: 'comp-8',
    section: 'compulsions',
    number: '8',
    title: 'Distress Associated with Compulsive Behavior',
    prompt: 'How would you feel if prevented from performing your compulsion(s)? [Pause] How anxious would you become? [Rate degree of distress patient would experience if performance of the compulsion were suddenly interrupted without reassurance offered. In most, but not all cases, performing compulsions reduces anxiety. If, in the judgment of the interviewer, anxiety is actually reduced by preventing compulsions in the manner described above, then ask: How anxious do you get while performing compulsions until you are satisfied they are completed?]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'None.' },
      { value: 1, label: '1', description: 'Mild, only slightly anxious if compulsions prevented, or only slight anxiety during performance of compulsions.' },
      { value: 2, label: '2', description: 'Moderate, reports that anxiety would mount but remain manageable if compulsions prevented, or that anxiety increases but remains manageable during performance of compulsions.' },
      { value: 3, label: '3', description: 'Severe, prominent and very disturbing increase in anxiety if compulsions interrupted, or prominent and very disturbing increase in anxiety during performance of compulsions.' },
      { value: 4, label: '4', description: 'Extreme, incapacitating anxiety from any intervention aimed at modifying activity, or incapacitating anxiety develops during performance of compulsions.' },
    ],
  },
  {
    id: 'comp-9',
    section: 'compulsions',
    number: '9',
    title: 'Resistance Against Compulsions',
    prompt: 'How much of an effort do you make to resist the compulsions? [Only rate effort made to resist, not success or failure in actually controlling the compulsions. How much the patient resists the compulsions may or may not correlate with his ability to control them. Note that this item does not directly measure the severity of the compulsions; rather it rates a manifestation of health, i.e., the effort the patient makes to counteract the compulsions. Thus, the more the patient tries to resist, the less impaired is this aspect of his functioning. If the compulsions are minimal, the patient may not feel the need to resist them. In such cases, a rating of "0" should be given.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'Makes an effort to always resist, or symptoms so minimal doesn\'t need to actively resist.' },
      { value: 1, label: '1', description: 'Tries to resist most of the time.' },
      { value: 2, label: '2', description: 'Makes some effort to resist.' },
      { value: 3, label: '3', description: 'Yields to all compulsions without attempting to control them, but does so with some reluctance.' },
      { value: 4, label: '4', description: 'Completely and willingly yields to all compulsions.' },
    ],
  },
  {
    id: 'comp-10',
    section: 'compulsions',
    number: '10',
    title: 'Degree of Control Over Compulsive Behavior',
    prompt: 'How strong is the drive to perform the compulsive behavior? [Pause] How much control do you have over the compulsions? [In contrast to the preceding item on resistance, the ability of the patient to control his compulsions is more closely related to the severity of the compulsions.]',
    scored: true,
    options: [
      { value: 0, label: '0', description: 'Complete control.' },
      { value: 1, label: '1', description: 'Much control, experiences pressure to perform the behavior but usually able to exercise voluntary control over it.' },
      { value: 2, label: '2', description: 'Moderate control, strong pressure to perform behavior, can control it only with difficulty.' },
      { value: 3, label: '3', description: 'Little control, very strong drive to perform behavior, must be carried to completion, can only delay with difficulty.' },
      { value: 4, label: '4', description: 'No control, drive to perform behavior experienced as completely involuntary and overpowering, rarely able to even momentarily delay activity.' },
    ],
  },
  {
    id: 'insight-11',
    section: 'insight',
    number: '11',
    title: 'Insight into Obsessions and Compulsions',
    prompt: 'Do you think your concerns or behaviors are reasonable? [Pause] What do you think would happen if you did not perform the compulsion(s)? Are you convinced something would really happen? [Rate patient\'s insight into the senselessness or excessiveness of his obsession(s) based on beliefs expressed at the time of the interview.]',
    scored: false,
    instruction: 'The next question is about your personal view of your symptoms.',
    options: [
      { value: 0, label: '0', description: 'Excellent insight, fully rational.' },
      { value: 1, label: '1', description: 'Good insight. Readily acknowledges absurdity or excessiveness of thoughts or behaviors but does not seem completely convinced that there isn\'t something besides anxiety to be concerned about (i.e., has some lingering doubts).' },
      { value: 2, label: '2', description: 'Fair insight. Reluctantly admits that thoughts or behaviors seem unreasonable or excessive, but wavers. May have some unrealistic fears, but no fixed convictions.' },
      { value: 3, label: '3', description: 'Poor insight. Maintains that thoughts or behaviors are not unreasonable or excessive, but acknowledges validity of contrary evidence (i.e., overvalued ideas present).' },
      { value: 4, label: '4', description: 'Lacks insight, delusional. Definitely convinced that concerns and behavior are reasonable, unresponsive to contrary evidence.' },
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