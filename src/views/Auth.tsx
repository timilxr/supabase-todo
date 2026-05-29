import { useState } from 'react'
import '../styles/Auth.css'
import type { AuthFormData, AuthMode } from '../models/auth';


export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
    setError('')
  }

  const handleToggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setFormData({ email: '', password: '' })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      // TODO: Integrate with Supabase auth
      console.log(`${mode} attempt:`, formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setFormData({ email: '', password: '' })
      alert(`${mode === 'signin' ? 'Sign in' : 'Sign up'} successful!`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? 'Loading...'
              : mode === 'signin'
                ? 'Sign In'
                : 'Sign Up'}
          </button>
        </form>

        <button
          type="button"
          className="auth-toggle-button"
          onClick={handleToggleMode}
          disabled={loading}
        >
          {mode === 'signin'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  )
}
