import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft } from 'lucide-react';

export function InstructionsScreen() {
  const navigate = useNavigate();
  const { acknowledgedInstructions, setAcknowledgedInstructions } = useAssessment();
  const [localAcknowledged, setLocalAcknowledged] = useState(acknowledgedInstructions);

  const handleContinue = () => {
    setAcknowledgedInstructions(true);
    navigate('/brief-instructions');
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
              <h1 className="text-[32px] font-semibold text-foreground">General Instructions</h1>
              <p className="text-muted-foreground mt-1">Step 2 of 10</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="prose max-w-none">
              <p className="text-foreground leading-relaxed mb-4">
                This rating scale is designed to rate the severity and record the types of symptoms in a patient diagnosed with obsessive-compulsive disorder (OCD). In general, patient's report on the presence and associated severity of symptoms; however, final ratings are based on the clinical judgment of the interviewer. Rate the characteristics of each item during the prior week (or since the last visit) up until and including the time of the interview. Scores should reflect the average (mean) occurrence of each item for the entire week.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                This rating scale should be used as a semi-structured interview (versus self-report). The interviewer should assess the items in the listed order and use the questions provided. However, the interviewer is free to ask additional questions. This includes for purposes of clarification and to further assess items not listed on the Symptom Checklist but impress as obsessive-compulsive symptomology. If the patient volunteers information at any time during the interview, that information will be considered. Ratings should be based primarily on patient reports, reports from collateral informants if applicable (see below), and observations gained during the interview.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                Additional information furnished by others (e.g., spouse or parent) may be included in a determination of the ratings only if (1) such information is judged essential to adequately assess symptom presence and severity and (2) consistent week-to-week reporting can be ensured by having the same informant(s) present for each rating session.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Before proceeding with the questions, define "obsessions", "compulsions" and "avoidance" for the patient as follows:
              </p>
              <div className="p-4 bg-secondary rounded-lg mb-4">
                <p className="text-foreground leading-relaxed mb-3">
                  "OBSESSIONS are unwelcome and distressing ideas, thoughts, images or impulses that repeatedly enter your mind. They may seem to occur against your will. They may be repugnant to you, you may recognize them as senseless, and they may not fit your personality or value system."
                </p>
                <p className="text-foreground leading-relaxed">
                  "An example of an obsession is: the recurrent thought you might be responsible for making a loved one ill because you weren't careful enough about washing your hands."
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg mb-4">
                <p className="text-foreground leading-relaxed mb-3">
                  "COMPULSIONS, on the other hand, are behaviors or mental acts that you feel driven to perform although you may recognize them as senseless or excessive. At times, you may try to resist doing them, but this may prove difficult. You may experience anxiety or distress that does not diminish until the behavior or mental act is completed. Sometimes compulsions are also referred to as rituals."
                </p>
                <p className="text-foreground text-sm italic mb-3">
                  [The term "rituals" will be used interchangeably with compulsions, although the former usually connotes particularly rule-governed, rigid, or complex behavior]
                </p>
                <p className="text-foreground leading-relaxed">
                  "An example of a compulsion is: the need to repeatedly check appliances, water faucets, and the lock on the front door before you can leave the house. While most compulsions are observable behaviors, some are unobservable mental acts, such as silent checking or having to recite nonsense phrases to yourself each time you have a bad thought. These mental compulsions are different from obsessions, which are unwelcome and senseless ideas that enter your mind against your will."
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg mb-4">
                <p className="text-foreground leading-relaxed">
                  "Avoidance of feared situations is often used in addition to or in place of compulsions to prevent contact with triggers to OCD. An example would be not reading or listening to the news out of concern that some stories will spark obsessions." [Marked avoidance can negatively impact functioning and perpetuate symptoms of OCD.]
                </p>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                "Do you have any questions about what these words mean?" [If not, proceed.]
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                On repeated testing it is not always necessary to re-read these definitions and examples if it can be established that the patient understands them. It may be sufficient to remind the patient that obsessions are the thoughts or concerns and compulsions are the things one feels driven to do, including covert mental acts.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Have the patient enumerate current obsessions and compulsions to generate a list of target symptoms. Use the Y-BOCS™ Symptom Checklist as an aid for identifying recent and past symptoms. For the purposes of the initial administration of the Symptom Checklist, "recent" symptoms are defined as having been present in the last 30-90 days, including the day of the interview. By definition, "past" symptoms are those that appeared more than 90 days prior to the initial assessment. It is useful to identify and be aware of past symptoms as they may re-appear during subsequent rating sessions. Another reason for identifying past symptoms is for research purposes. The lifetime obsessive-compulsive symptom profile may hold valuable information for characterizing possible subtypes of OCD. The term "current" symptoms refers to those present during the time frame being measured by the severity items of the Y-BOCS™. In most instances, this time frame ranges from one to two weeks, the most common interval between visits in clinical trials. The Y-BOCS™ is designed to measure symptom severity over a time period as short as 24 hours. As there is much overlap between current and recent symptoms, these terms are generally used interchangeably.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Once recent and current types of obsessions and compulsions are identified, organize and list the on the Target Symptoms form according to clinically convenient distinctions (e.g., divide target compulsions into checking and washing). Describe salient features of the symptoms so that they can be more easily tracked (e.g., in addition to listing checking, specify what the patient checks for). Be sure to indicate which are the most prominent symptoms, i.e., those that will be the major focus of assessment. Note, however, that the final score for each item should reflect a composite rating for all the patient's obsessions or compulsions.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Be sure to describe avoidance behaviors in the Target Symptoms form. It will be important to ascertain whether avoidance is contributing to a low score on time spent performing compulsions. In such cases, be sure to capture the impact of avoidance on the interference and distress items.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                The rater must ascertain whether reported behaviors are bona fide symptoms of OCD and not symptoms of another disorder, such as specific phobia, generalized anxiety disorder, or a paraphilia. All the items in Symptom Checklist with an asterisk "*" call attention to consideration of a differential diagnosis. For example, the differential diagnosis between certain complex motor tics and certain compulsions (e.g., those involving touching) may be challenging. In such cases, it is particularly important to provide explicit descriptions of the target symptoms and to be consistent in subsequent ratings. Separate assessment of tic severity with a tic rating instrument may be necessary in such cases. If indicated, complete the tic-related specifier as per DSM-5.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Some of the items listed on the Y-BOCS™ Symptom Checklist, denote symptoms of conditions manifested by Obsessive-Compulsive Related Disorders (OCRD) such as Trichotillomania, Body Dysmorphic Disorder, Hoarding Disorder and Excoriation Disorder in DSM-5. Do not count these symptoms as obsessive-compulsive symptoms if the patient meets criteria for one of these OCRD.
              </p>
              <p className="text-foreground leading-relaxed">
                On repeated testing, review and, if necessary, revise target obsessions prior to administering the severity items. Items 1-10 (excluding items 1b and 6b) are used to determine the total score. The total Y-BOCS™ score is the sum of items 1-10 (excluding 1b and 6b), whereas the obsession and compulsion subtotals are the sums of items 1-5 (excluding 1b) and 6-10 (excluding 6b), respectively.
              </p>
            </div>
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
                I have read and understand the General Instructions
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
