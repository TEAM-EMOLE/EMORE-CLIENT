import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './GlobalLayout';
import HomePage from '../../../pages/Home';
import LoginPage from '../../../pages/Login';
import SignupPage from '../../../pages/Sinup';
import LettersPage from '../../../pages/Letters';

export default function RouterLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/letters" element={<LettersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
