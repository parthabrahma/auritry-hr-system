import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="font-bold text-xl">
        Auritry HR System
      </div>
      <div className="flex gap-4">
        <button onClick={() => router.push('/profile')} className="hover:underline">
          Profile
        </button>
        <button onClick={() => router.push('/admin/dashboard')} className="hover:underline">
          Admin Dashboard
        </button>
        <button onClick={() => router.push('/admin/add-member')} className="hover:underline">
          Add Member
        </button>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
