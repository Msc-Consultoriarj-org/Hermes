'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import withAuth from '../../components/withAuth';
import styles from './dashboard.module.css';

function DashboardPage() {
  const router = useRouter();
  const [bens, setBens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBens() {
      setLoading(true);
      const { data, error } = await supabase
        .from('bens_patrimoniais')
        .select(`
          id,
          numero_patrimonio,
          descricao,
          status,
          unidades ( sigla ),
          perfis ( nome_completo )
        `);

      if (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } else {
        setBens(data);
      }
      setLoading(false);
    }

    fetchBens();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Dashboard de Patrimônio
        </h1>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      {loading && <p className={styles.loading}>Carregando...</p>}
      {error && <p className={styles.error}>Erro ao carregar os dados: {error}</p>}

      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>Nº Patrimônio</th>
              <th className={styles.tableHeaderCell}>Descrição</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Unidade</th>
              <th className={styles.tableHeaderCell}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {bens.map((bem) => (
              <tr key={bem.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{bem.numero_patrimonio}</td>
                <td className={styles.tableCell}>{bem.descricao}</td>
                <td className={styles.tableCell}>{bem.status}</td>
                <td className={styles.tableCell}>{bem.unidades?.sigla || 'N/A'}</td>
                <td className={styles.tableCell}>{bem.perfis?.nome_completo || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withAuth(DashboardPage);
