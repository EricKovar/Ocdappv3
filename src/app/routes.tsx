import { createBrowserRouter } from 'react-router';
import { IntakeScreen } from './screens/IntakeScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { SymptomsScreen } from './screens/SymptomsScreen';
import { ObsessionsScreen } from './screens/ObsessionsScreen';
import { CompulsionsScreen } from './screens/CompulsionsScreen';
import { AvoidanceScreen } from './screens/AvoidanceScreen';
import { TargetSymptomsScreen } from './screens/TargetSymptomsScreen';
import { SeverityInterviewScreen } from './screens/SeverityInterviewScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: IntakeScreen,
  },
  {
    path: '/instructions',
    Component: InstructionsScreen,
  },
  {
    path: '/symptoms',
    Component: SymptomsScreen,
  },
  {
    path: '/obsessions',
    Component: ObsessionsScreen,
  },
  {
    path: '/compulsions',
    Component: CompulsionsScreen,
  },
  {
    path: '/avoidance',
    Component: AvoidanceScreen,
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
