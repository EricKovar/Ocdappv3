import React from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, ArrowLeft } from 'lucide-react';

export function IntakeScreen() {
  const navigate = useNavigate();
  const { intakeData, setIntakeData } = useAssessment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/instructions');
  };

  const handleChange = (field: keyof typeof intakeData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntakeData({ ...intakeData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>
        
        <div className="text-center mb-8">
          <div className="flex justify-center gap-6 mb-3">
            <div className="h-32 w-64 bg-secondary border-2 border-border rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-muted-foreground">logo here</span>
            </div>
            
            {/* Developer Info Box */}
            <div className="bg-secondary border border-border rounded-lg p-4 flex-shrink-0">
              <div className="text-xs text-foreground space-y-2">
                <p className="font-semibold">Y-BOCS™/YBOCS™</p>
                
                <div className="mt-3">
                  <p className="font-semibold">Principal Developer:</p>
                  <p>Wayne K. Goodman, M.D.</p>
                </div>
                
                <div className="mt-3">
                  <p className="font-semibold">Co-developers:</p>
                  <p>Steven A. Rasmussen, M.D.</p>
                  <p>Lawrence H. Price, M.D.</p>
                  <p>Eric A. Storch, PhD.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Comprehensive structured assessment</p>
            <p>for OCD symptom severity</p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Patient Name"
              type="text"
              required
              value={intakeData.patientName}
              onChange={handleChange('patientName')}
              placeholder="Enter patient name"
            />

            <div className="relative">
              <Input
                label="Date of Birth"
                type="date"
                required
                value={intakeData.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
              />
              <Calendar className="absolute right-3 top-[38px] w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>

            <Input
              label="MRN / ID"
              type="text"
              required
              value={intakeData.mrn}
              onChange={handleChange('mrn')}
              placeholder="Enter medical record number"
            />

            <div className="relative">
              <Input
                label="Date"
                type="date"
                required
                value={intakeData.date}
                onChange={handleChange('date')}
              />
              <Calendar className="absolute right-3 top-[38px] w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>

            <Input
              label="Clinician Name"
              type="text"
              required
              value={intakeData.clinicianName}
              onChange={handleChange('clinicianName')}
              placeholder="Enter clinician name"
            />

            <Button type="submit" className="w-full mt-8">
              Begin Assessment
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}