
import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './componenets/Header'
import Footer from './componenets/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import DoctorProfile from './pages/DoctorProfile'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/Home'
import AdminDashboard from './pages/Dashboards/AdminDashboard'
import PatientDashboard from './pages/Dashboards/PatientDashboard'
import DoctorDashboard from './pages/Dashboards/DoctorDashboard'
import DashboardLayout from './pages/Dashboards/layout/DashboardLayout'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from "./componenets/protectedRoute"

function DashboardRedirect() {
  const { user } = useAuth();
  return <Navigate to={`/${user.role}`} replace />;
}

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {


  return (
    <>

      <Routes>
        {/* {wrap public pages with the shared Header and Footer components} */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          {/* {Requires sign-in, then redirects the to thier role dashboard} */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardRedirect />} />
          </Route>
          {/* {Restricts payment return and receipts to sign-in patients.} */}
          <Route element={<ProtectedRoute roles={['patient']} />}>

          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>


        {/* { Retricts all doctor dashboard pasges to users with the doctor role. } */}
        <Route element={<ProtectedRoute role={['patient']} />}>
          <Route path='/patient' element={<DashboardLayout role='patient' />}>


          </Route>
        </Route>

        {/* { Retricts all doctor dashboard pasges to users with the doctor role. } */}
        <Route element={<ProtectedRoute role={['doctor']} />}>
          <Route path='/doctor' element={<DashboardLayout role='doctor' />}>


          </Route>
        </Route>
        {/* { Retricts all doctor dashboard pasges to users with the doctor role. } */}
        <Route element={<ProtectedRoute role={['admin']} />}>
          <Route path='/admin' element={<DashboardLayout role='admin' />}>

          </Route>
        </Route>
      </Routes>




    </>
  )
}

export default App
