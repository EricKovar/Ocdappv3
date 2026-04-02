import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface ThreeColumnLayoutProps {
  title: string;
  backPath: string;
  continuePath: string;
  leftSidebar: ReactNode;
  centerContent: ReactNode;
  rightSidebar: ReactNode;
  onContinue?: () => void;
}

export function ThreeColumnLayout({
  title,
  backPath,
  continuePath,
  leftSidebar,
  centerContent,
  rightSidebar,
  onContinue,
}: ThreeColumnLayoutProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    navigate(continuePath);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(backPath)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            </div>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            {leftSidebar}
          </div>
          <div className="col-span-6">
            {centerContent}
          </div>
          <div className="col-span-3">
            {rightSidebar}
          </div>
        </div>
      </div>
    </div>
  );
}
