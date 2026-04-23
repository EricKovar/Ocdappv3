import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft } from 'lucide-react';

export function BriefInstructionsScreen() {
  const navigate = useNavigate();
  const { acknowledgedInstructions, setAcknowledgedInstructions } = useAssessment();
  const [localAcknowledged, setLocalAcknowledged] = useState(acknowledgedInstructions);

  const handleContinue = () => {
    setAcknowledgedInstructions(true);
    navigate('/obsessions');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-semibold text-foreground">Brief Instructions</h1>
              <p className="text-muted-foreground mt-1">Step 3 of 10</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Purpose of Assessment</h2>
            <p className="text-foreground leading-relaxed">
              The Y-BOCS is a clinician-administered scale designed to evaluate the severity and types of obsessive-compulsive symptoms experienced by the patient over the past week or since the last assessment.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Definitions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Obsessions</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Recurrent and persistent thoughts, impulses, or images that are experienced as intrusive and inappropriate and cause marked anxiety or distress. The individual attempts to ignore, suppress, or neutralize them with another thought or action.
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Compulsions</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Repetitive behaviors or mental acts that the person feels driven to perform in response to an obsession or according to rules that must be applied rigidly. The behaviors or mental acts are aimed at preventing or reducing distress or preventing some dreaded event or situation.
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Avoidance</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Behaviors used to minimize exposure to triggers associated with obsessions or to reduce the need to perform compulsions. Avoidance may limit functioning or serve as a substitute for rituals, and should be included in the overall symptom profile.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">How to Conduct the Assessment</h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>This is a semi-structured interview that assesses symptoms over the past week or since the last visit</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Collateral input is best used when consistent over the course of repeated administrations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Capture average severity, not peak symptoms only</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Additional clarifying questions are allowed to ensure accurate assessment</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Collateral input should only be used when consistent and necessary</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Identifying Symptoms</h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>List both current and past symptoms using the Symptom Checklist for obsessions, compulsions, and avoidance, as a guide</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Rater must ascertain whether reported behaviors are bona fide symptoms of OCD, and not symptoms of another disorder such as generalized anxiety disorder or gender dysphoria</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Refer to the Target Symptoms generated in the first visit as a guide to the most prominent symptoms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Be sure to include avoidance behaviors</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Administering Severity Items</h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Rate the characteristics of each item during the prior week (or since the last rating session) up until and including the time of the interview</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>All severity items have associated probes and anchor points</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">•</span>
                <span>Base your rating for these items on your best estimate, using all information that's been provided to you in context of your clinical experience with OCD</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-4">Clinical Considerations</h2>
            <p className="text-foreground leading-relaxed">
              Use clinical judgment to differentiate OCD symptoms from symptoms of other psychiatric disorders. Consider the context, duration, and impact of symptoms when making diagnostic decisions.
            </p>
          </Card>

          <Card className="bg-secondary/50">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localAcknowledged}
                onChange={(e) => setLocalAcknowledged(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-foreground font-medium">
                I understand the definitions and assessment guidelines
              </span>
            </label>
          </Card>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-border sticky bottom-0 bg-background pb-8">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!localAcknowledged}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
