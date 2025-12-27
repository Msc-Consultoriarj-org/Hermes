'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
        } else {
          setLoading(false);
        }
      };

      checkSession();
    }, [router]);

    if (loading) {
      return <div>Verificando autenticação...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
