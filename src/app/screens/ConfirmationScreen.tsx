import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CheckCircle, Download, Save, FileText, Home } from 'lucide-react';

const SEVERITY_RANGES = [
  { min: 0, max: 7, label: 'Subclinical' },
  { min: 8, max: 15, label: 'Mild' },
  { min: 16, max: 23, label: 'Moderate' },
  { min: 24, max: 31, label: 'Severe' },
  { min: 32, max: 40, label: 'Extreme' },
];

export function ConfirmationScreen() {
  const navigate = useNavigate();
  const {
    intakeData,
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

  const severityLabel = useMemo(() => {
    const category = SEVERITY_RANGES.find(
      range => scores.total >= range.min && scores.total <= range.max
    );
    return category?.label || 'Unknown';
  }, [scores.total]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-[32px] font-semibold text-foreground mb-2">Assessment Complete</h1>
          <p className="text-lg text-muted-foreground">Y-BOCS Assessment Saved</p>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Assessment Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Patient Name</span>
                <span className="font-medium text-foreground">{intakeData.patientName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">
                  {new Date(intakeData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Clinician</span>
                <span className="font-medium text-foreground">{intakeData.clinicianName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">MRN</span>
                <span className="font-medium text-foreground">{intakeData.mrn}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Total Y-BOCS Score</span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">{scores.total}</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {severityLabel}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Score Breakdown</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {scores.obsessionScore}
                </div>
                <div className="text-sm text-muted-foreground">Obsessions</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {scores.compulsionScore}
                </div>
                <div className="text-sm text-muted-foreground">Compulsions</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {scores.insightScore === 0 ? 'Excellent' :
                   scores.insightScore === 1 ? 'Good' :
                   scores.insightScore === 2 ? 'Fair' :
                   scores.insightScore === 3 ? 'Poor' : 'Absent'}
                </div>
                <div className="text-sm text-muted-foreground">Insight</div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Target Symptoms</h2>
            <div className="space-y-4">
              {targetObsessions.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Obsessions
                  </h3>
                  <ul className="space-y-1.5">
                    {targetObsessions.map(symptom => (
                      <li key={symptom.id} className="text-sm text-foreground">
                        {symptom.rank}. {symptom.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {targetCompulsions.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Compulsions
                  </h3>
                  <ul className="space-y-1.5">
                    {targetCompulsions.map(symptom => (
                      <li key={symptom.id} className="text-sm text-foreground">
                        {symptom.rank}. {symptom.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {targetAvoidance.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Avoidance
                  </h3>
                  <ul className="space-y-1.5">
                    {targetAvoidance.map(symptom => (
                      <li key={symptom.id} className="text-sm text-foreground">
                        {symptom.rank}. {symptom.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save to EHR
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="flex items-center justify-center gap-2" onClick={() => navigate('/results')}>
              <FileText className="w-4 h-4" />
              View Full Report
            </Button>
            <Button className="flex items-center justify-center gap-2" onClick={() => navigate('/')}>
              <Home className="w-4 h-4" />
              Start New Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
