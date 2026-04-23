import React from 'react';
import { useNavigate } from 'react-router';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
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
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Header with two cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Developer Info Card */}
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-700 space-y-3 text-center">
              <p className="font-semibold">Y-BOCS™/YBOCS™</p>

              <div>
                <p className="font-semibold">Principal Developer:</p>
                <p>Wayne K. Goodman, M.D.</p>
              </div>

              <div>
                <p className="font-semibold">Co-developers:</p>
                <p>Steven A. Rasmussen, M.D.</p>
                <p>Lawrence H. Price, M.D.</p>
                <p>Eric A. Storch, PhD.</p>
                <p className="text-xs text-gray-600 mt-2">© 1989, 2017, 2026 Wayne Goodman</p>
              </div>
            </div>
          </div>

          {/* Logo and Subtitle Card */}
          <div className="bg-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="bg-white rounded border border-gray-300 p-8 mb-4 flex items-center justify-center" style={{ width: '180px', height: '100px' }}>
              <span className="text-gray-400 text-sm">logo here</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Comprehensive structured assessment</p>
              <p className="text-xs text-gray-500">for OCD symptom severity</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-white border border-gray-200">
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
              <Calendar className="absolute right-3 top-[38px] w-5 h-5 text-gray-400 pointer-events-none" />
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
              <Calendar className="absolute right-3 top-[38px] w-5 h-5 text-gray-400 pointer-events-none" />
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