import Navbar from '../components/Navbar';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message);
    else alert('Password reset email sent!');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2 mb-2" />
        <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded">Send Reset Email</button>
      </div>
    </>
  );
}
