import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './GlobalLayout';
import HomePage from '../../../pages/Home';
import LoginPage from '../../../pages/Login';
import LettersPage from '../../../pages/Letters';
import LetterWritePage from '../../../pages/LetterWrite';

export default function RouterLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/letters" element={<LettersPage />} />
          <Route path="/letters/write" element={<LetterWritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
