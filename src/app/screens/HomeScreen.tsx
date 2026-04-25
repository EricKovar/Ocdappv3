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
      description: 'Begin new assessment with patient/client information'
    },
    {
      id: 'instructions',
      title: 'General Instructions',
      path: '/instructions',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Review detailed assessment guidelines and procedures'
    },
    {
      id: 'brief-instructions',
      title: 'Brief Instructions',
      path: '/brief-instructions',
      icon: <List className="w-5 h-5" />,
      description: 'Key steps prior to each assessment'
    },
    {
      id: 'obsessions',
      title: 'Symptom Checklist: Obsessions',
      path: '/obsessions',
      icon: <Brain className="w-5 h-5" />,
      description: 'Identify and record current/past obsessions'
    },
    {
      id: 'compulsions',
      title: 'Symptom Checklist: Compulsions',
      path: '/compulsions',
      icon: <Repeat className="w-5 h-5" />,
      description: 'Identify and record current/past compulsions'
    },
    {
      id: 'avoidance',
      title: 'Symptom Checklist: Avoidance',
      path: '/avoidance',
      icon: <ShieldAlert className="w-5 h-5" />,
      description: 'Identify and record current/past avoidance behaviors'
    },
    {
      id: 'target-symptoms',
      title: 'Target Symptoms',
      path: '/target-symptoms',
      icon: <Target className="w-5 h-5" />,
      description: 'Identify the symptoms that will be the major focus of assessment'
    },
    {
      id: 'severity-items',
      title: 'Severity Items',
      path: '/severity-interview',
      icon: <ClipboardList className="w-5 h-5" />,
      description: 'Conduct structured severity rating interview'
    },
    {
      id: 'results',
      title: 'Results',
      path: '/results',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'View assessment scores'
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
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="bg-white border border-gray-200 shadow-sm p-10 col-span-2">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl">Y-BOCS™/YBOCS™</h2>

              <div className="space-y-2">
                <p className="text-base">Principal Developer:</p>
                <p className="text-base">Wayne K. Goodman, M.D.</p>
              </div>

              <div className="space-y-2">
                <p className="text-base">Co-developers:</p>
                <div className="space-y-1">
                  <p className="text-base">Steven A. Rasmussen, M.D.</p>
                  <p className="text-base">Lawrence H. Price, M.D.</p>
                  <p className="text-base">Eric A. Storch, PhD.</p>
                  <p className="text-sm mt-3">© 1989, 2017, 2026 Wayne Goodman</p>
                </div>
              </div>
            </div>
          </Card>
   <Card className="bg-white border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-between">
            <div className="bg-white rounded border border-gray-300 flex items-center justify-center mb-6 w-[180px] h-[80px] p-2">
              <img
                src="/ocd-scales-logo.png"
                alt="OCD Scales logo"
                className="block max-h-full max-w-full object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <p className="text-xs">Comprehensive structured assessment</p>
              <p className="text-xs">for OCD symptom severity</p>
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
                <h3 className="text-base">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="bg-white border border-gray-200 shadow-sm p-6">
          <h3 className="mb-3">Assessment Workflow</h3>
          <p className="text-sm leading-relaxed mb-4">
            This comprehensive Y-BOCS assessment follows a structured 10-step workflow. Begin with patient intake, progress through symptom identification and categorization, prioritize target symptoms, conduct the severity interview, and conclude with detailed results and confirmation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
              Clinical Tool
            </span>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-md">
              Structured Interview
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              Evidence-Based
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
