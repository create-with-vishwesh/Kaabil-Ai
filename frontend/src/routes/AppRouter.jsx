/**
 * Centralized React Router configuration.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from '../components/auth/ProtectedRoute';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ResumeUpload from '../pages/ResumeUpload';
import SkillGap from '../pages/SkillGap';
import Roadmap from '../pages/Roadmap';
import MockInterview from '../pages/MockInterview';
import Portfolio from '../pages/Portfolio';
import Profile from '../pages/Profile';
import Interests from '../pages/Interests';
import Quiz from '../pages/Quiz';
import Results from '../pages/Results';
import Advisor from '../pages/Advisor';
import Consultancy from '../pages/Consultancy';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/advisor" element={<ProtectedRoute><Advisor /></ProtectedRoute>} />
        <Route path="/consultancy" element={<ProtectedRoute><Consultancy /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
        <Route path="/skill-gap" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
