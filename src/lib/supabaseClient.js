import Navbar from '../components/Navbar';

export default function SomePage() {
  return (
    <>
      <Navbar />
      {/* Your page content here */}
    </>
  );
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhrlxyskejferfdcwlqw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ocmx4eXNrZWpmZXJmZGN3bHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwODg2MzYsImV4cCI6MjA2MTY2NDYzNn0.fiUxDpm8DEMaHI9UZ3MRJc7xMG6_LA-wfuJ6M_pw75c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
