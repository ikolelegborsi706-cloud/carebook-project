import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../pages/layouts/AuthLayout.jsx';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const START = {
  firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', password: '',
  role: 'patient', specialty: '', mdcnNumber: '',
};

// A simple guide to password strength: length, and a mix of letters, numbers and symbols.
function PasswordStrength({ password }) {
  const checks = [password.length >= 8, /[a-z]/i.test(password) && /\d/.test(password), /[^a-z0-9]/i.test(password), password.length >= 12];
  const score = password ? checks.filter(Boolean).length : 0;
  const words = ['Use at least 8 characters', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <span className="strength" aria-live="polite">
      <span className="strength-bars" aria-hidden="true">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= score ? `on s${score}` : ''} />)}</span>
      <span className="small muted">{words[score]}{score > 0 && score < 4 ? ' · add numbers, symbols or more length' : ''}</span>
    </span>
  );
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  // The "For doctors" link opens this page with ?role=doctor already chosen.
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({ ...START, role: searchParams.get('role') === 'doctor' ? 'doctor' : 'patient' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const isDoctor = values.role === 'doctor';
  const today = new Date().toLocaleDateString('en-CA');

  async function handleSubmit(event) {
    event.preventDefault();
    if (values.password.length < 8) return setError('Password must be at least 8 characters.');
    if (!/^\+?[0-9 ]{7,20}$/.test(values.phone)) return setError('Enter a valid phone number, e.g. +234 803 555 0142.');
    setSaving(true);
    setError('');
    // Only send the fields that apply to this role.
    const { specialty, mdcnNumber, dateOfBirth, ...common } = values;
    const body = isDoctor ? { ...common, specialty, mdcnNumber } : { ...common, dateOfBirth };
    try {
      await register(body);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <AuthLayout
      title={isDoctor ? 'Reach patients who are looking for you.' : 'See the right doctor, without the waiting room.'}
      text={isDoctor ? 'Set your own hours and fee. An admin checks your MDCN licence before your profile goes live.' : 'Book a real open slot, pay securely with Paystack and keep your visit notes in one place.'}
    >
    <form onSubmit={handleSubmit}>
      <h1>Create your account</h1>
      <p className="muted">Choose how you'll use CareBook.</p>
      <fieldset className="role-cards">
        <legend className="sr-only">I am a</legend>
        <label className={!isDoctor ? 'on' : ''}>
          <input type="radio" name="role" value="patient" checked={!isDoctor} onChange={update} />
          <strong>I'm a patient</strong><span>Book and pay for appointments</span>
        </label>
        <label className={isDoctor ? 'on' : ''}>
          <input type="radio" name="role" value="doctor" checked={isDoctor} onChange={update} />
          <strong>I'm a doctor</strong><span>Needs admin approval</span>
        </label>
      </fieldset>
      <div className="two-col">
        <label className="field">First name<input name="firstName" required autoComplete="given-name" value={values.firstName} onChange={update} /></label>
        <label className="field">Last name<input name="lastName" required autoComplete="family-name" value={values.lastName} onChange={update} /></label>
      </div>
      <label className="field">Email<input name="email" type="email" required autoComplete="email" value={values.email} onChange={update} /></label>
      <label className="field">Phone number
        <input name="phone" type="tel" required autoComplete="tel" placeholder="+234 803 555 0142" value={values.phone} onChange={update} />
      </label>
      {!isDoctor && (
        <label className="field">Date of birth
          <input name="dateOfBirth" type="date" required max={today} autoComplete="bday" value={values.dateOfBirth} onChange={update} />
        </label>
      )}
      {isDoctor && (
        <>
          <label className="field">Specialty<input name="specialty" required value={values.specialty} onChange={update} /></label>
          <label className="field">MDCN licence number
            <input name="mdcnNumber" required placeholder="MDCN/R/12345" value={values.mdcnNumber} onChange={update} />
            <span className="small muted">An admin checks this before your profile goes live.</span>
          </label>
        </>
      )}
       <div className="field">
      <label className="field">Password</label>
      <div className="password-field">
        <input type={showPassword ? "text" : "password"} name='password' required value={values.password} onChange={update} minLength={8} />
        <button className="show-password" onClick={() => setShowPassword(!showPassword)}>
         {showPassword ? <BiSolidHide /> : <BiSolidShow />}
        </button>
      </div>
        <PasswordStrength password={values.password} />
         </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-block" disabled={saving}>{saving ? 'Creating account...' : 'Create account'}</button>
      <p className="small center">Already have an account? <Link to="/login">Log in</Link></p>
      <p className="small muted center">CareBook is a course project. Use made-up details only.</p>
    </form>
    </AuthLayout>
  );
}