import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, Download, Save, FileText } from 'lucide-react';

interface ScoreRowProps {
  questionNumber: string;
  title: string;
  selectedScore?: number;
  options: { value: number; label: string }[];
  notScored?: boolean;
}

function ScoreRow({ questionNumber, title, selectedScore, options, notScored }: ScoreRowProps) {
  return (
    <div className={`grid grid-cols-12 border-b border-border ${notScored ? 'bg-secondary/30' : ''}`}>
      <div className="col-span-4 p-3 border-r border-border">
        <div className="flex items-start gap-2">
          <span className="font-semibold text-foreground">{questionNumber}.</span>
          <span className="text-sm text-foreground uppercase font-medium">{title}</span>
        </div>
        {notScored && (
          <span className="text-xs text-muted-foreground italic ml-6">
            (do not add to subtotal or total score)
          </span>
        )}
      </div>
      <div className="col-span-8 grid grid-cols-5">
        {options.map((option, index) => {
          const isSelected = selectedScore === option.value;
          return (
            <div
              key={option.value}
              className={`p-3 text-center ${
                index < options.length - 1 ? 'border-r border-border' : ''
              } ${isSelected ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
            >
              <div className="text-xs mb-1">{option.label}</div>
              <div className="text-lg font-bold">{option.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SEVERITY_RANGES = [
  { min: 0, max: 7, label: 'Subclinical', color: '#6B7280' },
  { min: 8, max: 15, label: 'Mild', color: '#14B8A6' },
  { min: 16, max: 23, label: 'Moderate', color: '#f59e0b' },
  { min: 24, max: 31, label: 'Severe', color: '#ea580c' },
  { min: 32, max: 40, label: 'Extreme', color: '#dc2626' },
];

export function ResultsScreen() {
  const navigate = useNavigate();
  const {
    severityScores,
    intakeData,
    targetObsessions,
    targetCompulsions,
    targetAvoidance,
  } = useAssessment();

  const getScore = (questionId: string) => {
    return severityScores.find(s => s.questionId === questionId)?.score;
  };

  const scores = useMemo(() => {
    const obsessionQuestions = ['obs-1', 'obs-2', 'obs-3', 'obs-4', 'obs-5'];
    const compulsionQuestions = ['comp-6', 'comp-7', 'comp-8', 'comp-9', 'comp-10'];
    const insightQuestion = 'insight-11';

    const obsessionScore = obsessionQuestions.reduce((sum, id) => {
      const score = severityScores.find(s => s.questionId === id);
      return sum + (score?.score || 0);
    }, 0);

    const compulsionScore = compulsionQuestions.reduce((sum, id) => {
      const score = severityScores.find(s => s.questionId === id);
      return sum + (score?.score || 0);
    }, 0);

    const insightScore = severityScores.find(s => s.questionId === insightQuestion)?.score || 0;

    const total = obsessionScore + compulsionScore;

    return { obsessionScore, compulsionScore, insightScore, total };
  }, [severityScores]);

  const severityCategory = useMemo(() => {
    return SEVERITY_RANGES.find(
      range => scores.total >= range.min && scores.total <= range.max
    );
  }, [scores.total]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/severity-interview')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-foreground">Y-BOCS™ Scoring Sheet</h1>
              <p className="text-sm text-muted-foreground mt-1">Assessment Results</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save to EHR
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-8">
        <div className="space-y-6">
          {/* Header Section */}
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase mb-1">Patient Name</div>
                    <div className="text-sm font-semibold text-foreground border-b border-border pb-2">
                      {intakeData.patientName || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase mb-1">Date</div>
                    <div className="text-sm font-semibold text-foreground border-b border-border pb-2">
                      {intakeData.date || currentDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase mb-1">Patient ID/MRN</div>
                    <div className="text-sm font-semibold text-foreground border-b border-border pb-2">
                      {intakeData.mrn || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase mb-1">Rater</div>
                    <div className="text-sm font-semibold text-foreground border-b border-border pb-2">
                      {intakeData.clinicianName || '—'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-8 text-center p-6 bg-primary/10 border-2 border-primary rounded-lg">
                <div className="text-xs text-muted-foreground uppercase mb-1">Y-BOCS™ Total</div>
                <div className="text-xs text-muted-foreground mb-2">(add items 1-10)</div>
                <div className="text-5xl font-bold text-primary mb-2">{scores.total}</div>
                <div
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${severityCategory?.color}20`,
                    color: severityCategory?.color,
                  }}
                >
                  {severityCategory?.label}
                </div>
              </div>
            </div>
          </Card>

          {/* Obsessions Section */}
          <Card className="p-0 overflow-hidden">
            <div className="bg-secondary/50 p-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">OBSESSIONS</h2>
            </div>

            <ScoreRow
              questionNumber="1"
              title="Time Spent on Obsessions"
              selectedScore={getScore('obs-1')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="1b"
              title="Obsession-Free Interval"
              selectedScore={getScore('obs-1b')}
              options={[
                { value: 0, label: 'No Symptoms' },
                { value: 1, label: 'Long' },
                { value: 2, label: 'Moderately Long' },
                { value: 3, label: 'Short' },
                { value: 4, label: 'Extremely Short' },
              ]}
              notScored
            />

            <ScoreRow
              questionNumber="2"
              title="Interference from Obsessions"
              selectedScore={getScore('obs-2')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="3"
              title="Distress of Obsessions"
              selectedScore={getScore('obs-3')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="4"
              title="Resistance"
              selectedScore={getScore('obs-4')}
              options={[
                { value: 0, label: 'Always resists' },
                { value: 1, label: '' },
                { value: 2, label: '' },
                { value: 3, label: '' },
                { value: 4, label: 'Completely yields' },
              ]}
            />

            <ScoreRow
              questionNumber="5"
              title="Control Over Obsessions"
              selectedScore={getScore('obs-5')}
              options={[
                { value: 0, label: 'Complete control' },
                { value: 1, label: 'Much control' },
                { value: 2, label: 'Moderate control' },
                { value: 3, label: 'Little control' },
                { value: 4, label: 'No control' },
              ]}
            />

            <div className="grid grid-cols-12 bg-primary/5 border-t-2 border-primary">
              <div className="col-span-4 p-4 border-r border-border">
                <div className="font-semibold text-foreground uppercase">Obsession Subtotal (add items 1-5)</div>
              </div>
              <div className="col-span-8 flex items-center justify-center p-4">
                <div className="text-3xl font-bold text-primary">{scores.obsessionScore}</div>
              </div>
            </div>
          </Card>

          {/* Compulsions Section */}
          <Card className="p-0 overflow-hidden">
            <div className="bg-secondary/50 p-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">COMPULSIONS</h2>
            </div>

            <ScoreRow
              questionNumber="6"
              title="Time Spent on Compulsions"
              selectedScore={getScore('comp-6')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="6b"
              title="Compulsion-Free Interval"
              selectedScore={getScore('comp-6b')}
              options={[
                { value: 0, label: 'No Symptoms' },
                { value: 1, label: 'Long' },
                { value: 2, label: 'Moderately Long' },
                { value: 3, label: 'Short' },
                { value: 4, label: 'Extremely Short' },
              ]}
              notScored
            />

            <ScoreRow
              questionNumber="7"
              title="Interference from Compulsions"
              selectedScore={getScore('comp-7')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="8"
              title="Distress from Compulsions"
              selectedScore={getScore('comp-8')}
              options={[
                { value: 0, label: 'None' },
                { value: 1, label: 'Mild' },
                { value: 2, label: 'Moderate' },
                { value: 3, label: 'Severe' },
                { value: 4, label: 'Extreme' },
              ]}
            />

            <ScoreRow
              questionNumber="9"
              title="Resistance"
              selectedScore={getScore('comp-9')}
              options={[
                { value: 0, label: 'Always resists' },
                { value: 1, label: '' },
                { value: 2, label: '' },
                { value: 3, label: '' },
                { value: 4, label: 'Completely yields' },
              ]}
            />

            <ScoreRow
              questionNumber="10"
              title="Control Over Compulsions"
              selectedScore={getScore('comp-10')}
              options={[
                { value: 0, label: 'Complete control' },
                { value: 1, label: 'Much control' },
                { value: 2, label: 'Moderate control' },
                { value: 3, label: 'Little control' },
                { value: 4, label: 'No control' },
              ]}
            />

            <div className="grid grid-cols-12 bg-primary/5 border-t-2 border-primary">
              <div className="col-span-4 p-4 border-r border-border">
                <div className="font-semibold text-foreground uppercase">Compulsion Subtotal (add items 6-10)</div>
              </div>
              <div className="col-span-8 flex items-center justify-center p-4">
                <div className="text-3xl font-bold text-primary">{scores.compulsionScore}</div>
              </div>
            </div>
          </Card>

          {/* Insight Section */}
          <Card className="p-0 overflow-hidden border-2 border-accent">
            <div className="grid grid-cols-12">
              <div className="col-span-4 p-4 bg-accent/10 border-r border-accent flex items-center">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">11.</span>
                  <span className="text-sm text-foreground uppercase font-semibold">Insight</span>
                </div>
              </div>
              <div className="col-span-8 grid grid-cols-5">
                {[
                  { value: 0, label: 'Excellent' },
                  { value: 1, label: 'Good', sub: 'some lingering doubts' },
                  { value: 2, label: 'Fair', sub: 'many unrealistic fears' },
                  { value: 3, label: 'Poor', sub: 'overvalued ideas' },
                  { value: 4, label: 'Absent', sub: 'delusional' },
                ].map((option, index) => {
                  const isSelected = getScore('insight-11') === option.value;
                  return (
                    <div
                      key={option.value}
                      className={`p-3 text-center ${
                        index < 4 ? 'border-r border-accent' : ''
                      } ${isSelected ? 'bg-accent text-white font-semibold' : 'bg-accent/10'}`}
                    >
                      <div className="text-xs mb-1">{option.label}</div>
                      {option.sub && <div className="text-[10px] mb-1">{option.sub}</div>}
                      <div className="text-lg font-bold">{option.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-foreground mb-4">Score Interpretation</h3>
              <div className="space-y-2">
                {SEVERITY_RANGES.map((range) => {
                  const isActive = scores.total >= range.min && scores.total <= range.max;
                  return (
                    <div
                      key={range.label}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isActive
                          ? 'border-primary bg-primary/5 font-semibold'
                          : 'border-border bg-secondary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: range.color }}
                        />
                        <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
                          {range.label}
                        </span>
                      </div>
                      <span className={`text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {range.min}–{range.max}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-foreground mb-4">Target Symptoms Summary</h3>
              <div className="space-y-4">
                {targetObsessions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Principal Obsessions
                    </h4>
                    <ul className="space-y-1">
                      {targetObsessions.slice(0, 3).map(symptom => (
                        <li key={symptom.id} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="font-semibold">{symptom.rank}.</span>
                          <span>{symptom.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {targetCompulsions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Principal Compulsions
                    </h4>
                    <ul className="space-y-1">
                      {targetCompulsions.slice(0, 3).map(symptom => (
                        <li key={symptom.id} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="font-semibold">{symptom.rank}.</span>
                          <span>{symptom.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {targetAvoidance.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Principal Avoidance
                    </h4>
                    <ul className="space-y-1">
                      {targetAvoidance.slice(0, 3).map(symptom => (
                        <li key={symptom.id} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="font-semibold">{symptom.rank}.</span>
                          <span>{symptom.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-center pt-6 gap-4">
            <Button variant="secondary" onClick={() => navigate('/')}>
              Return to Home
            </Button>
            <Button onClick={() => navigate('/confirmation')} className="px-12">
              Complete Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}