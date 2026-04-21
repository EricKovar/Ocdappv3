import { createBrowserRouter } from 'react-router';
import { HomeScreen } from './screens/HomeScreen';
import { IntakeScreen } from './screens/IntakeScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { BriefInstructionsScreen } from './screens/BriefInstructionsScreen';
import { SymptomChecklistScreen } from './screens/SymptomChecklistScreen';
import { TargetSymptomsScreen } from './screens/TargetSymptomsScreen';
import { SeverityInterviewScreen } from './screens/SeverityInterviewScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeScreen,
  },
  {
    path: '/intake',
    Component: IntakeScreen,
  },
  {
    path: '/instructions',
    Component: InstructionsScreen,
  },
  {
    path: '/brief-instructions',
    Component: BriefInstructionsScreen,
  },
  {
    path: '/obsessions',
    Component: SymptomChecklistScreen,
  },
  {
    path: '/compulsions',
    Component: SymptomChecklistScreen,
  },
  {
    path: '/avoidance',
    Component: SymptomChecklistScreen,
  },
  {
    path: '/target-symptoms',
    Component: TargetSymptomsScreen,
  },
  {
    path: '/severity-interview',
    Component: SeverityInterviewScreen,
  },
  {
    path: '/results',
    Component: ResultsScreen,
  },
  {
    path: '/confirmation',
    Component: ConfirmationScreen,
  },
]);