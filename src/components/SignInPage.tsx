import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

export const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const success = await signIn(formData.email, formData.password);
      
      if (!success) {
        setErrorMessage('Invalid email or password');
      } else {
        navigate('/configuration');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex">
    
      <div className="hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center">
    <div 
      className="bg-gray-300 w-[85%] h-[90%] rounded-[20px]" 
    >
    </div>
  </div>

     
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
      
        

        
        <div className="flex-1 flex items-center justify-center px-8 pb-16">
          <div className="w-full max-w-md">
            <div className="flex justify-center gap-1">
    <img src="https://i.imghippo.com/files/uGi6171Zis.jpeg" alt="Stackguard" className="w-8 h-8" />
    <span className="text-2xl font-bold">Stackguard</span>
  </div>
            <h1 className="text-center mb-2">Welcome back to Stackguard</h1>
            <p className="text-gray-600 text-center mb-8">
              Secure your codebase with advanced secret scanning security best practices
            </p>

            {errorMessage && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter email ID"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign in'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <a href="#" className="underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </p>

              <p className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/" className="underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
