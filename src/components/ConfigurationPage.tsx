import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

export const ConfigurationPage: React.FC = () => {
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setConfigKey: saveConfigKey } = useAuth();
  const navigate = useNavigate();

  const validatePublicKey = (): boolean => {
    if (!publicKey.trim()) {
      setError('Public key is required');
      return false;
    }

    const length = publicKey.trim().length;
    if (length < 100) {
      setError(`Public key must be at least 100 characters (currently ${length})`);
      return false;
    }

    if (length > 1000) {
      setError(`Public key must not exceed 1000 characters (currently ${length})`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePublicKey()) {
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      saveConfigKey(publicKey);
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center">
    <div 
      className="bg-gray-300 w-[85%] h-[90%] rounded-[20px]" 
    >
    </div>
  </div>

     
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
        
          <div className="flex justify-center gap-1">
    <img src="https://i.imghippo.com/files/uGi6171Zis.jpeg" alt="Stackguard" className="w-8 h-8" />
    <span className="text-2xl font-bold">Stackguard</span>
  </div>

          <h1 className="text-center mb-2">Verify your public key</h1>
          <p className="text-center text-gray-600 mb-8">
            To get started provide your public key for verification
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your public key"
                value={publicKey}
                onChange={(e) => {
                  setPublicKey(e.target.value);
                  setError('');
                }}
                className={error ? 'border-red-500' : ''}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have a public key? Contact your administrator
            </p>
          </form>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm mb-2">💡 Need a test key?</h3>
            <p className="text-sm text-gray-600 mb-2">
              Use this sample public key for testing (100+ characters):
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const sampleKey = 'STACKGUARD_PUBLIC_KEY_' + 'A'.repeat(75) + '_' + 
                  'This is a sample public key for testing the StackGuard application verification process.';
                setPublicKey(sampleKey);
                setError('');
              }}
            >
              Fill with Sample Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
