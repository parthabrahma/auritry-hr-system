import Navbar from '../components/Navbar';

export default function SomePage() {
  return (
    <>
      <Navbar />
      {/* Your page content here */}
    </>
  );
}
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AddMember() {
  const [member, setMember] = useState({
    name: '',
    phone_number: '',
    email: '',
    designation_workplace: '',
    highest_degree_subject_university: '',
    current_location: '',
    permanent_address: '',
  });
  const router = useRouter();

  async function handleAddMember() {
    const { data, error } = await supabase
      .from('members')
      .insert([member]);

    if (error) {
      alert('Error adding member: ' + error.message);
    } else {
      alert('Member added successfully!');
      router.push('/admin/dashboard');
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Member</h1>
      <input
        type="text"
        placeholder="Name"
        value={member.name}
        onChange={(e) => setMember({ ...member, name: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={member.phone_number}
        onChange={(e) => setMember({ ...member, phone_number: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={member.email}
        onChange={(e) => setMember({ ...member, email: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Designation, Workplace"
        value={member.designation_workplace}
        onChange={(e) => setMember({ ...member, designation_workplace: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Highest Degree, Subject, College/University"
        value={member.highest_degree_subject_university}
        onChange={(e) => setMember({ ...member, highest_degree_subject_university: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Current Location"
        value={member.current_location}
        onChange={(e) => setMember({ ...member, current_location: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Permanent Address"
        value={member.permanent_address}
        onChange={(e) => setMember({ ...member, permanent_address: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <button
        onClick={handleAddMember}
        className="bg-green-500 text-white p-2 w-full rounded mt-4"
      >
        Add Member
      </button>
    </div>
  );
}
