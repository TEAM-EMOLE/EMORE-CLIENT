import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../../pages/Home';
import LoginPage from '../../../pages/Login';

export default function RouterLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
