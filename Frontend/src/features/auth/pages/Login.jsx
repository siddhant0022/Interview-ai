import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Replace with your auth API call.
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('Login payload:', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #eff6ff 100%)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
          padding: '32px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem', color: '#0f172a' }}>
          Welcome Back
        </h1>
        <p style={{ margin: '0 0 24px', color: '#475569' }}>
          Sign in to continue to your account.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '6px', color: '#1e293b' }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${errors.email ? '#ef4444' : '#cbd5e1'}`,
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
            {errors.email ? (
              <small style={{ color: '#b91c1c' }}>{errors.email}</small>
            ) : null}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', marginBottom: '6px', color: '#1e293b' }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${errors.password ? '#ef4444' : '#cbd5e1'}`,
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
            {errors.password ? (
              <small style={{ color: '#b91c1c' }}>{errors.password}</small>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              fontSize: '0.9rem',
            }}
          >
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
            <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#ffffff',
              background: isSubmitting ? '#94a3b8' : '#2563eb',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '18px', color: '#64748b' }}>
          Don&apos;t have an account?{' '}
          <a href="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

