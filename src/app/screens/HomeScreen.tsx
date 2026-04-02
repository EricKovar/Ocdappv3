import React from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
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
      icon: <FileText className="w-6 h-6" />,
      description: 'Begin new assessment with patient information'
    },
    {
      id: 'instructions',
      title: 'Instructions',
      path: '/instructions',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Review assessment guidelines and procedures'
    },
    {
      id: 'symptoms',
      title: 'Symptoms Overview',
      path: '/symptoms',
      icon: <List className="w-6 h-6" />,
      description: 'General symptom checklist and overview'
    },
    {
      id: 'obsessions',
      title: 'Obsessions',
      path: '/obsessions',
      icon: <Brain className="w-6 h-6" />,
      description: 'Identify and categorize obsessive thoughts'
    },
    {
      id: 'compulsions',
      title: 'Compulsions',
      path: '/compulsions',
      icon: <Repeat className="w-6 h-6" />,
      description: 'Document compulsive behaviors and rituals'
    },
    {
      id: 'avoidance',
      title: 'Avoidance',
      path: '/avoidance',
      icon: <ShieldAlert className="w-6 h-6" />,
      description: 'Record avoidance behaviors and patterns'
    },
    {
      id: 'target-symptoms',
      title: 'Target Symptoms',
      path: '/target-symptoms',
      icon: <Target className="w-6 h-6" />,
      description: 'Prioritize symptoms for treatment focus'
    },
    {
      id: 'severity-interview',
      title: 'Severity Interview',
      path: '/severity-interview',
      icon: <ClipboardList className="w-6 h-6" />,
      description: 'Conduct structured severity rating interview'
    },
    {
      id: 'results',
      title: 'Results',
      path: '/results',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'View comprehensive assessment results'
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      path: '/confirmation',
      icon: <CheckCircle2 className="w-6 h-6" />,
      description: 'Complete and finalize assessment'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Y-BOCS Clinical Assessment
          </h1>
          <p className="text-lg text-muted-foreground">
            Yale-Brown Obsessive Compulsive Scale
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Comprehensive structured assessment for OCD symptom severity
          </p>
          
          {/* Start Assessment Button */}
          <div className="mt-8">
            <Button 
              onClick={() => navigate('/intake')}
              className="px-8 py-6 text-lg inline-flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
              onClick={() => navigate(item.path)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="mt-12 bg-secondary/30">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              Assessment Workflow
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This comprehensive Y-BOCS assessment follows a structured 10-step workflow. 
              Begin with patient intake, progress through symptom identification and categorization, 
              prioritize target symptoms, conduct the severity interview, and conclude with detailed results and confirmation.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                Clinical Tool
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">
                Structured Interview
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-md border border-border font-medium">
                Evidence-Based
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}