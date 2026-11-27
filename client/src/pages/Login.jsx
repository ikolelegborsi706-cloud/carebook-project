import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaStethoscope } from "react-icons/fa";
import AuthLayout from './layouts/AuthLayout';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

function Login() {

  const { login } = useAuth();
    const navigate = useNavigate();
  
    const location = useLocation();
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

     const update = (e) => setValues({ ...values, [e.target.name]: e.target.value });

     async function handleSubmit(event) {
      event.preventDefault();
      setSaving(true);
      setError("");
      try {
       await login(values);
       navigate(location.state?.from || "/dashboard", {replace: true}); 
      } catch (error) {
       setError(error.message);
       setSaving(false); 
      }
     }
  return (
    <AuthLayout 
      title={"Your appointments, notes and payments in one place."}
      text={"Patients book and pay. Doctors manage their schdule. Admins keep everything safe"}>
       <form onSubmit={handleSubmit}>
      <h1>Welcome back</h1>
      <p className="muted">Log in to manage your appointments.</p>
      <label className="field">
            Email address
            <input type="email" name='email' required value={values.email} onChange={update} />
            <div className="field">
              <div className="row between">
                <label htmlFor="password">Password</label>
                <Link to={"/forgot-password"} className="small">Forgot password?</Link>
              </div>
              <div className="password-field">
        <input type={showPassword ? "text" : "password"} name='password' required value={values.password} onChange={update} minLength={8} />
        <button className="show-password" onClick={() => setShowPassword(!showPassword)}>
         {showPassword ? <BiSolidHide /> : <BiSolidShow />}
        </button>
      </div>
            </div>
            {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-block" disabled={saving}>{saving ? 'logging in' : 'log in'}</button>
            <p className="small center">
              New to CareBook?
              <Link to={"/register"}>Create an account</Link>
            </p>
            <div className="auth-note">
              <FaStethoscope />
              <div>
                <strong>Are you a doctor?</strong>
                <Link to="">Register as a doctor</Link>
                Your profile goes live once an admin checks your MDCN license.
              </div>
            </div>
          </label>
    </form>
    </AuthLayout>
  )
}

export default Login
 