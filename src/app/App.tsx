import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AssessmentProvider } from './context/AssessmentContext';

export default function App() {
  return (
    <AssessmentProvider>
      <RouterProvider router={router} />
    </AssessmentProvider>
  );
}
