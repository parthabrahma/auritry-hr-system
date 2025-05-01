import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data, error } = await supabase.from('members').select('*');
    if (error) {
      console.error('Error loading members:', error.message);
    } else {
      setMembers(data);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  function filteredMembers() {
    return members.filter((member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
        <input type="text" placeholder="Search by name, phone or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border w-full p-2 rounded mb-4" />
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers().map((member) => (
                <tr key={member.phone_number}>
                  <td className="border px-4 py-2">{member.name}</td>
                  <td className="border px-4 py-2">{member.phone_number}</td>
                  <td className="border px-4 py-2">{member.email}</td>
                  <td className="border px-4 py-2">{member.current_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
