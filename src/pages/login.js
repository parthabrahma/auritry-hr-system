import Navbar from '../components/Navbar';

export default function SomePage() {
  return (
    <>
      <Navbar />
      {/* Your page content here */}
    </>
  );
}
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Auritry HR System - Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2 mb-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
