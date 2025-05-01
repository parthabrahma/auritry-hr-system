import Navbar from '../components/Navbar';

export default function SomePage() {
  return (
    <>
      <Navbar />
      {/* Your page content here */}
    </>
  );
}
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone_number: '',
    current_location: '',
    permanent_address: '',
    picture_url: '',
  });
  const [pictureFile, setPictureFile] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchProfile(user.id);
      }
    }
    loadUser();
  }, []);

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('email', user.email)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
    }
  }

  async function handleUpdate() {
    let updatedProfile = { ...profile };

    if (pictureFile) {
      const { data, error } = await supabase
        .storage
        .from('profile-pictures')
        .upload(`avatars/${user.id}`, pictureFile, { upsert: true });

      if (error) {
        console.error('Error uploading picture:', error.message);
      } else {
        const publicUrl = supabase.storage.from('profile-pictures').getPublicUrl(`avatars/${user.id}`).data.publicUrl;
        updatedProfile.picture_url = publicUrl;
      }
    }

    const { error } = await supabase
      .from('members')
      .update(updatedProfile)
      .eq('phone_number', profile.phone_number);

    if (error) {
      alert('Update failed: ' + error.message);
    } else {
      alert('Profile updated!');
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={profile.phone_number}
        onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Current Location"
        value={profile.current_location}
        onChange={(e) => setProfile({ ...profile, current_location: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Permanent Address"
        value={profile.permanent_address}
        onChange={(e) => setProfile({ ...profile, permanent_address: e.target.value })}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="file"
        onChange={(e) => setPictureFile(e.target.files[0])}
        className="border w-full p-2 mb-2 rounded"
      />
      <button onClick={handleUpdate} className="bg-green-500 text-white p-2 w-full rounded">
        Update Profile
      </button>
    </div>
  );
}
