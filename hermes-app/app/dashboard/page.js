'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from './page.module.css';

export default function DashboardPage() {
  const [bens, setBens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 15; // Set a fixed number of items per page

  useEffect(() => {
    // Fetches a paginated list of items to improve initial load performance.
    // By fetching only one page at a time, we avoid loading the entire table into memory.
    async function fetchBens() {
      setLoading(true);
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // Fetch the paginated data and the total count in a single request
      const { data, error, count } = await supabase
        .from('bens_patrimoniais')
        .select(`
          id,
          numero_patrimonio,
          descricao,
          status,
          unidades ( sigla ),
          perfis ( nome_completo )
        `, { count: 'exact' })
        .range(from, to);

      if (error) {
        setError('An error occurred while loading the data.');
        console.error('Error fetching data:', error);
      } else {
        setBens(data);
        setTotalCount(count);
      }
      setLoading(false);
    }

    fetchBens();
  }, [currentPage, itemsPerPage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Dashboard de Patrimônio
      </h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>}

      {!loading && !error && (
        bens.length > 0 ? (
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
        ) : (
          <p className={styles.emptyMessage}>
            Nenhum bem patrimonial encontrado.
          </p>
        )
      )}

      {/* Pagination Controls */}
      {!loading && !error && totalCount > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.button}
          >
            Anterior
          </button>
          <span className={styles.pageInfo}>
            Página {currentPage} de {Math.ceil(totalCount / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalCount / itemsPerPage)))}
            disabled={currentPage * itemsPerPage >= totalCount}
            className={styles.button}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
