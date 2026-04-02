import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IntakeData {
  patientName: string;
  dateOfBirth: string;
  mrn: string;
  date: string;
  clinicianName: string;
}

export interface SymptomItem {
  id: string;
  label: string;
  category: string;
  current: boolean;
  past: boolean;
  primary: boolean;
}

export interface TargetSymptom {
  id: string;
  label: string;
  rank: number;
}

export interface SeverityScore {
  questionId: string;
  score: number;
  notes?: string;
}

interface AssessmentContextType {
  intakeData: IntakeData;
  setIntakeData: (data: IntakeData) => void;
  acknowledgedInstructions: boolean;
  setAcknowledgedInstructions: (value: boolean) => void;
  selectedSymptoms: SymptomItem[];
  setSelectedSymptoms: (symptoms: SymptomItem[]) => void;
  selectedObsessions: SymptomItem[];
  setSelectedObsessions: (symptoms: SymptomItem[]) => void;
  selectedCompulsions: SymptomItem[];
  setSelectedCompulsions: (symptoms: SymptomItem[]) => void;
  selectedAvoidance: SymptomItem[];
  setSelectedAvoidance: (symptoms: SymptomItem[]) => void;
  targetObsessions: TargetSymptom[];
  setTargetObsessions: (symptoms: TargetSymptom[]) => void;
  targetCompulsions: TargetSymptom[];
  setTargetCompulsions: (symptoms: TargetSymptom[]) => void;
  targetAvoidance: TargetSymptom[];
  setTargetAvoidance: (symptoms: TargetSymptom[]) => void;
  severityScores: SeverityScore[];
  setSeverityScores: (scores: SeverityScore[]) => void;
  updateScore: (questionId: string, score: number, notes?: string) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [intakeData, setIntakeData] = useState<IntakeData>({
    patientName: '',
    dateOfBirth: '',
    mrn: '',
    date: new Date().toISOString().split('T')[0],
    clinicianName: '',
  });

  const [acknowledgedInstructions, setAcknowledgedInstructions] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomItem[]>([]);
  const [selectedObsessions, setSelectedObsessions] = useState<SymptomItem[]>([]);
  const [selectedCompulsions, setSelectedCompulsions] = useState<SymptomItem[]>([]);
  const [selectedAvoidance, setSelectedAvoidance] = useState<SymptomItem[]>([]);
  const [targetObsessions, setTargetObsessions] = useState<TargetSymptom[]>([]);
  const [targetCompulsions, setTargetCompulsions] = useState<TargetSymptom[]>([]);
  const [targetAvoidance, setTargetAvoidance] = useState<TargetSymptom[]>([]);
  const [severityScores, setSeverityScores] = useState<SeverityScore[]>([]);

  const updateScore = (questionId: string, score: number, notes?: string) => {
    setSeverityScores(prev => {
      const existing = prev.findIndex(s => s.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, score, notes };
        return updated;
      }
      return [...prev, { questionId, score, notes }];
    });
  };

  return (
    <AssessmentContext.Provider
      value={{
        intakeData,
        setIntakeData,
        acknowledgedInstructions,
        setAcknowledgedInstructions,
        selectedSymptoms,
        setSelectedSymptoms,
        selectedObsessions,
        setSelectedObsessions,
        selectedCompulsions,
        setSelectedCompulsions,
        selectedAvoidance,
        setSelectedAvoidance,
        targetObsessions,
        setTargetObsessions,
        targetCompulsions,
        setTargetCompulsions,
        targetAvoidance,
        setTargetAvoidance,
        severityScores,
        setSeverityScores,
        updateScore,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
