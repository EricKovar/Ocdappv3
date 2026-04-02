import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, Download, Save, FileText } from 'lucide-react';

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
    targetObsessions,
    targetCompulsions,
    targetAvoidance,
  } = useAssessment();

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

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <button
            onClick={() => navigate('/severity-interview')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold text-foreground mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">Y-BOCS Clinical Summary</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-8 bg-primary/5 border-2 border-primary">
              <div className="text-5xl font-bold text-primary mb-3">
                {scores.total}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                Total Y-BOCS Score
              </div>
              <div
                className="text-sm font-semibold px-4 py-1.5 rounded-full inline-block"
                style={{
                  backgroundColor: `${severityCategory?.color}20`,
                  color: severityCategory?.color,
                }}
              >
                {severityCategory?.label}
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card className="flex items-center justify-between p-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Obsessions Subtotal</div>
                  <div className="text-3xl font-bold text-foreground">{scores.obsessionScore}</div>
                </div>
                <div className="text-sm text-muted-foreground">/ 20</div>
              </Card>

              <Card className="flex items-center justify-between p-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Compulsions Subtotal</div>
                  <div className="text-3xl font-bold text-foreground">{scores.compulsionScore}</div>
                </div>
                <div className="text-sm text-muted-foreground">/ 20</div>
              </Card>
            </div>
          </div>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Score Interpretation</h2>
            <div className="space-y-2">
              {SEVERITY_RANGES.map((range) => {
                const isActive = scores.total >= range.min && scores.total <= range.max;
                return (
                  <div
                    key={range.label}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      isActive
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-secondary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: range.color }}
                      />
                      <span className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
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
            <h2 className="text-xl font-semibold text-foreground mb-4">Additional Measures</h2>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Insight Score</div>
                  <div className="text-lg font-semibold text-foreground">
                    {scores.insightScore === 0 ? 'Excellent' :
                     scores.insightScore === 1 ? 'Good' :
                     scores.insightScore === 2 ? 'Fair' :
                     scores.insightScore === 3 ? 'Poor' :
                     'Absent/Delusional'}
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {scores.insightScore}/4
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Not included in total Y-BOCS score
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Target Symptoms Summary</h2>
            <div className="space-y-6">
              {targetObsessions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Top Obsessions</h3>
                  <ul className="space-y-2">
                    {targetObsessions.map(symptom => (
                      <li key={symptom.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {symptom.rank}
                        </div>
                        <span className="text-sm text-foreground flex-1">{symptom.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {targetCompulsions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Top Compulsions</h3>
                  <ul className="space-y-2">
                    {targetCompulsions.map(symptom => (
                      <li key={symptom.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {symptom.rank}
                        </div>
                        <span className="text-sm text-foreground flex-1">{symptom.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {targetAvoidance.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Top Avoidance Behaviors</h3>
                  <ul className="space-y-2">
                    {targetAvoidance.map(symptom => (
                      <li key={symptom.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {symptom.rank}
                        </div>
                        <span className="text-sm text-foreground flex-1">{symptom.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              View Full Report
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save to EHR
            </Button>
          </div>

          <div className="flex justify-center pt-6">
            <Button onClick={() => navigate('/confirmation')} className="px-12">
              Continue to Confirmation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
