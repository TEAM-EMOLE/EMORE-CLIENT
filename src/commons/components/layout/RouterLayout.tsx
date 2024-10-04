import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../../pages/Home';
import GlobalLayout from './GlobalLayout';
import LettersPage from '../../../pages/Letters';

export default function RouterLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<HomePage />} />
          <Route path="letters" element={<LettersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
