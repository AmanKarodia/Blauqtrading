import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/(auth)/LoginPage.jsx';
import SignupPage from './pages/(auth)/SignupPage.jsx';
import ForgotPasswordPage from './pages/(auth)/ForgotPasswordPage.jsx';
import ServicesPage from './pages/ServicesPage';
import DeliveryForm from './pages/DeliveryForm.jsx';
import AdminLogisticsDashboard from './pages/AdminLogisticsDashboard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import FeaturedProduct from './components/FeaturedProduct';
import Benefits from './components/Benefits';
import TonWallet from './components/TonWallet';
import Price from './components/Price';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext.jsx';
import AdminAuditLogs from './pages/AdminAuditLogs';
import AdminSettings from './pages/AdminSettings';
import UserManagement from './pages/UserManagement';
import DriverDashboard from './pages/DriverDashboard.jsx';

const LandingPage = () => (
  <>
    <Navbar />
    <div className="max-w-full mx-auto px-6">
      <Hero />
      <Feature />
      <FeaturedProduct />
      <Benefits />
      <TonWallet />
      <Price />
      <Footer />
    </div>
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/DelForm" element={<DeliveryForm />} />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <LandingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/logistics"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminLogisticsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminAuditLogs />
              </PrivateRoute>
            }
          />
          <Route
          path="/admin/settings"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminSettings />
            </PrivateRoute>
            }
          />
          <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserManagement />
            </PrivateRoute>
           }
          />
          <Route
          path="/admin/driver"
          element={
            <PrivateRoute allowedRoles={['admin', 'driver']}>
              <DriverDashboard />
            </PrivateRoute>
           }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;