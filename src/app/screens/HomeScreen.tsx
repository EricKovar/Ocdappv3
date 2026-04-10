import React from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import {
  FileText,
  BookOpen,
  List,
  Brain,
  Repeat,
  ShieldAlert,
  Target,
  ClipboardList,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

export function HomeScreen() {
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = [
    {
      id: 'intake',
      title: 'Patient Intake',
      path: '/intake',
      icon: <FileText className="w-5 h-5" />,
      description: 'Begin new assessment with patient information'
    },
    {
      id: 'instructions',
      title: 'Instructions',
      path: '/instructions',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Review assessment guidelines and procedures'
    },
    {
      id: 'symptoms',
      title: 'Symptoms Overview',
      path: '/symptoms',
      icon: <List className="w-5 h-5" />,
      description: 'General symptom checklist and overview'
    },
    {
      id: 'obsessions',
      title: 'Obsessions',
      path: '/obsessions',
      icon: <Brain className="w-5 h-5" />,
      description: 'Identify and categorize obsessive thoughts'
    },
    {
      id: 'compulsions',
      title: 'Compulsions',
      path: '/compulsions',
      icon: <Repeat className="w-5 h-5" />,
      description: 'Document compulsive behaviors and rituals'
    },
    {
      id: 'avoidance',
      title: 'Avoidance',
      path: '/avoidance',
      icon: <ShieldAlert className="w-5 h-5" />,
      description: 'Record avoidance behaviors and patterns'
    },
    {
      id: 'target-symptoms',
      title: 'Target Symptoms',
      path: '/target-symptoms',
      icon: <Target className="w-5 h-5" />,
      description: 'Prioritize symptoms for treatment focus'
    },
    {
      id: 'severity-interview',
      title: 'Severity Interview',
      path: '/severity-interview',
      icon: <ClipboardList className="w-5 h-5" />,
      description: 'Conduct structured severity rating interview'
    },
    {
      id: 'results',
      title: 'Results',
      path: '/results',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'View comprehensive assessment results'
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      path: '/confirmation',
      icon: <CheckCircle2 className="w-5 h-5" />,
      description: 'Complete and finalize assessment'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Developer Info and Logo/Button */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Developer Info Card - spans 2 columns */}
          <Card className="bg-white border border-gray-200 shadow-sm p-10 col-span-2">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Y-BOCS™/YBOCS™</h2>

              <div className="space-y-2">
                <p className="text-base font-semibold text-gray-800">Principal Developer:</p>
                <p className="text-base text-gray-700">Wayne K. Goodman, M.D.</p>
              </div>

              <div className="space-y-2">
                <p className="text-base font-semibold text-gray-800">Co-developers:</p>
                <div className="space-y-1">
                  <p className="text-base text-gray-700">Steven A. Rasmussen, M.D.</p>
                  <p className="text-base text-gray-700">Lawrence H. Price, M.D.</p>
                  <p className="text-base text-gray-700">Eric A. Storch, PhD.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Logo and Start Assessment Card - spans 1 column */}
          <Card className="bg-white border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-between">
            <div
              className="mb-6 flex items-center justify-center"
              style={{ width: '180px', height: '80px' }}
            >
              <img
                src="/ocd-scales-logo.png"
                alt="OCD Scales logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <p className="text-xs text-gray-500">Comprehensive structured assessment</p>
              <p className="text-xs text-gray-500">for OCD symptom severity</p>
            </div>

            <button
              onClick={() => navigate('/intake')}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Card>
        </div>

        {/* Bottom Section - Navigation Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {navigationItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white border border-gray-200 p-6"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded bg-blue-100 text-blue-700 flex-shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Assessment Workflow Info */}
        <Card className="bg-white border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Assessment Workflow</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            This comprehensive Y-BOCS assessment follows a structured 10-step workflow. Begin with patient intake, progress through symptom identification and categorization, prioritize target symptoms, conduct the severity interview, and conclude with detailed results and confirmation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
              Clinical Tool
            </span>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-md font-medium">
              Structured Interview
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
              Evidence-Based
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
