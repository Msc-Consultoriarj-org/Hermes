'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    checkSessionAndRedirect();
  }, [router]);

  return (
    <div>
      <p>Carregando...</p>
    </div>
  );
}
